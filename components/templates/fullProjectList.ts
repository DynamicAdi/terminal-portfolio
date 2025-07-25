export interface Project {
  image: string;
  title: string;
  description: string;
  tags: string[];
  builtOn: string[];
  complexity: string;
  githubUrl: string;
  viewProjectUrl: string;
}


export const fullProjectList = [
  {
    image: "/images/unirun.png",
    title: "UniRun – Inline Code Runner",
    description: "VS Code extension that shows inline console.log output for multiple languages and frameworks with fallback runner detection.",
    tags: ["VS Code", "DevTool", "Inline Logs", "TSX", "Python"],
    builtOn: ["TypeScript", "Webpack", "vm2", "esbuild"],
    complexity: "Advanced",
    githubUrl: "https://github.com/your-username/unirun",
    viewProjectUrl: "https://marketplace.visualstudio.com/items?itemName=your-id.unirun"
  },
  {
    image: "/images/voltsec.png",
    title: "VoltSec – Vulnerability Scanner",
    description: "YAML-driven CLI scanner supporting both custom and Nuclei templates with dynamic matcher engine and rich PoC generation.",
    tags: ["Cybersecurity", "Scanner", "YAML", "CLI"],
    builtOn: ["Python", "Typer", "Requests", "PyYAML"],
    complexity: "Very Advanced",
    githubUrl: "https://github.com/your-username/voltsec",
    viewProjectUrl: "https://voltsec.dev"
  },
  {
    image: "/images/yaml-engine.png",
    title: "Dynamic YAML Template Engine",
    description: "Parses and executes YAML-defined logic for scanning, using request/response matchers, variables, and PoC output.",
    tags: ["Template Engine", "Parser", "Security"],
    builtOn: ["Python", "Regex", "Jinja2"],
    complexity: "Advanced",
    githubUrl: "https://github.com/your-username/yaml-engine",
    viewProjectUrl: "https://engine.voltsec.dev"
  },
  {
    image: "/images/devto-cli.png",
    title: "Dev.to CLI Uploader",
    description: "Publish and manage Dev.to blog posts from terminal using frontmatter Markdown.",
    tags: ["CLI", "Blog", "Markdown"],
    builtOn: ["Node.js", "Inquirer"],
    complexity: "Low",
    githubUrl: "https://github.com/your-username/devto-cli",
    viewProjectUrl: "https://npmjs.com/package/devto-cli"
  },
  {
    image: "/images/linux-dashboard.png",
    title: "Linux System Info Dashboard",
    description: "Desktop dashboard to monitor CPU, RAM, and GPU usage on Linux in real-time.",
    tags: ["Monitoring", "Dashboard", "Linux"],
    builtOn: ["Electron", "React", "Node.js"],
    complexity: "Intermediate",
    githubUrl: "https://github.com/your-username/linux-dashboard",
    viewProjectUrl: "https://yourname.dev/systeminfo"
  },
  {
    image: "/images/tailwind-components.png",
    title: "Tailwind Component Vault",
    description: "Collection of dark-mode, animated UI components built using TailwindCSS and Framer Motion.",
    tags: ["UI", "Tailwind", "Components"],
    builtOn: ["Tailwind CSS", "Framer Motion"],
    complexity: "Low",
    githubUrl: "https://github.com/your-username/tailwind-vault",
    viewProjectUrl: "https://tailwindvault.dev"
  },
  {
    image: "/images/header-audit.png",
    title: "Security Header Auditor",
    description: "Tool that checks missing HTTP headers like CSP, HSTS, X-Frame-Options on any target domain.",
    tags: ["Headers", "Audit", "Security"],
    builtOn: ["Python", "httpx"],
    complexity: "Low",
    githubUrl: "https://github.com/your-username/header-auditor",
    viewProjectUrl: "https://audit.voltsec.dev"
  },
  {
    image: "/images/resume-cli.png",
    title: "Resume Generator",
    description: "Generate Markdown/HTML/PDF resumes from YAML or JSON config files.",
    tags: ["Resume", "CLI", "Markdown"],
    builtOn: ["Node.js", "Markdown", "Puppeteer"],
    complexity: "Low",
    githubUrl: "https://github.com/your-username/resume-cli",
    viewProjectUrl: "https://resume.dev"
  },
  {
    image: "/images/nmap-wrapper.png",
    title: "Nmap Scanner Wrapper",
    description: "Friendly CLI wrapper for nmap to generate clean reports for internal audits.",
    tags: ["Nmap", "Security", "Audit"],
    builtOn: ["Bash", "Python"],
    complexity: "Low",
    githubUrl: "https://github.com/your-username/nmap-wrapper",
    viewProjectUrl: "https://nmap.devtools.io"
  }
];
