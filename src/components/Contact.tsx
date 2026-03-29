import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle, Info } from "lucide-react";

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type FormStatus = {
  isSubmitting: boolean;
  isSubmitted: boolean;
  isError: boolean;
  message: string;
};

const Contact = () => {
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formStatus, setFormStatus] = useState<FormStatus>({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      isError: false,
      message: "",
    });

    try {
      const response = await fetch("https://formspree.io/f/mpqopgkk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setFormStatus({
          isSubmitting: false,
          isSubmitted: true,
          isError: false,
          message:
            "¡Gracias por tu mensaje! Te responderé lo más pronto posible.",
        });
        setFormState({ name: "", email: "", subject: "", message: "" });

        setTimeout(() => {
          setFormStatus({
            isSubmitting: false,
            isSubmitted: false,
            isError: false,
            message: "",
          });
        }, 5000);
      } else {
        throw new Error("Error al enviar");
      }
    } catch {
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        message: "Hubo un error al enviar el mensaje. Intentá de nuevo.",
      });
    }
  };
  return (
    <section
      id="contact"
      className="section-padding bg-gradient-to-b from-dark to-black"
    >
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center gradient-text">
            Contacto
          </h2>

          <p className="text-center text-gray-400 mb-12 max-w-3xl mx-auto">
            ¿Tienes un proyecto interesante o quieres hablar sobre oportunidades
            de colaboración? Estaré encantado de escucharte. ¡Contáctame!
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 fade-in">
              <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl h-full">
                <h3 className="text-2xl font-bold mb-6">
                  Información de contacto
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="p-3 bg-primary-900/50 rounded-full mr-4">
                      <Mail className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Email</h4>
                      <a
                        href="mailto:email@example.com"
                        className="text-gray-400 hover:text-primary-400 transition-colors"
                      >
                        ademanahuel@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="p-3 bg-primary-900/50 rounded-full mr-4">
                      <MapPin className="w-6 h-6 text-primary-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-medium">Ubicación</h4>
                      <address className="text-gray-400 not-italic">
                        Bolivar, Argentina
                      </address>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="text-lg font-medium mb-4">Sígueme en:</h4>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      target="_blank"
                      className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                    <a
                      href="https://github.com/NahueAdema"
                      target="_blank"
                      className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                    <a
                      href="https://www.linkedin.com/in/nahuel-adema-6627a3304/"
                      target="_blank"
                      className="p-3 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors"
                    >
                      <svg
                        className="w-5 h-5 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 fade-in">
              <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl">
                <h3 className="text-2xl font-bold mb-6">Envía un mensaje</h3>

                {formStatus.isSubmitted && !formStatus.isError ? (
                  <div className="flex items-center p-4 bg-green-900/30 text-green-400 rounded-xl mb-6">
                    <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0" />
                    <p>{formStatus.message}</p>
                  </div>
                ) : formStatus.isError ? (
                  <div className="flex items-center p-4 bg-red-900/30 text-red-400 rounded-xl mb-6">
                    <Info className="w-5 h-5 mr-2 flex-shrink-0" />
                    <p>{formStatus.message}</p>
                  </div>
                ) : null}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-400 mb-2"
                      >
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-400 mb-2"
                      >
                        Correo electrónico
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                        placeholder="correo@ejemplo.com"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Asunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white"
                      placeholder="¿Sobre qué quieres hablar?"
                    />
                  </div>

                  <div className="mb-6">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-white resize-none"
                      placeholder="Escribe tu mensaje aquí..."
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus.isSubmitting}
                    className="w-full md:w-auto px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {formStatus.isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
