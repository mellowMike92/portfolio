import {
  Bot,
  Code2,
  ExternalLink,
  FileText,
  Github,
  Mail,
  MessagesSquare,
  Package,
  Rocket,
  Server,
  ServerCog,
  Sparkles,
  TerminalSquare,
  Workflow,
  Briefcase,
} from 'lucide-react';
import McpTerminal from '@/components/mcp-terminal';

const projects = [
  {
    icon: MessagesSquare,
    name: 'AI Feedback Synthesizer',
    live: 'https://ai-feedback-synthesizer.vercel.app',
    repo: 'https://github.com/mellowMike92/ai-feedback-synthesizer',
    tagline:
      'Paste raw multi-reviewer peer feedback and Claude tool use streams back a structured 1-on-1 coaching rubric over SSE — Zod-enforced end to end.',
    tryIt:
      'Load the built-in 3-reviewer sample, pick a coaching tone, and watch the rubric stream in live.',
    tags: ['Next.js 14', 'Claude Tool Use', 'Zod', 'SSE'],
    extraLinks: [],
  },
  {
    icon: Workflow,
    name: 'Dynamic Onboarding Agent',
    live: 'https://onboarding-agent.vercel.app',
    repo: 'https://github.com/mellowMike92/onboarding-agent',
    tagline:
      'Generates a 30/60/90-day onboarding roadmap, then re-plans it live as external events arrive via webhook — every tool call streams to the dashboard.',
    tryIt:
      'Create a workflow, then fire simulated events (laptop delayed, first PR merged) and watch the agent adapt the plan.',
    tags: ['FastAPI', 'React + Vite', 'Agent Tools', 'SSE'],
    extraLinks: [],
  },
  {
    icon: ServerCog,
    name: 'MCP HR Knowledge & Evals',
    live: 'https://mcp-hr-knowledge-evals-demo.onrender.com',
    repo: 'https://github.com/mellowMike92/mcp-hr-knowledge-evals',
    tagline:
      'A real Model Context Protocol server — cited HR policy retrieval plus a 20-scenario eval harness benchmarked at 0.0% hallucination rate.',
    tryIt:
      'Run each tool straight from the demo cards — same dispatch path as the MCP tools/call handler. Published on npm.',
    tags: ['MCP Server', 'TypeScript', 'Eval Harness', 'npm'],
    extraLinks: [
      {
        icon: FileText,
        label: 'Docs',
        href: 'https://mellowmike92.github.io/mcp-hr-knowledge-evals/',
      },
      {
        icon: Package,
        label: 'npm',
        href: 'https://www.npmjs.com/package/mcp-hr-knowledge-evals',
      },
    ],
  },
];

const capabilities = [
  {
    icon: Bot,
    title: 'AI-Native & MCP Workflows',
    description:
      'LLM-native application design, agent tool orchestration, prompt architecture, and automated evaluation pipelines.',
    tags: ['Claude API', 'MCP Tools', 'Python Evals', 'LangChain'],
  },
  {
    icon: Code2,
    title: 'Fullstack & Prototyping',
    description:
      'End-to-end modern web applications — high-throughput frontend dashboards and fast 0->1 product iteration.',
    tags: ['React.js', 'Next.js 14', 'TypeScript', 'Tailwind', 'Node.js'],
  },
  {
    icon: Server,
    title: 'Infrastructure & Data',
    description:
      'Production-grade backend systems, containerized deployments, and cloud-native data services.',
    tags: ['PostgreSQL', 'Docker', 'AWS', 'Azure DevOps', 'gRPC'],
  },
];

const experience = [
  {
    company: 'Dell Technologies',
    role: 'Senior Principal Software Engineer / Tech Lead',
    dates: '2023 – Present',
    bullets: [
      'Architected fullstack internal productivity and telemetry dashboards using React, TypeScript, and Node.js.',
      'Designed AI workflow automation tools and prompt evaluation routines to accelerate internal developer workflows.',
    ],
  },
  {
    company: 'BJSS',
    role: 'Staff Software Engineer & Cloud Consultant',
    dates: '2021 – 2023',
    bullets: [
      'Led cross-functional developer experience initiatives and internal management portals using Node.js and Python.',
      'Interfaced directly with enterprise stakeholders to translate operational workflows into intuitive product features.',
    ],
  },
  {
    company: 'NASA Johnson Space Center',
    role: 'Flight Displays & Software Developer',
    dates: '2015 – 2017',
    bullets: [
      'Developed astronaut display applications automating Electronic Procedures and real-time flight telemetry streams.',
    ],
  },
];

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      {/* Hero */}
      <header className="mb-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm font-medium text-cyan-300">
          <Sparkles className="h-4 w-4" />
          AI-Native Fullstack Architecture & MCP Tooling
        </span>
        <h1 className="mt-6 text-5xl font-bold tracking-tight text-slate-50 sm:text-6xl">
          Michael Issa
        </h1>
        <p className="mt-3 text-2xl font-semibold text-cyan-400">
          Staff Full-Stack & AI Product Engineer
        </p>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-400">
          10+ years of experience building 0-&gt;1 platforms, high-throughput
          React/TypeScript dashboards, and custom Model Context Protocol
          integrations. I translate high-complexity domain problems into simple,
          fast-shipping products — from astronaut flight displays at NASA to
          AI-native developer tooling at Dell.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href="mailto:michael.f.issa@gmail.com"
            className="inline-flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-2.5 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            <Mail className="h-4 w-4" />
            michael.f.issa@gmail.com
          </a>
          <a
            href="https://github.com/mellowMike92"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/60 px-5 py-2.5 font-semibold text-slate-200 transition hover:border-slate-500 hover:bg-slate-800"
          >
            <Github className="h-4 w-4" />
            github.com/mellowMike92
          </a>
        </div>
      </header>

      {/* Live Projects */}
      <section className="mb-24">
        <div className="mb-6 flex items-center gap-3">
          <Rocket className="h-6 w-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-slate-50">
            Live Projects — Deployed &amp; Interactive
          </h2>
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
        </div>
        <p className="mb-6 max-w-2xl text-slate-400">
          Three production demos running right now — no signup, no API key
          required. Each falls back to a deterministic mode so the full flow is
          always clickable.
        </p>
        <div className="grid gap-6 md:grid-cols-3">
          {projects.map(
            ({ icon: Icon, name, live, repo, tagline, tryIt, tags, extraLinks }) => (
              <div
                key={name}
                className="flex flex-col rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur transition hover:border-cyan-500/40"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="inline-flex rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-2.5">
                    <Icon className="h-5 w-5 text-cyan-400" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-bold tracking-wide text-emerald-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    LIVE
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-100">{name}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                  {tagline}
                </p>
                <p className="mt-2.5 text-xs leading-relaxed text-slate-500">
                  <span className="font-semibold text-cyan-400">Try it:</span>{' '}
                  {tryIt}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 text-xs font-medium text-cyan-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-5">
                  <a
                    href={live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Live app
                  </a>
                  <a
                    href={repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-slate-200"
                  >
                    <Github className="h-3.5 w-3.5" />
                    Code
                  </a>
                  {extraLinks.map(({ icon: LinkIcon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-slate-200"
                    >
                      <LinkIcon className="h-3.5 w-3.5" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      {/* MCP Terminal */}
      <section className="mb-24">
        <div className="mb-6 flex items-center gap-3">
          <TerminalSquare className="h-6 w-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-slate-50">
            Live MCP Agent Terminal
          </h2>
        </div>
        <p className="mb-6 max-w-2xl text-slate-400">
          A simulated Model Context Protocol session — submit a prompt and watch
          the agent route it through structured tool calls before synthesizing a
          response.
        </p>
        <McpTerminal />
      </section>

      {/* Capabilities Matrix */}
      <section className="mb-24">
        <h2 className="mb-8 text-2xl font-bold text-slate-50">
          Technical Capabilities
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {capabilities.map(({ icon: Icon, title, description, tags }) => (
            <div
              key={title}
              className="rounded-xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur transition hover:border-cyan-500/40"
            >
              <div className="mb-4 inline-flex rounded-lg border border-cyan-500/30 bg-cyan-500/10 p-2.5">
                <Icon className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-slate-100">
                {title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-slate-400">
                {description}
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-slate-700 bg-slate-800/80 px-2.5 py-0.5 text-xs font-medium text-cyan-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-16">
        <div className="mb-8 flex items-center gap-3">
          <Briefcase className="h-6 w-6 text-cyan-400" />
          <h2 className="text-2xl font-bold text-slate-50">
            Engineering Leadership
          </h2>
        </div>
        <div className="space-y-8 border-l border-slate-800 pl-6">
          {experience.map((job) => (
            <div key={job.company} className="relative">
              <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full border-2 border-cyan-400 bg-slate-950" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-100">
                  <span className="text-cyan-400">{job.company}</span>
                  <span className="text-slate-400"> — {job.role}</span>
                </h3>
                <span className="font-mono text-sm text-slate-500">
                  {job.dates}
                </span>
              </div>
              <ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-relaxed text-slate-400">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-slate-800 pt-8 text-center text-sm text-slate-500">
        Built with Next.js 14, Tailwind CSS, and a healthy dose of MCP. Deployed
        via GitHub Pages.
      </footer>
    </main>
  );
}
