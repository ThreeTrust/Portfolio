import { skillsData } from '../data/content';
import Reveal from '../components/Reveal';
import { 
  FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, 
  FaGitAlt, FaFigma, FaDatabase, FaServer, FaCode, 
  FaWind, FaBolt, FaDesktop, FaTools, FaMobileAlt, 
  FaNetworkWired, FaTasks, FaLeaf
} from 'react-icons/fa';
import './Skills.css';

// 🧠 Dictionnaire pour les Satellites (Technologies)
const getIconForSkill = (skillName) => {
  const name = skillName.toLowerCase();
  if (name.includes('react')) return <FaReact />;
  if (name.includes('javascript') || name.includes('es6')) return <FaJs />;
  if (name.includes('html')) return <FaHtml5 />;
  if (name.includes('css')) return <FaCss3Alt />;
  if (name.includes('tailwind')) return <FaWind />; 
  if (name.includes('vite')) return <FaBolt />;     

  if (name.includes('node')) return <FaNodeJs />;
  if (name.includes('express')) return <FaServer />; 
  if (name.includes('postgre')) return <FaDatabase />; 
  if (name.includes('mongo')) return <FaLeaf />; // Feuille pour MongoDB
  if (name.includes('api')) return <FaNetworkWired />; 

  if (name.includes('git')) return <FaGitAlt />;
  if (name.includes('figma')) return <FaFigma />;
  if (name.includes('responsive')) return <FaMobileAlt />;
  if (name.includes('agile') || name.includes('méthode')) return <FaTasks />;

  return <FaCode />; 
};

// 🌟 Nouveau Dictionnaire pour les Astres Centraux (Spécialités)
const getIconForCategory = (categoryName) => {
  const name = categoryName.toLowerCase();
  if (name.includes('front')) return <FaDesktop />; // Écran pour le Front
  if (name.includes('back') || name.includes('donnée')) return <FaServer />; // Serveur pour le Back
  if (name.includes('outil') || name.includes('autre')) return <FaTools />; // Outils divers
  return <FaCode />;
};

const Skills = () => {
  return (
    <section className="skills-section" id="competences">
      <div className="section-header">
        <Reveal direction="up" delay={0.1}>
          <h2 className="section-title">Mes Compétences</h2>
        </Reveal>
        <Reveal direction="up" delay={0.2}>
          <p className="section-subtitle">
            Mes spécialités et les technologies qui gravitent autour.
          </p>
        </Reveal>
      </div>

      <div className="skills-universe">
        {skillsData.map((categoryData, index) => (
          <Reveal 
            key={index}
            direction="scale"
            delay={index * 0.2}
            className="system-wrapper wave-float"
            width="auto"
          >
            {/* 🌊 LE CONTENEUR GLOBAL QUI FAIT FLOTTER TOUT LE SYSTÈME */}
            {/* On décale l'animation css selon l'index pour qu'ils ne montent pas tous en même temps */}
            <div style={{ animationDelay: `${index * 0.5}s` }}>
              
              <div className="solar-system">
                
                {/* 🌟 L'ASTRE CENTRAL (Maintenant avec Icône + Infobulle) */}
                <div className="orbit-center">
                  <div className="center-icon">
                    {getIconForCategory(categoryData.category)}
                  </div>
                  <span className="satellite-tooltip">{categoryData.category}</span>
                </div>

                {/* 🛰️ LES SATELLITES */}
                {categoryData.skills.map((skill, i) => (
                  <div 
                    key={i} 
                    className="orbit-satellite"
                    style={{ 
                      '--i': i, 
                      '--total': categoryData.skills.length 
                    }}
                  >
                    <div className="satellite-icon">
                      {getIconForSkill(skill)}
                    </div>
                    <span className="satellite-tooltip">{skill}</span>
                  </div>
                ))}

              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;