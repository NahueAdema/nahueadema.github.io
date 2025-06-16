import { useState, useEffect } from "react";
import { Menu, X, Github, Linkedin } from "lucide-react";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed w-full top-0 z-50 bg-dark/80 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a href="/" className="text-2xl font-bold gradient-text">
            Nahu<span className="text-white">Portfolio</span>
          </a>

          {/* Navegación para escritorio */}
          <nav className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-white hover:text-primary-400 transition-colors"
            >
              Inicio
            </a>
            <a
              href="#about"
              className="text-white hover:text-primary-400 transition-colors"
            >
              Sobre mí
            </a>
            <a
              href="#skills"
              className="text-white hover:text-primary-400 transition-colors"
            >
              Habilidades
            </a>
            <a
              href="#projects"
              className="text-white hover:text-primary-400 transition-colors"
            >
              Proyectos
            </a>
            <a
              href="#contact"
              className="text-white hover:text-primary-400 transition-colors"
            >
              Contacto
            </a>

            <div className="flex items-center space-x-4 ml-4">
              <a
                href="https://github.com/username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/username"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </nav>

          {/* Botón de menú móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Menú móvil */}
      <div
        className={`fixed inset-0 bg-dark z-50 flex flex-col justify-center items-center transform transition-transform duration-300 ease-in-out md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={closeMenu}
          className="absolute top-4 right-4 text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <nav className="flex flex-col items-center space-y-8 text-xl">
          <a
            href="/"
            onClick={closeMenu}
            className="text-white hover:text-primary-400 transition-colors"
          >
            Inicio
          </a>
          <a
            href="#about"
            onClick={closeMenu}
            className="text-white hover:text-primary-400 transition-colors"
          >
            Sobre mí
          </a>
          <a
            href="#skills"
            onClick={closeMenu}
            className="text-white hover:text-primary-400 transition-colors"
          >
            Habilidades
          </a>
          <a
            href="#projects"
            onClick={closeMenu}
            className="text-white hover:text-primary-400 transition-colors"
          >
            Proyectos
          </a>
          <a
            href="#contact"
            onClick={closeMenu}
            className="text-white hover:text-primary-400 transition-colors"
          >
            Contacto
          </a>

          <div className="flex items-center space-x-6 mt-8">
            <a
              href="https://github.com/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/username"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
