Initialize a modern, production-grade Next.js 14 App Router project in the current working directory to replace the static portfolio site for Michael Issa.

### Objective
Build a full-stack, AI-native interactive developer portfolio web application highlighting 10+ years of experience in 0->1 product engineering, React/TypeScript dashboards, Model Context Protocol (MCP) integrations, and LLM orchestration. Configure GitHub Actions to automatically build and deploy the application to GitHub Pages.

### Stack Requirements
- Framework: Next.js 14+ (App Router, Static Export configured)
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS (dark mode default with slate/cyan theme)
- Icons: Lucide React (`lucide-react`)
- Deployment: GitHub Pages via GitHub Actions workflow (`.github/workflows/deploy.yml`)

### Key Components & Architecture

1. Core Layout & Theme (`app/layout.tsx` & `app/globals.css`):
   - Dark mode background (`#030712` / `slate-950`) with slate-100 text.
   - Radial cyan/indigo gradient background mesh for modern AI aesthetic.
   - Responsive container max-w-6xl with smooth scrolling.

2. Hero Section (`app/page.tsx`):
   - Header with badge: "AI-Native Fullstack Architecture & MCP Tooling".
   - Name: Michael Issa.
   - Title: Staff Full-Stack & AI Product Engineer.
   - Bio emphasizing 10+ years of experience building 0->1 platforms, high-throughput React/TypeScript dashboards, and custom Model Context Protocol integrations.
   - Direct CTAs for email (`michael.f.issa@gmail.com`) and GitHub (`https://github.com/mellowMike92`).

3. Interactive MCP (Model Context Protocol) Agent Terminal (`app/page.tsx`):
   - Create a client-side interactive terminal emulator simulating a live MCP server.
   - Include a live server status indicator badge (emerald pulsing light).
   - Scrollable terminal output box displaying real-time log outputs (`[MCP Server]`, `[Client Prompt]`, `[MCP Action]`, `[Claude Synthesis]`).
   - Input form with an "Execute" button to let visitors submit test prompts and receive mock structured tool calls/responses with a loading state.

4. Technical Capabilities Matrix (`app/page.tsx`):
   - 3-column card grid highlighting:
     1. AI-Native & MCP Workflows (Claude API, MCP Tools, Python Evals, LangChain)
     2. Fullstack & Prototyping (React.js, Next.js 14, TypeScript, Tailwind, Node.js)
     3. Infrastructure & Data (PostgreSQL, Docker, AWS, Azure DevOps, gRPC)

5. Engineering Leadership History (`app/page.tsx`):
   - Dell Technologies — Senior Principal Software Engineer / Tech Lead (2023 – Present)
   - BJSS — Staff Software Engineer & Cloud Consultant (2021 – 2023)
   - NASA Johnson Space Center — Flight Displays & Software Developer (2015 – 2017)

6. Static Deployment Setup:
   - Configure `next.config.js` with `output: 'export'`, `images: { unoptimized: true }`, and `basePath: '/portfolio'`.
   - Create `.github/workflows/deploy.yml` using `actions/deploy-pages` to build the Next.js static output and deploy automatically to GitHub Pages on every push to `main`.

### Instructions for Execution
1. Install all required dependencies (`lucide-react`, `tailwindcss`, `@types/node`, etc.).
2. Generate all source files under `app/`, `next.config.js`, `tailwind.config.js`, `package.json`, and `.github/workflows/deploy.yml`.
3. Verify the build passes locally with `npm run build`.
4. Commit all changes to `main` and push to `origin main`.