import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import {
  FaUser, FaLightbulb, FaRocket, FaCode,
  FaMapMarkerAlt, FaDownload, FaEnvelope
} from 'react-icons/fa';
import './About.css';
import whatImg from '../assets/WHAT.png';

const About = () => {
  const highlights = [
    { icon: <FaLightbulb />, title: "UX/UI", desc: "Design intuitif" },
    { icon: <FaCode />, title: "Code", desc: "Propre & Robuste" },
    { icon: <FaRocket />, title: "SEO", desc: "Performance max" }
  ];

  return (
    <section className="about-section" id="apropos">
      <div className="section-header">
        <Reveal direction="up" delay={0.1}>
          <h2 className="section-title">À Propos de Moi</h2>
        </Reveal>
        <Reveal direction="up" delay={0.2}>
          <p className="section-subtitle">
            Découvrez mon univers sous forme de Bento Grid.
          </p>
        </Reveal>
      </div>

      <div className="bento-grid">

        {/* --- BENTO 1 : BIOGRAPHIE (Grande case) --- */}
        <Reveal
          className="bento-item bento-bio"
          direction="up"
          delay={0.1}
        >
          <div className="bio-header">
            <div className="bio-avatar-wrapper">
              <img
                src={whatImg}
                alt="Portrait"
                className="bio-avatar"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div>
              <h3 className="bio-name">Développeur Full-Stack</h3>
              <p className="bio-tag">Passionné & Créatif</p>
            </div>
          </div>
          <div className="bio-text-wrapper">
            <p className="bio-text">
              Passionné par le développement web, je conçois des applications robustes et des interfaces intuitives. Mon objectif ? Transformer des idées complexes en solutions élégantes, réactives et centrées sur l'utilisateur.
            </p>
            <p className="bio-text" style={{ marginTop: '0.8rem' }}>
              En veille technologique constante, j'aime relever des défis techniques, écrire du code maintenable et optimiser chaque détail pour offrir la meilleure expérience numérique possible.
            </p>
          </div>
          <div className="about-actions">
            <a href="#contact" className="btn btn-primary">
              <FaEnvelope /> Me contacter
            </a>
            <a href="/CV.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
              <FaDownload /> CV
            </a>
          </div>
        </Reveal>

        {/* --- BENTO 2 : LOCALISATION --- */}
        <Reveal
          className="bento-item bento-map"
          direction="scale"
          delay={0.2}
        >
          <div className="map-overlay"></div>
          <div className="map-content">
            <div className="pin-icon"><FaMapMarkerAlt /></div>
            <h4>Basé en Côte d'Ivoire</h4>
            <p>Abidjan</p>
          </div>
        </Reveal>

        {/* --- BENTO 3 : STATISTIQUE 1 --- */}
        <Reveal
          className="bento-item bento-stat primary-bg"
          direction="scale"
          delay={0.3}
        >
          <h3 className="stat-big-number">3+</h3>
          <p className="stat-big-label">Années d'expérience</p>
        </Reveal>

        {/* --- BENTO 4 : VALEURS / HIGHLIGHTS (Large case) --- */}
        <Reveal
          className="bento-item bento-values"
          direction="up"
          delay={0.4}
        >
          <h4 className="bento-small-title">Ce qui me définit</h4>
          <div className="values-grid">
            {highlights.map((item, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{item.icon}</div>
                <div>
                  <h5 className="value-title">{item.title}</h5>
                  <span className="value-desc">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        {/* --- BENTO 5 : STATISTIQUE 2 --- */}
        <Reveal
          className="bento-item bento-stat dark-bg"
          direction="scale"
          delay={0.5}
        >
          <h3 className="stat-big-number">15+</h3>
          <p className="stat-big-label">Projets réalisés</p>
        </Reveal>

      </div>
    </section>
  );
};

export default About;
