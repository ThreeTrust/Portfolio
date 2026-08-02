// src/data/content.js

export const projectsData = [
  {
    id: 1,
    title: "E-Commerce Premium",
    description: "Une boutique en ligne complète avec gestion du panier, paiement sécurisé et tableau de bord administrateur.",
    tech: ["React", "Node.js", "Stripe"],
    // On met une image par défaut pour l'instant
    image: "https://via.placeholder.com/600x400/2e67ff/ffffff?text=Projet+1",
    github: "https://github.com/ton-profil",
    live: "https://ton-projet.com"
  },
  {
    id: 2,
    title: "Application Météo App",
    description: "Application météo en temps réel utilisant la géolocalisation et une API tierce pour des prévisions précises.",
    tech: ["JavaScript", "API REST", "CSS Flexbox"],
    image: "https://via.placeholder.com/600x400/0e142b/ffffff?text=Projet+2",
    github: "https://github.com/ton-profil",
    live: "https://ton-projet.com"
  },
  {
    id: 3,
    title: "Dashboard Analytique",
    description: "Interface d'administration permettant de visualiser des données complexes sous forme de graphiques interactifs.",
    tech: ["React", "Chart.js", "Vite"],
    image: "https://via.placeholder.com/600x400/ff6c35/ffffff?text=Projet+3",
    github: "https://github.com/ton-profil",
    live: "https://ton-projet.com"
  }
];

// Ajoute ceci à la suite de ton tableau projectsData existant

export const skillsData = [
  {
    category: "Front-End",
    skills: ["React", "JavaScript (ES6+)", "HTML5 / CSS3", "Tailwind CSS", "Vite"]
  },
  {
    category: "Back-End & Base de données",
    skills: ["Node.js", "Express", "PostgreSQL", "MongoDB", "API REST"]
  },
  {
    category: "Outils & Autres",
    skills: ["Git / GitHub", "Figma", "Responsive Design", "Méthodes Agiles"]
  }
];

// Ajoute ceci à la suite de tes skillsData

export const experienceData = [
  {
    id: 1,
    role: "Développeur Front-End",
    company: "Thronos CI",
    date: "janvier 2026 - Présent",
    description: "Création d'interfaces utilisateur modernes en React. Optimisation des performances et de l'accessibilité web."
  },
  {
    id: 2,
    role: "Developpeur web",
    company: "Flux Technologie",
    date: "Août 2025 - Décembre 2025",
    description: "Développement et maintenance d'applications web. Optimisation des performances et de l'accessibilité web."
  }
];

export const educationData = [
  {
    id: 1,
    degree: "Licence en Génie logiciel",
    school: "GECOS Formation",
    date: "2024 - 2025",
    description: "Obtention de la licence en Génie logiciel"
  },
  {
    id: 2,
    degree: "BTS en Informatique et Développement d'Applications (IDA)",
    school: "Groupe Bowls",
    date: "2022 - 2023",
    description: "Obtention du BTS en Informatique et Développement d'Applications (IDA)."
  }

];