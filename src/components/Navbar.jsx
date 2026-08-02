import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa'; // On utilise react-icons au lieu de lucide-react !
import './Navbar.css';

// 🎛️ LE NOUVEAU COMPOSANT TOGGLE PREMIUM
const ThemeToggle = ({ isDark, toggleTheme }) => {
  // L'effet sonore (Web Audio API)
  const playClickSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      // Pitch différent selon la direction
      if (isDark) {
        osc.type = "sine";
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.1);
      } else {
        osc.type = "sine";
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.1);
      }

      // Volume très subtil (0.03) pour un effet premium
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
      // Animation du fond du Track
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
        // Animation du cercle (Thumb) : 0px à gauche, 34px à droite
        animate={{
          x: isDark ? 0 : 34, 
          backgroundColor: isDark ? "#2c2c2c" : "#ffffff",
          boxShadow: isDark 
            ? "0px 4px 12px rgba(0,0,0,0.6), 0 0 10px rgba(46, 103, 255, 0.2)" 
            : "0px 4px 12px rgba(0,0,0,0.2), 0 0 15px rgba(255, 200, 0, 0.3)",
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
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

  const iosSpring = {
    type: "spring",
    stiffness: 350,
    damping: 25,
    mass: 0.8
  };

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      layout 
      transition={iosSpring} 
    >
      <motion.div layout transition={iosSpring} className="navbar-logo">
        <a href="#">Portfolio.</a>
      </motion.div>
      
      <motion.div layout transition={iosSpring} className="navbar-menu">
        <ul className="navbar-links">
          <li><a href="#apropos">À propos</a></li>
          <li><a href="#projets">Projets</a></li>
          <li><a href="#competences">Compétences</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        
        {/* On intègre notre nouveau bouton magique ici ! */}
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;