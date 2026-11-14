import type { Dictionary } from "./en";

const fr: Dictionary = {
  meta: {
    title: "Jean Cardonne, product builder",
    description:
      "Jean Cardonne conçoit des applications desktop, des produits web et des outils internes, et les livre. Auteur de GitChef, le client Git open source. Disponible en freelance.",
  },
  nav: {
    label: "Principale",
    work: "Projets",
    services: "Services",
    openSource: "En public",
    contact: "Contact",
    switchLabel: "Switch to English",
    skip: "Aller au contenu",
  },
  hero: {
    statement: "Je construis des logiciels et je les livre.",
    proof:
      "GitChef, mon client Git open source, en est à la {version} après {releases} versions publiées.",
    offer:
      "Je prends des missions freelance : applications desktop, produits web et outils internes.",
    based: "Basé en France. Je travaille en français et en anglais.",
    primary: "Démarrer un projet",
    secondary: "Voir les projets",
  },
  work: {
    title: "Projets",
    type: "Type",
    stack: "Stack",
    role: "Rôle",
    license: "Licence",
  },
  gitchef: {
    title: "GitChef",
    type: "Application desktop open source",
    body: "Un client Git desktop écrit avec Tauri, Rust et React. Plusieurs dépôts ouverts en onglets, un graphe de commits, des diffs en ligne et un staging à la ligne près. Il est distribué en installeurs pour macOS, Windows et Linux et se met à jour seul, avec des builds à signature vérifiée.",
    pace: "{commits} commits et {releases} versions depuis juin 2026.",
    stack: "Tauri, Rust, React, TypeScript",
    role: "Design, développement, pipeline de release",
    license: "MIT",
    download: "Télécharger la {version}",
    repo: "Code source sur GitHub",
    shots: {
      graph:
        "Graphe de commits de GitChef avec branches, tags et stashes, à côté du détail d'un commit",
      staging:
        "Vue de staging de GitChef avec un diff en ligne à côté du panneau de staging et de l'éditeur de commit",
    },
    features: [
      {
        title: "Graphe de commits.",
        body: "Branches, tags, remotes et stashes dans un seul historique, avec les vrais avatars des auteurs.",
      },
      {
        title: "Staging à la ligne.",
        body: "Indexez un bloc ou une seule ligne à côté du diff, puis commitez depuis la même vue.",
      },
      {
        title: "Conflits.",
        body: "Les conflits de merge et de rebase se résolvent en ligne, côte à côte.",
      },
      {
        title: "Pull requests.",
        body: "Ouvrez une PR GitHub ou une MR GitLab et suivez la revue et la CI depuis la barre latérale.",
      },
    ],
  },
  deceive: {
    title: "Deceive pour macOS",
    type: "Application macOS open source",
    body: "Apparaître hors ligne dans League of Legends, Teamfight Tactics et Legends of Runeterra sur Mac, en gardant le chat de salon et les invitations. Un portage en barre de menus de l'outil Windows Deceive : on télécharge, on glisse dans Applications, on joue.",
    stack: "Python, GitHub Actions",
    download: "Télécharger",
    repo: "Code source sur GitHub",
  },
  cleanyourtv: {
    title: "CleanYourTV",
    type: "Contribution open source",
    body: "Le projet de Gathin23 retire les bloatwares des Android TV et Google TV en Wi-Fi et remplace l'écran d'accueil rempli de publicités. Ma part : la liste de nettoyage du Sony BRAVIA 4K, fusionnée dans la pull request 154.",
    stack: "ADB, Android TV",
    pr: "Pull request 154",
    site: "cleanyour.tv",
  },
  client: {
    title: "Missions client",
    type: "Privé",
    body: "Une partie de ce que je construis appartient à mes clients et reste privée. Demandez, et je vous en montre ce que je peux lors d'un appel.",
    cta: "En parler",
  },
  services: {
    title: "Ce que vous pouvez me confier",
    items: [
      {
        title: "Applications desktop",
        body: "Tauri, Rust et React. Installeurs, mises à jour automatiques et pipeline de release font partie du travail, sur macOS, Windows et Linux.",
      },
      {
        title: "Produits web",
        body: "Interface, API, données et hébergement, du premier prototype à la production. TypeScript ou Go.",
      },
      {
        title: "Outils internes",
        body: "CLI, automatisations et intégrations qui retirent des étapes manuelles à votre équipe.",
      },
    ],
    processTitle: "Comment se déroule un projet",
    process: [
      "Un appel pour comprendre le problème et ses contraintes.",
      "Un cadrage écrit avec un calendrier et un prix, avant le début du travail.",
      "Des builds fonctionnels que vous testez pendant que le projet avance.",
      "Une passation : du code documenté et un pipeline que votre équipe fait tourner.",
    ],
  },
  stats: {
    title: "En public",
    sentence:
      "{commits} commits et {releases} versions de GitChef, la dernière le {date}. {repos} dépôts publics, {stars} étoiles et {followers} abonnés sur GitHub.",
    languages: "GitChef, c'est {list}.",
    live: "Lu dans l'API GitHub et actualisé toutes les heures.",
    snapshot: "GitHub est injoignable, ces chiffres datent donc du 14 novembre 2026.",
    profile: "Profil GitHub",
  },
  contact: {
    title: "Dites-moi ce que vous construisez.",
    name: "Nom",
    email: "E-mail",
    message: "Votre projet",
    messagePlaceholder: "Ce que c'est, où il en est, pour quand",
    website: "Site web",
    send: "Envoyer",
    sending: "Envoi",
    success: "Envoyé. Merci, je vous réponds rapidement.",
    invalid: "Indiquez votre nom, un e-mail valide et quelques mots sur le projet.",
    rateLimited: "Trop de messages depuis cette connexion. Réessayez dans quelques minutes.",
    error: "Le message n'est pas parti. Écrivez-moi plutôt sur GitHub.",
    elsewhere: "Ailleurs",
  },
  footer: {
    colophon: "Composé en Archivo. Construit avec Next.js.",
    top: "Retour en haut",
  },
};

export default fr;
