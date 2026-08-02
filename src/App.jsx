import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Journey from './sections/Journey'; 
import Contact from './sections/Contact';
import { ParticleCanvas } from './components/ParticleCanvas'; // 👈 1. On importe ton nouveau fond magique

function App() {
  return (
    <div>
      {/* 🌌 2. TON ARRIÈRE-PLAN 3D INTERACTIF */}
      {/* Il se mettra tout seul en fond grâce à son z-index: -1 */}
      {/* <ParticleCanvas /> */}

      {/* 🚢 LE RESTE DE TON SITE (qui passe par-dessus le fond) */}
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Journey /> 
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
export default App;