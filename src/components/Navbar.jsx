import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
import './Navbar.css';

// 🎛️ LE NOUVEAU COMPOSANT TOGGLE PREMIUM
const ThemeToggle = ({ isDark, toggleTheme }) => {
  const playClickSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      if (isDark) {
        osc.type = "sine";
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
      } else {
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
      }
      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {
      console.error("Audio play failed", e);
    }
  };

  const handleToggle = () => {
    playClickSound();
    toggleTheme();
  };

  return (
    <motion.div
      className="theme-track"
      onClick={handleToggle}
      role="switch"
      aria-checked={!isDark}
      aria-label="Toggle Dark Mode"
      animate={{
        backgroundColor: isDark ? "rgba(30, 30, 35, 1)" : "rgba(220, 220, 225, 1)",
        boxShadow: isDark
          ? "inset 0px 4px 8px rgba(0,0,0,0.5)"
          : "inset 0px 4px 8px rgba(0,0,0,0.1)",
      }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <motion.div
        className="theme-thumb"
        animate={{
          x: isDark ? 0 : 34,
          backgroundColor: isDark ? "#2c2c2c" : "#ffffff",
          boxShadow: isDark
            ? "0px 4px 12px rgba(0,0,0,0.6), 0 0 10px rgba(46, 103, 255, 0.2)"
            : "0px 4px 12px rgba(0,0,0,0.2), 0 0 15px rgba(255, 200, 0, 0.3)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <div className="theme-icon-container">
          <AnimatePresence mode="wait">
            {!isDark ? (
              <motion.div
                key="sun"
                className="theme-icon sun-icon"
                initial={{ scale: 0, rotate: -90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaSun />
              </motion.div>
            ) : (
              <motion.div
                key="moon"
                className="theme-icon moon-icon"
                initial={{ scale: 0, rotate: 90, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                exit={{ scale: 0, rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <FaMoon />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

// 🚢 LA NAVBAR PRINCIPALE
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Bloquer le scroll du body quand le menu est ouvert,
  // en compensant la largeur de la scrollbar pour éviter tout layout shift.
  useEffect(() => {
    if (menuOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [menuOpen]);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDark(true);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  const navLinks = [
    { href: "#apropos", label: "À propos" },
    { href: "#projets", label: "Projets" },
    { href: "#competences", label: "Compétences" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-logo">
          <a href="#">Portfolio.</a>
        </div>

        <div className="navbar-menu">
          {/* Liens desktop */}
          <ul className="navbar-links">
            {navLinks.map(link => (
              <li key={link.href}><a href={link.href}>{link.label}</a></li>
            ))}
          </ul>

          {/* Toggle thème desktop */}
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

          {/* Bouton hamburger mobile */}
          <button
            className={`hamburger-btn ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* --- OVERLAY SOMBRE --- */}
      <div
        className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* --- PANNEAU LATÉRAL MOBILE --- */}
      <nav className={`mobile-nav-panel ${menuOpen ? 'open' : ''}`} aria-label="Navigation mobile">
        {navLinks.map(link => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <hr className="mobile-nav-divider" />
        <div className="mobile-theme-row">
          <span className="mobile-theme-label">
            {isDark ? "Mode Sombre" : "Mode Clair"}
          </span>
          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
