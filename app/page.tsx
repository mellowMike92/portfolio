import {
  Bot,
  Code2,
  Github,
  Mail,
  Server,
  Sparkles,
  TerminalSquare,
  Briefcase,
} from 'lucide-react';
import McpTerminal from '@/components/mcp-terminal';

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
