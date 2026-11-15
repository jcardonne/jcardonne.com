const en = {
  meta: {
    title: "Jean Cardonne, product builder",
    description:
      "Jean Cardonne builds desktop apps, web products and internal tools, and ships them. Maker of Kissaki, the AI pentest platform, and GitChef, the open-source Git client. Available for freelance projects.",
  },
  nav: {
    label: "Main",
    work: "Work",
    services: "Services",
    openSource: "In public",
    contact: "Contact",
    switchLabel: "Passer en français",
    skip: "Skip to content",
  },
  hero: {
    statement: "I build software and ship it.",
    offer: "Available for freelance work: desktop apps, web products and internal tools. Based in France.",
    primary: "Start a project",
    secondary: "See the work",
  },
  work: {
    title: "Work",
  },
  kissaki: {
    title: "Kissaki",
    body: "AI agents attack your web apps and APIs like a real attacker, then send you the report: the proof of each flaw and its fix as a pull request.",
    status: "In early access",
    inception: "NVIDIA Inception Program member",
    visit: "Visit kissaki.io",
    url: "https://kissaki.io",
    shot: "Kissaki homepage: the headline “We attack like a real attacker. Except we send you the report.” above the product dashboard",
    features: [
      { title: "Strike", body: "AI pentests on apps, APIs and your external surface." },
      { title: "Code", body: "Code, dependency and secret scanning, gated before merge." },
      { title: "Cloud", body: "AWS posture, IAM paths, containers and Kubernetes." },
      { title: "Comply", body: "Findings mapped to NIS2, DORA, ISO 27001 and SOC 2." },
    ],
  },
  gitchef: {
    title: "GitChef",
    body: "A fast, open-source Git client for macOS, Windows and Linux, built with Tauri, Rust and React. {commits} commits and {releases} releases since June 2026.",
    download: "Download {version}",
    repo: "Source",
    shot: "GitChef commit graph with branches, tags and stashes next to a commit detail panel",
    features: [
      { title: "Commit graph", body: "Branches, tags and stashes in one history." },
      { title: "Line staging", body: "Stage a single line straight from the diff." },
      { title: "Conflicts", body: "Resolve merges and rebases side by side." },
      { title: "Pull requests", body: "Open PRs and follow CI from the sidebar." },
    ],
  },
  deceive: {
    title: "Deceive for macOS",
    meta: "Open-source macOS app",
    body: "Appear offline in League of Legends on a Mac while keeping chat and invites. A menu bar port of the Windows tool Deceive.",
    download: "Download",
    repo: "Source",
  },
  cleanyourtv: {
    title: "CleanYourTV",
    meta: "Open-source contribution",
    body: "Strips the ads and bloatware from Android TVs. I contributed the Sony BRAVIA 4K debloat list.",
    pr: "Pull request 154",
    site: "cleanyour.tv",
  },
  client: {
    title: "Client work",
    meta: "Private",
    body: "Some of what I build stays private. Ask, and I'll show what I can on a call.",
    cta: "Ask about it",
  },
  services: {
    title: "What you can hire me for",
    items: [
      {
        title: "Desktop apps",
        body: "Tauri, Rust and React, shipped with installers and auto-updates.",
      },
      {
        title: "Web products",
        body: "Interface, API, data and hosting, from prototype to production.",
      },
      {
        title: "Internal tools",
        body: "CLIs, automations and integrations that save your team time.",
      },
    ],
    processTitle: "How a project runs",
    process: ["A call", "A written scope and price", "Working builds as we go", "A clean handover"],
  },
  stats: {
    title: "In public",
    sentence: "{commits} commits and {releases} releases on GitChef. {repos} public repositories on GitHub.",
    live: "Live from the GitHub API, refreshed hourly.",
    snapshot: "GitHub is unreachable; figures from 14 November 2026.",
    profile: "GitHub profile",
  },
  contact: {
    title: "Tell me what you're building.",
    name: "Name",
    email: "Email",
    message: "Your project",
    messagePlaceholder: "What it is, where it stands, when you need it",
    website: "Website",
    send: "Send",
    sending: "Sending",
    success: "Sent. Thank you, I'll reply soon.",
    invalid: "Add your name, a valid email and a few words about the project.",
    rateLimited: "Too many messages from this connection. Try again in a few minutes.",
    error: "The message did not go through. Write to me on GitHub instead.",
    elsewhere: "Elsewhere",
  },
  footer: {
    top: "Back to top",
  },
};

export type Dictionary = typeof en;

export default en;
