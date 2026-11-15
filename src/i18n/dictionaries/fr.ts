import type { Dictionary } from "./en";

const fr: Dictionary = {
  meta: {
    title: "Jean Cardonne, product builder",
    description:
      "Jean Cardonne conçoit des applications desktop, des produits web et des outils internes, et les livre. Auteur de Kissaki, la plateforme de pentest par IA, et de GitChef, le client Git open source. Disponible en freelance.",
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
    offer: "Disponible en freelance : applications desktop, produits web et outils internes. Basé en France.",
    primary: "Démarrer un projet",
    secondary: "Voir les projets",
  },
  work: {
    title: "Projets",
  },
  kissaki: {
    title: "Kissaki",
    body: "Des agents IA attaquent vos applications web et vos API comme un vrai attaquant, puis vous envoient le rapport : la preuve de chaque faille et son correctif en pull request.",
    status: "En accès anticipé",
    inception: "Membre du programme NVIDIA Inception",
    visit: "Voir kissaki.io",
    url: "https://kissaki.io/fr",
    shot: "Page d'accueil de Kissaki : le titre « We attack like a real attacker. Except we send you the report. » au-dessus du tableau de bord du produit",
    features: [
      { title: "Strike", body: "Pentests par IA sur vos applications, API et surface externe." },
      { title: "Code", body: "Analyse du code, des dépendances et des secrets, bloquée avant le merge." },
      { title: "Cloud", body: "Posture AWS, chemins IAM, conteneurs et Kubernetes." },
      { title: "Comply", body: "Failles rattachées à NIS2, DORA, ISO 27001 et SOC 2." },
    ],
  },
  gitchef: {
    title: "GitChef",
    body: "Un client Git rapide et open source pour macOS, Windows et Linux, construit avec Tauri, Rust et React. {commits} commits et {releases} versions depuis juin 2026.",
    download: "Télécharger la {version}",
    repo: "Code source",
    shot: "Graphe de commits de GitChef avec branches, tags et stashes, à côté du détail d'un commit",
    features: [
      { title: "Graphe de commits", body: "Branches, tags et stashes dans un seul historique." },
      { title: "Staging à la ligne", body: "Indexez une seule ligne directement depuis le diff." },
      { title: "Conflits", body: "Résolvez merges et rebases côte à côte." },
      { title: "Pull requests", body: "Ouvrez des PR et suivez la CI depuis la barre latérale." },
    ],
  },
  deceive: {
    title: "Deceive pour macOS",
    meta: "Application macOS open source",
    body: "Apparaître hors ligne dans League of Legends sur Mac en gardant le chat et les invitations. Un portage en barre de menus de l'outil Windows Deceive.",
    download: "Télécharger",
    repo: "Code source",
  },
  cleanyourtv: {
    title: "CleanYourTV",
    meta: "Contribution open source",
    body: "Retire les publicités et bloatwares des Android TV. J'y ai ajouté la liste de nettoyage du Sony BRAVIA 4K.",
    pr: "Pull request 154",
    site: "cleanyour.tv",
  },
  client: {
    title: "Missions client",
    meta: "Privé",
    body: "Une partie de ce que je construis reste privée. Demandez, je vous en montre ce que je peux en appel.",
    cta: "En parler",
  },
  services: {
    title: "Ce que vous pouvez me confier",
    items: [
      {
        title: "Applications desktop",
        body: "Tauri, Rust et React, livrées avec installeurs et mises à jour automatiques.",
      },
      {
        title: "Produits web",
        body: "Interface, API, données et hébergement, du prototype à la production.",
      },
      {
        title: "Outils internes",
        body: "CLI, automatisations et intégrations qui font gagner du temps à votre équipe.",
      },
    ],
    processTitle: "Comment se déroule un projet",
    process: ["Un appel", "Un cadrage écrit avec un prix", "Des builds au fil de l'eau", "Une passation propre"],
  },
  stats: {
    title: "En public",
    sentence: "{commits} commits et {releases} versions de GitChef. {repos} dépôts publics sur GitHub.",
    live: "En direct de l'API GitHub, actualisé toutes les heures.",
    snapshot: "GitHub est injoignable ; chiffres du 14 novembre 2026.",
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
    top: "Retour en haut",
  },
};

export default fr;
