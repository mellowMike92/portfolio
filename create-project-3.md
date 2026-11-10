# Technical Specification & Project Plan: Dynamic Onboarding Workflow Agent (`onboarding-agent`)

## 1. Executive Summary & Core Objective

The **Dynamic Onboarding Workflow Agent** is an LLM-native employee onboarding engine designed for engineering teams. It dynamically generates tailored 30-60-90 day onboarding roadmaps based on a new hire's role and technical stack, adapts remaining milestones in real time as tasks are completed ahead of or behind schedule, and integrates with external mock services (Slack/Email webhooks).

### Key Architectural Highlights
- **Agent Tool Harness:** Custom LLM tool execution engine built on Python 3.11, FastAPI, and the Anthropic Claude API.
- **Real-Time Streaming:** Server-Sent Events (SSE) streaming live agent reasoning and tool executions to the client.
- **Full-Stack Interface:** Modern React + TypeScript dashboard with a real-time agent execution terminal.
- **LLM Evals Suite:** Automated test harness validating roadmap adaptation logic and tool schema enforcement.

---

## 2. System Architecture & Directory Structure

```text
onboarding-agent/
├── README.md
├── PLAN.md
├── docker-compose.yml
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── v1/
│   │   │       ├── router.py
│   │   │       └── endpoints/
│   │   │           ├── workflows.py
│   │   │           └── agent.py
│   │   ├── agent/
│   │   │   ├── harness.py
│   │   │   ├── tools.py
│   │   │   └── prompts.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── db.py
│   │   ├── models/
│   │   │   └── workflow.py
│   │   └── schemas/
│   │       └── workflow.py
│   ├── tests/
│   │   ├── test_agent.py
│   │   ├── test_api.py
│   │   └── test_evals.py
│   ├── requirements.txt
│   └── main.py
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── RoadmapView.tsx
    │   │   ├── RoadmapColumn.tsx
    │   │   ├── MilestoneCard.tsx
    │   │   └── AgentStreamLog.tsx
    │   ├── services/
    │   │   └── api.ts
    │   ├── types/
    │   │   └── onboarding.ts
    │   ├── App.tsx
    │   └── main.tsx
    ├── package.json
    └── vite.config.ts
```

---

## 3. Database & Data Schemas

### 3.1 SQL Relational Schema (SQLite / PostgreSQL)

```sql
CREATE TABLE workflows (
    id TEXT PRIMARY KEY,
    user_name TEXT NOT NULL,
    role TEXT NOT NULL,
    tech_stack TEXT NOT NULL, -- JSON-encoded string array: ["TypeScript", "React", "FastAPI"]
    status TEXT NOT NULL DEFAULT 'active', -- 'active', 'completed', 'paused'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE milestones (
    id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    timeline_bucket TEXT NOT NULL, -- '30_day', '60_day', '90_day'
    status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'in_progress', 'completed', 'adapted'
    dependencies TEXT DEFAULT '[]', -- JSON-encoded array of milestone IDs: ["m1", "m2"]
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workflow_id) REFERENCES workflows(id) ON DELETE CASCADE
);

CREATE TABLE audit_logs (
    id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL,
    action_type TEXT NOT NULL, -- 'agent_plan', 'milestone_complete', 'roadmap_recalculate', 'notification_sent'
    payload TEXT NOT NULL, -- JSON formatted payload
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (workflow_id) REFERENCES workflows(id) ON DELETE CASCADE
);
```

### 3.2 Pydantic Schemas (`backend/app/schemas/workflow.py`)

```python
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class MilestoneBase(BaseModel):
    title: str
    description: str
    timeline_bucket: str = Field(..., pattern="^(30_day|60_day|90_day)$")
    dependencies: List[str] = []

class MilestoneCreate(MilestoneBase):
    pass

class MilestoneResponse(MilestoneBase):
    id: str
    workflow_id: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True

class WorkflowCreate(BaseModel):
    user_name: str
    role: str
    tech_stack: List[str]

class WorkflowResponse(BaseModel):
    id: str
    user_name: str
    role: str
    tech_stack: List[str]
    status: str
    milestones: List[MilestoneResponse] = []
    created_at: datetime

    class Config:
        from_attributes = True

class MilestoneUpdateStatus(BaseModel):
    status: str = Field(..., pattern="^(pending|in_progress|completed|adapted)$")
```

---

## 4. LLM Agent Tools & Harness Specs

### 4.1 Tool Manifest Definitions (`backend/app/agent/tools.py`)

```python
AGENT_TOOLS = [
    {
        "name": "fetch_role_template",
        "description": "Retrieves baseline onboarding milestones and documentation repos for a given engineering role and stack.",
        "input_schema": {
            "type": "object",
            "properties": {
                "role": {"type": "string", "description": "Job title or specialization (e.g., Senior Staff Engineer)"},
                "tech_stack": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "List of key technologies"
                }
            },
            "required": ["role", "tech_stack"]
        }
    },
    {
        "name": "update_milestone_status",
        "description": "Updates the database status of an individual milestone.",
        "input_schema": {
            "type": "object",
            "properties": {
                "milestone_id": {"type": "string"},
                "new_status": {"type": "string", "enum": ["pending", "in_progress", "completed", "adapted"]}
            },
            "required": ["milestone_id", "new_status"]
        }
    },
    {
        "name": "recalculate_roadmap",
        "description": "Analyzes velocity based on days elapsed versus completed milestones, accelerating or shifting 60/90 day targets dynamically.",
        "input_schema": {
            "type": "object",
            "properties": {
                "workflow_id": {"type": "string"},
                "completed_milestone_id": {"type": "string"},
                "days_elapsed": {"type": "integer", "description": "Days since onboarding start"}
            },
            "required": ["workflow_id", "completed_milestone_id"]
        }
    },
    {
        "name": "trigger_mock_notification",
        "description": "Sends outbound mock notifications (Slack or Email webhooks) to managers upon roadmap changes or milestone completions.",
        "input_schema": {
            "type": "object",
            "properties": {
                "channel": {"type": "string", "enum": ["slack", "email"]},
                "recipient": {"type": "string"},
                "message": {"type": "string"}
            },
            "required": ["channel", "recipient", "message"]
        }
    }
]
```

### 4.2 Agent Prompting Engine (`backend/app/agent/prompts.py`)

```python
SYSTEM_PROMPT = """You are an expert Technical Onboarding Architect AI.
Your objective is to design, monitor, and dynamically adapt 30-60-90 day engineering onboarding roadmaps.

Core Operating Principles:
1. When generating a new roadmap, create clear, measurable milestones divided into 30_day, 60_day, and 90_day buckets.
2. 30-day milestones focus on environment setup, baseline PRs, and domain learning.
3. 60-day milestones focus on independent feature delivery and cross-team collaboration.
4. 90-day milestones focus on architecture proposals, system ownership, and mentoring.
5. When a milestone is completed early, recalculate the roadmap using the recalculate_roadmap tool and inform the manager via trigger_mock_notification.
"""
```

---

## 5. API Routes Specification

| HTTP Method | Path | Description |
| :--- | :--- | :--- |
| `POST` | `/api/v1/workflows` | Creates a workflow, runs agent harness to populate initial 30-60-90 day plan. |
| `GET` | `/api/v1/workflows/{id}` | Retrieves full workflow object including nested milestones and current status. |
| `POST` | `/api/v1/workflows/{id}/milestones/{milestone_id}/complete` | Marks milestone finished, triggers dynamic `recalculate_roadmap` loop. |
| `GET` | `/api/v1/workflows/{id}/stream` | Server-Sent Events (SSE) endpoint emitting live agent reasoning steps & tool calls. |

---

## 6. Frontend Component Architecture

### 6.1 TypeScript Types (`frontend/src/types/onboarding.ts`)

```typescript
export interface Milestone {
  id: string;
  workflow_id: string;
  title: string;
  description: string;
  timeline_bucket: '30_day' | '60_day' | '90_day';
  status: 'pending' | 'in_progress' | 'completed' | 'adapted';
  dependencies: string[];
}

export interface Workflow {
  id: string;
  user_name: string;
  role: string;
  tech_stack: string[];
  status: string;
  milestones: Milestone[];
}

export interface AgentLogEvent {
  timestamp: string;
  type: 'agent_thought' | 'tool_call' | 'roadmap_updated';
  content: string;
}
```

### 6.2 Frontend Interface Layout

- **Header Component:** Displays new hire info (`user_name`, `role`, `tech_stack` badges) and an overall completion percentage bar.
- **Agent Execution Log (`AgentStreamLog.tsx`):** A dark-themed terminal component that displays real-time SSE events emitted by the agent backend (tool execution, JSON payloads, dynamic planning notes).
- **Roadmap Board (`RoadmapView.tsx`):** A 3-column Kanban-style board representing **30-Day**, **60-Day**, and **90-Day** goals with interactive status toggle cards (`MilestoneCard.tsx`).

---

## 7. Testing & Evaluation Architecture

### 7.1 Automated Integration Tests (`backend/tests/test_api.py`)

- **Workflow Creation Test:** Asserts that `POST /api/v1/workflows` returns a 201 status and populates at least 3 milestones across `30_day`, `60_day`, and `90_day` timeline buckets.
- **State Mutation Test:** Asserts that toggling a milestone status creates an audit entry in the `audit_logs` table.

### 7.2 Agent Evaluation Suite (`backend/tests/test_evals.py`)

```python
import pytest
from app.agent.harness import run_agent_adaptation

@pytest.mark.asyncio
async def test_agent_accelerates_roadmap_on_fast_completion():
    """
    Eval Case: Fast Milestone Completion Adaptation
    Given a new hire completes all 30-day milestones within Day 3,
    When the recalculate_roadmap agent engine executes,
    Then the agent must shift at least one 60-day milestone forward into the 30-day bucket.
    """
    initial_state = {
        "days_elapsed": 3,
        "completed_bucket": "30_day",
        "pending_milestones": [
            {"id": "m_60_1", "timeline_bucket": "60_day", "title": "First Production PR"}
        ]
    }
    
    result = await run_agent_adaptation(initial_state)
    
    assert any(
        m["id"] == "m_60_1" and m["timeline_bucket"] == "30_day" 
        for m in result["updated_milestones"]
    )
    assert "recalculate_roadmap" in result["tool_calls_executed"]
```

---

## 8. Development Implementation Roadmap

### Phase 1: Environment & Scaffold
1. Initialize backend directory with FastAPI, SQLAlchemy 2.0 async, `aiosqlite`, and `anthropic` Python SDK.
2. Initialize frontend directory with React 18, TypeScript, Tailwind CSS, Vite, and Lucide Icons.

### Phase 2: Backend Core & Agent Engine
1. Implement Pydantic & SQLAlchemy models for `Workflow`, `Milestone`, and `AuditLog`.
2. Construct LLM tool definitions in `backend/app/agent/tools.py`.
3. Build the LLM reasoning loop in `backend/app/agent/harness.py`.
4. Create FastAPI endpoints (`/api/v1/workflows`, `/api/v1/workflows/{id}/stream`).

### Phase 3: Interactive UI Construction
1. Build `RoadmapView` and `MilestoneCard` components.
2. Build `AgentStreamLog` terminal component connected to SSE backend stream.
3. Wire interaction toggles to fire real-time backend adaptation tasks.

### Phase 4: Evals, Documentation & Final Polish
1. Run `pytest` test suite covering API routes and agent adaptation evaluations.
2. Write production-grade `README.md` complete with an architectural workflow diagram (Mermaid.js).

---

## 9. Definition of Done Checklist

- [ ] FastAPI backend starts cleanly on `http://localhost:8000` with interactive OpenAPI docs at `/docs`.
- [ ] Agent harness successfully executes tools (`fetch_role_template`, `recalculate_roadmap`, `trigger_mock_notification`).
- [ ] React frontend renders 30-60-90 day board and streams dynamic agent thinking logs.
- [ ] Automated evaluation tests (`pytest tests/test_evals.py`) pass cleanly.
- [ ] Complete `README.md` with setup instructions and architecture details is written.