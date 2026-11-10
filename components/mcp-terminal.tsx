'use client';

import { FormEvent, useEffect, useRef, useState } from 'react';
import { Loader2, Play } from 'lucide-react';

type LogKind = 'server' | 'prompt' | 'action' | 'synthesis';

interface LogLine {
  kind: LogKind;
  text: string;
}

const PREFIX: Record<LogKind, { label: string; className: string }> = {
  server: { label: '[MCP Server]', className: 'text-cyan-400' },
  prompt: { label: '[Client Prompt]', className: 'text-slate-300' },
  action: { label: '[MCP Action]', className: 'text-indigo-400' },
  synthesis: { label: '[Claude Synthesis]', className: 'text-emerald-400' },
};

const BOOT_LOGS: LogLine[] = [
  { kind: 'server', text: 'mcp-portfolio-server v1.4.2 — session initialized' },
  {
    kind: 'server',
    text: '4 tools registered: get_experience · query_tech_matrix · get_contact · semantic_search',
  },
  { kind: 'server', text: 'transport: stdio · auth: none · status: READY' },
];

interface Scenario {
  match: RegExp;
  toolCall: object;
  result: string;
  synthesis: string;
}

const SCENARIOS: Scenario[] = [
  {
    match: /experience|work|career|job|dell|nasa|bjss|history/i,
    toolCall: {
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        name: 'portfolio.get_experience',
        arguments: { depth: 'detailed', format: 'timeline' },
      },
    },
    result:
      '{ "roles": 3, "total_years": "10+", "current": "Dell Technologies — Senior Principal SWE / Tech Lead" }',
    synthesis:
      'Michael has 10+ years of engineering experience: Senior Principal SWE / Tech Lead at Dell Technologies (2023–Present), Staff SWE & Cloud Consultant at BJSS (2021–2023), and Flight Displays & Software Developer at NASA Johnson Space Center (2015–2017).',
  },
  {
    match: /skill|stack|tech|react|typescript|langchain|python/i,
    toolCall: {
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        name: 'portfolio.query_tech_matrix',
        arguments: { domain: 'all' },
      },
    },
    result:
      '{ "ai": ["Claude API", "MCP Tools", "Python Evals", "LangChain"], "fullstack": ["React.js", "Next.js 14", "TypeScript", "Tailwind", "Node.js"], "infra": ["PostgreSQL", "Docker", "AWS", "Azure DevOps", "gRPC"] }',
    synthesis:
      'Core stack: React/Next.js/TypeScript for product surfaces, Claude API + MCP tooling + LangChain for AI-native workflows, and PostgreSQL/Docker/AWS for infrastructure and data.',
  },
  {
    match: /contact|email|hire|github|reach/i,
    toolCall: {
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        name: 'portfolio.get_contact',
        arguments: { channels: ['email', 'github'] },
      },
    },
    result:
      '{ "email": "michael.f.issa@gmail.com", "github": "github.com/mellowMike92" }',
    synthesis:
      'You can reach Michael directly at michael.f.issa@gmail.com or on GitHub at github.com/mellowMike92.',
  },
];

const FALLBACK: Scenario = {
  match: /.*/,
  toolCall: {
    jsonrpc: '2.0',
    method: 'tools/call',
    params: {
      name: 'mcp.semantic_search',
      arguments: { index: 'portfolio_kb', top_k: 3 },
    },
  },
  result:
    '{ "hits": 3, "top_score": 0.91, "docs": ["experience/dell.md", "skills/ai-native.md", "contact/info.md"] }',
  synthesis:
    "I searched Michael's portfolio knowledge base. Try prompts like \"summarize his experience\", \"what's his tech stack?\", or \"how do I contact him?\" — the MCP server routes each to a structured tool call.",
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export default function McpTerminal() {
  const [lines, setLines] = useState<LogLine[]>(BOOT_LOGS);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, loading]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const prompt = input.trim();
    if (!prompt || loading) return;

    setInput('');
    setLoading(true);
    const scenario = SCENARIOS.find((s) => s.match.test(prompt)) ?? FALLBACK;

    setLines((prev) => [...prev, { kind: 'prompt', text: prompt }]);
    await sleep(500);
    setLines((prev) => [
      ...prev,
      { kind: 'server', text: 'prompt received → resolving tool route via planner…' },
    ]);
    await sleep(800);
    setLines((prev) => [
      ...prev,
      {
        kind: 'action',
        text: `${JSON.stringify(scenario.toolCall, null, 2)}\n→ result: ${scenario.result}`,
      },
    ]);
    await sleep(900);
    setLines((prev) => [...prev, { kind: 'synthesis', text: scenario.synthesis }]);
    setLoading(false);
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900/60 shadow-2xl shadow-cyan-950/30 backdrop-blur">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-400/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
          <span className="ml-3 font-mono text-xs text-slate-400">
            mcp-portfolio-server — interactive session
          </span>
        </div>
        <span className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          live
        </span>
      </div>

      <div
        ref={scrollRef}
        className="terminal-scroll h-80 space-y-3 overflow-y-auto p-4 font-mono text-sm leading-relaxed"
      >
        {lines.map((line, i) => {
          const { label, className } = PREFIX[line.kind];
          return (
            <div key={i} className="whitespace-pre-wrap break-words">
              <span className={`${className} font-semibold`}>{label}</span>{' '}
              <span className="text-slate-300">{line.text}</span>
            </div>
          );
        })}
        {loading && (
          <div className="flex items-center gap-2 text-slate-500">
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
            <span className="text-xs">awaiting tool response…</span>
          </div>
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-2 border-t border-slate-800 bg-slate-900/80 p-3"
      >
        <span className="pl-2 font-mono text-sm text-cyan-400">❯</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='try "summarize his experience" or "what is his tech stack?"'
          className="flex-1 bg-transparent font-mono text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="flex items-center gap-1.5 rounded-md bg-cyan-500/90 px-4 py-1.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Play className="h-4 w-4" />
          )}
          Execute
        </button>
      </form>
    </div>
  );
}
