import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";
import { ArrowDown, Code, Server, Database } from "lucide-react";

const Hero = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  // Inicializar Three.js
  useEffect(() => {
    if (!canvasRef.current) return;

    // Crear escena
    const scene = new THREE.Scene();

    // Crear cámara
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Crear renderizador
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Crear geometría de partículas
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;

    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    // Material para partículas
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
    });

    // Crear mesh de partículas
    const particlesMesh = new THREE.Points(
      particlesGeometry,
      particlesMaterial
    );
    scene.add(particlesMesh);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.x += 0.0005;
      particlesMesh.rotation.y += 0.0005;

      renderer.render(scene, camera);
    };

    animate();

    // Ajustar al tamaño de la ventana
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      scene.remove(particlesMesh);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      className="relative h-screen flex items-center justify-center overflow-hidden"
      id="home"
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full -z-10"
      />

      <div
        ref={containerRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 z-10"
      >
        <div className="text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4"
          >
            <span className="gradient-text">Desarrollador Full Stack</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-gray-300 max-w-3xl mx-auto"
          >
            Transformando ideas en experiencias digitales excepcionales con
            código limpio y diseño centrado en el usuario.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <a
              href="#contact"
              className="px-8 py-3 rounded-full bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors"
            >
              Contáctame
            </a>
            <a
              href="#projects"
              className="px-8 py-3 rounded-full bg-transparent border border-white/20 hover:bg-white/10 text-white font-medium transition-colors"
            >
              Ver proyectos
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center gap-12 mt-16"
          >
            <motion.div
              className="flex flex-col items-center"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-3">
                <Code className="w-8 h-8 text-primary-400" />
              </div>
              <span className="text-sm text-gray-400">Frontend</span>
            </motion.div>

            <motion.div
              className="flex flex-col items-center"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-3">
                <Server className="w-8 h-8 text-secondary-400" />
              </div>
              <span className="text-sm text-gray-400">Backend</span>
            </motion.div>

            <motion.div
              className="flex flex-col items-center"
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <div className="p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 mb-3">
                <Database className="w-8 h-8 text-green-400" />
              </div>
              <span className="text-sm text-gray-400">Bases de datos</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1,
          y: {
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
      >
        <a
          href="#about"
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors"
        >
          <span className="text-sm mb-2">Descubre más</span>
          <ArrowDown className="w-5 h-5" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;
