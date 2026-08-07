import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp, FaHeart } from 'react-icons/fa';
import Reveal from './Reveal';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="main-footer">
      <Reveal direction="up" delay={0.1}>
        <div className="footer-container">

          {/* --- COLONNE 1 : MARQUE & BIO --- */}
          <div className="footer-brand">
            <a href="#hero" className="footer-logo">
              MonPortfolio<span>.</span>
            </a>
            <p className="footer-tagline">
              Développeur Web passionné par la création d'expériences numériques élégantes,
              interactives et performantes.
            </p>
            <div className="availability-badge">
              <span className="pulse-dot"></span>
              <span>Disponible pour de nouvelles opportunités</span>
            </div>
          </div>

          {/* --- COLONNE 2 : NAVIGATION RAPIDE --- */}
          <div className="footer-nav">
            <h4 className="footer-title">Navigation</h4>
            <ul className="footer-links">
              <li><a href="#hero">Accueil</a></li>
              <li><a href="#apropos">À propos</a></li>
              <li><a href="#projets">Projets</a></li>
              <li><a href="#competences">Compétences</a></li>
              <li><a href="#parcours">Parcours</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* --- COLONNE 3 : RÉSEAUX SOCIAUX --- */}
          <div className="footer-socials-col">
            <h4 className="footer-title">Me suivre</h4>
            <p className="footer-social-desc">Retrouvez-moi sur mes réseaux sociaux et plateformes :</p>
            <div className="social-icons">
              <a
                href="https://github.com/ThreeTrust?tab=repositories"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="social-btn"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/patrick-youzan-138723309/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="social-btn"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:patyanyouzan@gmail.com"
                aria-label="Email"
                className="social-btn"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>

        </div>

      </Reveal>

      {/* --- LIGNE SÉPARATRICE ET BAS DE FOOTER --- */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p className="copyright">
            Conçu et développé par <b>Patrick YOUZAN</b> © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
