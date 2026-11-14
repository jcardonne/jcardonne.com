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
    proof:
      "Kissaki, an AI pentest platform in early access. GitChef, an open-source Git client at {version} after {releases} releases.",
    offer: "I take freelance projects: desktop apps, web products and internal tools.",
    based: "Based in France. I work in English and French.",
    primary: "Start a project",
    secondary: "See the work",
  },
  work: {
    title: "Work",
  },
  kissaki: {
    title: "Kissaki",
    body: "A security platform where AI agents attack your web apps and APIs the way a real attacker would, then send you the report. Every proven flaw comes as a dossier: the exploit replayed, SHA-256 fingerprints of the evidence, and the fix as a draft pull request.",
    facts: [
      { label: "Type", value: "Security platform, in early access" },
      { label: "Covers", value: "AI pentest, code security, cloud posture, compliance" },
      { label: "Program", value: "NVIDIA Inception member" },
    ],
    visit: "Visit kissaki.io",
    url: "https://kissaki.io",
    shots: {
      home: "Kissaki homepage: the headline “We attack like a real attacker. Except we send you the report.” above the product dashboard",
      dossier:
        "A Kissaki proof dossier: a critical flaw marked proven, with its evidence and the draft pull request that fixes it",
    },
    features: [
      {
        title: "Strike.",
        body: "AI pentests on web apps, APIs and the external surface: one-off, continuous, or on each pull request.",
      },
      {
        title: "Code.",
        body: "Dependencies, SAST, secrets, IaC and CI/CD checks, with a gate that blocks critical flaws before merge.",
      },
      {
        title: "Cloud.",
        body: "AWS posture, IAM escalation paths, container images and Kubernetes clusters.",
      },
      {
        title: "Comply.",
        body: "Findings mapped to nine frameworks, NIS2, DORA, ISO 27001 and SOC 2 among them.",
      },
    ],
  },
  gitchef: {
    title: "GitChef",
    body: "A desktop Git client written in Tauri, Rust and React. Several repositories open in tabs, a commit graph, inline diffs, and staging down to a single line. It ships as installers for macOS, Windows and Linux and updates itself with signature-verified builds.",
    pace: "{commits} commits and {releases} releases since June 2026.",
    facts: [
      { label: "Type", value: "Open-source desktop app" },
      { label: "Stack", value: "Tauri, Rust, React, TypeScript" },
      { label: "Role", value: "Design, engineering, release pipeline" },
      { label: "License", value: "MIT" },
    ],
    download: "Download {version}",
    repo: "Source on GitHub",
    shots: {
      graph:
        "GitChef commit graph with branches, tags and stashes next to a commit detail panel",
      staging:
        "GitChef staging view with an inline diff next to the staging panel and commit composer",
    },
    features: [
      {
        title: "Commit graph.",
        body: "Branches, tags, remotes and stashes in one history, with the authors' real avatars.",
      },
      {
        title: "Staging by the line.",
        body: "Stage a hunk or one line next to the diff, then commit from the same view.",
      },
      {
        title: "Conflicts.",
        body: "Merge and rebase conflicts are resolved inline, side by side.",
      },
      {
        title: "Pull requests.",
        body: "Open a GitHub PR or a GitLab MR and follow review and CI from the sidebar.",
      },
    ],
  },
  deceive: {
    title: "Deceive for macOS",
    type: "Open-source macOS app",
    body: "Appear offline in League of Legends, Teamfight Tactics and Legends of Runeterra on a Mac, and keep lobby chat and invites. A menu bar port of the Windows tool Deceive: download it, drag it to Applications, play.",
    stack: "Python, GitHub Actions",
    download: "Download",
    repo: "Source on GitHub",
  },
  cleanyourtv: {
    title: "CleanYourTV",
    type: "Open-source contribution",
    body: "Gathin23's project strips the bloatware from Android and Google TVs over Wi-Fi and replaces the ad-filled home screen. My part is the debloat list for the Sony BRAVIA 4K, merged in pull request 154.",
    stack: "ADB, Android TV",
    pr: "Pull request 154",
    site: "cleanyour.tv",
  },
  client: {
    title: "Client work",
    type: "Private",
    body: "Some of what I build belongs to clients and stays private. Ask, and I'll walk you through what I can on a call.",
    cta: "Ask about it",
  },
  services: {
    title: "What you can hire me for",
    items: [
      {
        title: "Desktop apps",
        body: "Tauri, Rust and React. Installers, auto-updates and the release pipeline are part of the job, on macOS, Windows and Linux.",
      },
      {
        title: "Web products",
        body: "Interface, API, data and hosting, from the first prototype to production. TypeScript or Go.",
      },
      {
        title: "Internal tools",
        body: "CLIs, automations and integrations that take manual steps off your team.",
      },
    ],
    processTitle: "How a project runs",
    process: [
      "A call to understand the problem and its constraints.",
      "A written scope with a timeline and a price, before any work starts.",
      "Working builds you can try while the project moves.",
      "A handover: documented code and a pipeline your team can run.",
    ],
  },
  stats: {
    title: "In public",
    sentence:
      "{commits} commits and {releases} releases on GitChef, the latest on {date}. {repos} public repositories, {stars} stars and {followers} followers on GitHub.",
    languages: "GitChef is {list}.",
    live: "Read from the GitHub API and refreshed every hour.",
    snapshot: "GitHub could not be reached, so these figures date from 14 November 2026.",
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
    colophon: "Set in Archivo. Built with Next.js.",
    top: "Back to top",
  },
};

export type Dictionary = typeof en;

export default en;
