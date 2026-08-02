import { useEffect, useRef } from 'react';

// --- LES FORMES 3D ---
const shapes = [
  {
    name: 'sphere',
    generate: (count) => {
      const points = [];
      const phi = Math.PI * (3 - Math.sqrt(5)); 
      for (let i = 0; i < count; i++) {
        const y = 1 - (i / (count - 1)) * 2;
        const radius = Math.sqrt(1 - y * y);
        const theta = phi * i;
        points.push({
          x: Math.cos(theta) * radius * 150,
          y: y * 150,
          z: Math.sin(theta) * radius * 150
        });
      }
      return points;
    }
  },
  {
    name: 'cube',
    generate: (count) => {
      const points = [];
      const size = 150;
      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * 2 * size;
        const y = (Math.random() - 0.5) * 2 * size;
        const z = (Math.random() - 0.5) * 2 * size;
        const side = Math.floor(Math.random() * 6);
        if (side === 0) points.push({ x: size, y, z });
        else if (side === 1) points.push({ x: -size, y, z });
        else if (side === 2) points.push({ x, y: size, z });
        else if (side === 3) points.push({ x, y: -size, z });
        else if (side === 4) points.push({ x, y, z: size });
        else points.push({ x, y, z: -size });
      }
      return points;
    }
  },
  {
    name: 'torus',
    generate: (count) => {
      const points = [];
      const R = 120; 
      const r = 50;  
      for (let i = 0; i < count; i++) {
        const u = (i / count) * Math.PI * 2;
        const v = ((i * 7) % count / count) * Math.PI * 2;
        const x = (R + r * Math.cos(v)) * Math.cos(u);
        const y = r * Math.sin(v);
        const z = (R + r * Math.cos(v)) * Math.sin(u);
        points.push({ x, y, z });
      }
      return points;
    }
  },
  {
    name: 'helix',
    generate: (count) => {
      const points = [];
      const radius = 80;
      const height = 300;
      const turns = 3;
      for (let i = 0; i < count; i++) {
        const t = i / count;
        const angle = t * Math.PI * 2 * turns;
        const y = (t - 0.5) * height;
        points.push({
          x: Math.cos(angle) * radius,
          y,
          z: Math.sin(angle) * radius
        });
      }
      return points;
    }
  }
];

export const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationFrameRef = useRef();
  const currentShapeIndexRef = useRef(0);
  const isScatteringRef = useRef(false);
  const rotationRef = useRef({ x: 0, y: 0 });
  const isFormingRef = useRef(false);
  const mouseRef = useRef({ x: 0, y: 0, isDragging: false });
  const targetRotationRef = useRef({ x: 0, y: 0 });
  
  // 🌟 Nouveaux Refs pour gérer le scroll bidirectionnel
  const currentSectionRef = useRef(0);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialiser les particules
    const particleCount = 1500;
    const initialShape = shapes[0].generate(particleCount);
    
    particlesRef.current = initialShape.map((pos) => ({
      x: pos.x, y: pos.y, z: pos.z,
      targetX: pos.x, targetY: pos.y, targetZ: pos.z,
      vx: 0, vy: 0, vz: 0,
      size: Math.random() * 2 + 1
    }));

    let lastTime = performance.now();

    const animate = (currentTime) => {
      const deltaTime = Math.min((currentTime - lastTime) / 1000, 0.1);
      lastTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      if (!isScatteringRef.current) {
        rotationRef.current.x += (targetRotationRef.current.x - rotationRef.current.x) * 0.1;
        rotationRef.current.y += (targetRotationRef.current.y - rotationRef.current.y) * 0.1;
      } else {
        targetRotationRef.current.y += 0.005;
        rotationRef.current.y += 0.005;
      }

      const sortedParticles = [...particlesRef.current].sort((a, b) => a.z - b.z);

      sortedParticles.forEach((particle) => {
        const spring = 0.05;
        const damping = 0.9;
        const dustDamping = 0.98;

        if (isScatteringRef.current) {
          particle.vx *= dustDamping;
          particle.vy *= dustDamping;
          particle.vz *= dustDamping;
        } else {
          const dx = particle.targetX - particle.x;
          const dy = particle.targetY - particle.y;
          const dz = particle.targetZ - particle.z;

          particle.vx += dx * spring;
          particle.vy += dy * spring;
          particle.vz += dz * spring;

          particle.vx *= damping;
          particle.vy *= damping;
          particle.vz *= damping;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;

        const cosX = Math.cos(rotationRef.current.x);
        const sinX = Math.sin(rotationRef.current.x);
        const cosY = Math.cos(rotationRef.current.y);
        const sinY = Math.sin(rotationRef.current.y);

        let x = particle.x;
        let y = particle.y;
        let z = particle.z;

        let rotatedX = x * cosY - z * sinY;
        let rotatedZ = x * sinY + z * cosY;

        const rotatedY = y * cosX - rotatedZ * sinX;
        rotatedZ = y * sinX + rotatedZ * cosX;

        const perspective = 600;
        const scale = perspective / (perspective + rotatedZ);
        
        if (rotatedZ < -perspective + 10 || scale <= 0) return;
        
        const projectedX = rotatedX * scale + centerX;
        const projectedY = rotatedY * scale + centerY;

        const depthOpacity = Math.max(0.1, Math.min(1, (rotatedZ + 300) / 600));
        const size = Math.max(0.1, particle.size * scale);
        
        if (projectedX < -size || projectedX > canvas.width + size || 
            projectedY < -size || projectedY > canvas.height + size) return;
        
        ctx.beginPath();
        ctx.arc(projectedX, projectedY, size, 0, Math.PI * 2);
        
        if (isScatteringRef.current) {
          ctx.fillStyle = `rgba(150, 150, 170, ${depthOpacity * 0.4})`;
        } else {
          ctx.fillStyle = `rgba(46, 103, 255, ${depthOpacity})`;
        }
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const scatterParticles = () => {
      isScatteringRef.current = true;
      particlesRef.current.forEach((particle) => {
        const angle = Math.random() * Math.PI * 2;
        const elevation = (Math.random() - 0.5) * Math.PI;
        const speed = 5 + Math.random() * 10;
        particle.vx = Math.cos(angle) * Math.cos(elevation) * speed;
        particle.vy = Math.sin(elevation) * speed;
        particle.vz = Math.sin(angle) * Math.cos(elevation) * speed;
      });
    };

    const formNewShape = () => {
      currentShapeIndexRef.current = (currentShapeIndexRef.current + 1) % shapes.length;
      const newShape = shapes[currentShapeIndexRef.current].generate(particlesRef.current.length);
      
      particlesRef.current.forEach((particle, i) => {
        particle.targetX = newShape[i].x;
        particle.targetY = newShape[i].y;
        particle.targetZ = newShape[i].z;
      });

      isScatteringRef.current = false;
      isFormingRef.current = true;
    };

    // 🌊 LA NOUVELLE LOGIQUE DE SCROLL (Bidirectionnelle et Automatique)
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // On déclenche l'animation tous les 400px de scroll (plus réactif)
      const currentSection = Math.floor(scrollY / 400);

      // Si le palier a changé (vers le haut OU vers le bas != )
      if (currentSection !== currentSectionRef.current) {
        currentSectionRef.current = currentSection;
        
        // Si la forme est intacte, on la fait exploser
        if (!isScatteringRef.current) {
          scatterParticles();

          // On annule l'ancien timer s'il y en avait un
          if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

          // Et on programme la reformation automatique après 0.8 seconde
          scrollTimeoutRef.current = setTimeout(() => {
            formNewShape();
            
            // On libère l'état d'animation après 1.5s
            setTimeout(() => {
              isFormingRef.current = false;
            }, 1500);
          }, 800);
        }
      }
    };

    const handleMouseDown = (e) => {
      if (!isScatteringRef.current) {
        mouseRef.current.isDragging = true;
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      }
    };

    const handleMouseMove = (e) => {
      if (mouseRef.current.isDragging && !isScatteringRef.current) {
        const deltaX = e.clientX - mouseRef.current.x;
        const deltaY = e.clientY - mouseRef.current.y;
        targetRotationRef.current.y += deltaX * 0.01;
        targetRotationRef.current.x += deltaY * 0.01;
        mouseRef.current.x = e.clientX;
        mouseRef.current.y = e.clientY;
      }
    };

    const handleMouseUp = () => {
      mouseRef.current.isDragging = false;
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('scroll', handleScroll, { passive: true });

    animate(performance.now());

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1, 
        pointerEvents: 'none' 
      }}
    />
  );
};