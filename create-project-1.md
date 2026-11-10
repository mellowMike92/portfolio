# Implementation Plan: Model Context Protocol (MCP) Server for HR Knowledge & Policy Evals

Create an enterprise-ready **Model Context Protocol (MCP) Server** in TypeScript that exposes structured HR policy tools, RAG context retrieval, and an automated evaluation harness (evals) to measure accuracy against synthetic HR scenarios.

---

## Technical Requirements & Stack

- **Runtime & Language:** Node.js (>=18.x, ESM), TypeScript (Strict Mode)
- **SDK & Libraries:** `@modelcontextprotocol/sdk`, `zod` (schema validation), `vitest` (eval framework)
- **Target LLM Integration:** Claude 3.5 Sonnet / Anthropic API (`@anthropic-ai/sdk`)
- **Repository Name:** `mcp-hr-knowledge-evals`

---

## Step 1: Project Initialization & Configuration

1. Initialize a new Node.js ESM module and install dependencies:
   - Core: `@modelcontextprotocol/sdk`, `@anthropic-ai/sdk`, `zod`, `dotenv`
   - Dev: `typescript`, `@types/node`, `vitest`, `tsup` (or `tsx` for execution)
2. Create `tsconfig.json` enforcing strict TypeScript settings, ESM module resolution (`"moduleResolution": "NodeNext"`), and output target `ES2022`.
3. Configure `package.json` with scripts:
   - `"build"`: Compiles TypeScript into `dist/`
   - `"start"`: Runs `node dist/index.js`
   - `"dev"`: Runs server in watch mode using `tsx`
   - `"inspector"`: Runs `npx @modelcontextprotocol/inspector node dist/index.js`
   - `"eval"`: Executes `vitest run evals/`

---

## Step 2: Core Data Models & HR Knowledge Base

1. Create `src/data/hrPolicies.ts`:
   - Mock structured HR handbook data (Parental Leave, PTO Policy, Remote Work & Travel Budgets, Onboarding Frameworks, Manager 1-on-1 Guidelines).
2. Create `src/types/index.ts`:
   - Define TypeScript interfaces and Zod schemas for query requests, policy responses, onboarding milestones, and evaluation test cases.

---

## Step 3: MCP Tools & Resources Implementation

In `src/server.ts` (or `src/tools/`):

1. **Initialize MCP Server:**
   - Instantiate `Server` from `@modelcontextprotocol/sdk/server/index.js` named `"hr-knowledge-mcp-server"` version `"1.0.0"`.

2. **Implement MCP Tools:**
   - **`query_hr_policy`**:
     - *Input Schema:* `query` (string), `department` (optional enum: HR, Engineering, Sales)
     - *Behavior:* Performs keyword/semantic matching against `hrPolicies.ts` and returns verified policy text with citation IDs.
   - **`get_onboarding_milestones`**:
     - *Input Schema:* `role` (string), `tenure_days` (number: 30, 60, or 90)
     - *Behavior:* Returns role-specific onboarding expectations and completion criteria.
   - **`fetch_manager_coaching_rubric`**:
     - *Input Schema:* `scenario` (string), `performance_rating` (enum: Exceeds, Meets, Needs_Improvement)
     - *Behavior:* Synthesizes structured 1-on-1 coaching prompts and feedback rubrics.

3. **Implement MCP Prompts & Resources:**
   - Register a prompt template `conduct_manager_1on1` that formats policy parameters into a system prompt for Claude.

4. **Connect Stdio Transport:**
   - Attach `StdioServerTransport` to serve over standard input/output.

---

## Step 4: Automated Evaluation Harness (Evals)

1. Create `evals/hrScenarioEval.test.ts`:
   - Define 20 synthetic HR scenario test cases with ground-truth expected answers (e.g., "What is the parental leave policy duration?", "Where do I find remote travel expense limits?").
2. Build an eval execution function that:
   - Feeds scenario prompts to the MCP server tools.
   - Uses Claude 3.5 Sonnet to score the tool outputs against ground-truth policy criteria.
   - Measures **Policy Retrieval Precision**, **Tool Selection Accuracy**, and **Hallucination Rate (0.0% goal)**.
3. Log clean formatted evaluation benchmark results in CLI.

---

## Step 5: Verification & Documentation

1. Build the project using `npm run build`.
2. Run the MCP Inspector (`npm run inspector`) to verify tool call definitions interactively.
3. Execute `npm run eval` to confirm all 20 eval benchmarks pass.
4. Generate a clean `README.md` containing quickstart steps, tool schemas, and eval benchmark outputs.