import './Hero.css';
import { FaPhoneAlt, FaEnvelope, FaLinkedinIn, FaFacebookF } from 'react-icons/fa';
import Reveal from '../components/Reveal';
import whatImg from '../assets/WHAT.png';

const Hero = () => {
  // On stocke le texte dans une variable pour le découper facilement
  const roleText = "Développeur Front-End";

  return (
    <section className="hero-section" id="accueil">
      <div className="hero-content">

        {/* --- PARTIE GAUCHE : LE TEXTE --- */}
        <div className="hero-text-side">
          <Reveal direction="left" delay={0.1}>
            <h1 className="hero-name">Bi Dja Patrick YOUZAN</h1>
          </Reveal>

          {/* --- LA NOUVELLE ANIMATION KINETIC ICI --- */}
          <Reveal direction="left" delay={0.2}>
            <h2 className="hero-title">
              Je suis <br />
              <span className="fx-text-split" aria-label={roleText}>
                {roleText.split('').map((char, index) => (
                  <span
                    key={index}
                    // On passe l'index à la variable CSS personnalisée --i
                    style={{ '--i': index }}
                  >
                    {/* Si le caractère est un espace, on force l'affichage de l'espace */}
                    {char === ' ' ? '\u00A0' : char}
                  </span>
                ))}
              </span>
            </h2>
          </Reveal>

          <Reveal direction="left" delay={0.3}>
            <p className="hero-description">
              Je conçois et développe des expériences web modernes, performantes et
              accessibles. Transformons vos idées en réalité numérique.
            </p>
          </Reveal>

          <Reveal direction="left" delay={0.4}>
            <div className="hero-buttons">
              <a href="#projets" className="btn btn-primary">Voir mes projets</a>
              <a href="#contact" className="btn btn-secondary">Me contacter</a>
            </div>
          </Reveal>
        </div>

        {/* --- PARTIE DROITE : LA PHOTO --- */}
        <div className="hero-image-side">
          <Reveal direction="right" delay={0.3}>
            <div className="hero-image-container">
              <img
                src={whatImg}
                alt="Portrait de moi"
                className="hero-profile-pic"
              />
              {/* L'arc de cercle et les icônes (Orbit responsive) */}
              <div className="hero-arc-wrapper">
                <div className="hero-arc-line"></div>

                <div className="icon-orbit" style={{ '--angle': '40deg' }}>
                  <a href="tel:+225 0173056396" className="hero-arc-icon" aria-label="Téléphone"><FaPhoneAlt /></a>
                </div>

                <div className="icon-orbit" style={{ '--angle': '73deg' }}>
                  <a href="mailto:patyanyouzan@gmail.com" className="hero-arc-icon" aria-label="Email"><FaEnvelope /></a>
                </div>

                <div className="icon-orbit" style={{ '--angle': '106deg' }}>
                  <a href="https://www.linkedin.com/in/patrick-youzan-138723309/" target="_blank" rel="noreferrer" className="hero-arc-icon" aria-label="LinkedIn"><FaLinkedinIn /></a>
                </div>

                <div className="icon-orbit" style={{ '--angle': '140deg' }}>
                  <a href="https://www.facebook.com/profile.php?id=100080367537603" target="_blank" rel="noreferrer" className="hero-arc-icon" aria-label="Facebook"><FaFacebookF /></a>
                </div>

              </div>
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  );
};

export default Hero;