import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaLock } from 'react-icons/fa';
import Reveal from '../components/Reveal';
import './Projects.css';
import thronosImg from '../assets/ThronosWebsit.png';
import agromapBOImg from '../assets/AgromapBackOffice.png';
import agromapWebImg from '../assets/AgromapWebsite.png';

// 📂 Tes données 
const initialProjects = [
  {
    id: 1,
    title: "Thronos-CI",
    techs: ["React Web", "HTML", "CSS", "Javascript"],
    desc: "Il s'agit d'un site web pour une entreprise de la place  Thronos-CI qui est spécialisée dans transformation digitale , la creation de sites web , et le marketing digitale.",
    media: thronosImg,
    liveLink: "https://Thronos-ci.com",
    githubLink: "private" // Marqué comme privé
  },
  {
    id: 2,
    title: "BackOffice Agromap",
    techs: ["React", "Swagger", "Django", "Api REST"],
    desc: "C'est un tableau de bord pour suivre les données de l'entreprise Agromap CI.",
    media: agromapBOImg,
    liveLink: "#",
    githubLink: "private" // Marqué comme privé
  },
  {
    id: 3,
    title: "Agromap CI",
    techs: ["React", "Leaflet", "CSS3", "JS"],
    desc: "Il s'agit d'un site web pour une entreprise de la place  Agromap CI qui est spécialisée dans l'agriculture .",
    media: agromapWebImg,
    liveLink: "http://demo.agromap-holding.com/",
    githubLink: "private" // Marqué comme privé
  }
];

// 🧮 La formule de détection de Swipe
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

const Projects = () => {
  // 🔄 Notre fameux tableau d'index
  const [indices, setIndices] = useState([0, 1, 2]);

  // Fait tourner les index (1->0, 2->1, 0->2)
  const paginate = () => {
    setIndices((prev) => [prev[1], prev[2], prev[0]]);
  };

  return (
    <section className="projects-section" id="projets">
      <div className="section-header">
        <Reveal direction="up" delay={0.1}>
          <h2 className="section-title">Mes Projets</h2>
        </Reveal>
        <Reveal direction="up" delay={0.2}>
          <p className="section-subtitle">
            Découvrez mes réalisations. (Swipez la carte pour passer à la suivante !)
          </p>
        </Reveal>
      </div>

      <Reveal direction="up" delay={0.3}>
        <div className="stack-container">
          {indices.map((dataIndex, visualIndex) => {
            const project = initialProjects[dataIndex];
            const isFront = visualIndex === 0;

            return (
              <motion.div
                key={project.id} // La carte garde toujours son identité
                className="project-card"

                // 👆 La physique élastique globale
                drag={true}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                dragElastic={0.7}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -10000 || swipe > 10000) {
                    paginate();
                  }
                }}

                // 🎯 L'ANIMATION DIRECTE : Impossible à bugger !
                // À chaque changement, Framer Motion est forcé d'animer vers ces valeurs.
                animate={{
                  opacity: 1,
                  zIndex: [3, 2, 1][visualIndex],
                  scale: [1, 0.95, 0.9][visualIndex],
                  y: [0, 20, 40][visualIndex],
                  x: [0, 15, 30][visualIndex],
                  rotate: [0, 3, 6][visualIndex],
                }}

                // ⏱️ LES PARAMÈTRES DE PHYSIQUE (Avec l'astuce du délai zIndex)
                transition={{
                  zIndex: { delay: 0.05 },
                  scale: { type: "spring", duration: 0.3, bounce: 0.3 },
                  y: { type: "spring", duration: 0.3, bounce: 0.3 },
                  x: { type: "spring", duration: 0.5, bounce: 0.1 },
                  rotate: { type: "spring", duration: 0.5, bounce: 0.1 }
                }}

                whileHover={isFront ? { scale: 1.02 } : {}}
                whileTap={isFront ? { cursor: "grabbing" } : {}}
              >

                {/* Le contenu de ta carte reste identique */}
                <div className="project-media-container">
                  <img src={project.media} alt={project.title} className="project-media" />
                  <div className="netflix-overlay"></div>
                </div>

                <div className="project-info">
                  <h3>{project.title}</h3>
                  <div className="tech-stack">
                    {project.techs.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <p>{project.desc}</p>
                  <div className="project-links">
                    {project.githubLink === "private" ? (
                      <span className="btn-icon private-btn">
                        <FaLock /> Privé
                      </span>
                    ) : project.githubLink && project.githubLink !== "#" ? (
                      <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-icon">
                        <FaGithub /> Code
                      </a>
                    ) : null}

                    {project.liveLink && project.liveLink !== "#" && (
                      <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-icon">
                        <FaExternalLinkAlt /> Live
                      </a>
                    )}
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
};

export default Projects;