import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  CircleCheckBig,
  Info,
  Mail,
  MapPin,
  Send,
} from "lucide-react";
import { useI18n } from "../../i18n/context";
import { GithubIcon, LinkedinIcon } from "../shell/SocialIcons";

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

const ContactView = () => {
  const { t } = useI18n();

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
    setFormState({ ...formState, [e.target.name]: e.target.value });
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
          message: t.contact.success,
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
        message: t.contact.error,
      });
    }
  };

  return (
    <div className="h-full overflow-y-auto px-6 py-10">
      <div className="mx-auto max-w-3xl">
        <div className="mb-2 flex items-center gap-3 font-mono text-sm text-muted">
          <span className="text-green">~/contact.md</span>
          <span className="text-faint">—</span>
          <span>{t.contact.heading}</span>
        </div>

        <p className="mb-10 max-w-2xl text-sm leading-relaxed text-muted">
          {t.contact.intro}
        </p>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-border bg-panel p-5">
              <h3 className="mb-5 font-bold">{t.contact.infoTitle}</h3>

              <div className="space-y-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{t.contact.emailLabel}</p>
                    <a
                      href="mailto:ademanahuel@gmail.com"
                      className="font-mono text-xs text-muted hover:text-accent"
                    >
                      ademanahuel@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      {t.contact.locationLabel}
                    </p>
                    <p className="text-xs text-muted">
                      {t.contact.locationValue}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-border pt-5">
                <p className="mb-3 text-xs text-faint">{t.contact.follow}</p>
                <div className="flex gap-2">
                  <a
                    href="https://github.com/NahueAdema"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-hover hover:text-fore"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="h-4 w-4" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/nahuel-adema-6627a3304/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition-colors hover:bg-hover hover:text-fore"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="rounded-xl border border-border bg-panel p-5">
              <h3 className="mb-5 font-bold">{t.contact.formTitle}</h3>

              {formStatus.isSubmitted && !formStatus.isError ? (
                <div className="mb-5 flex items-center gap-2 rounded-lg bg-green/10 p-3 text-sm text-green">
                  <CircleCheckBig className="h-4 w-4 shrink-0" />
                  <p>{formStatus.message}</p>
                </div>
              ) : formStatus.isError ? (
                <div className="mb-5 flex items-center gap-2 rounded-lg bg-red/10 p-3 text-sm text-red">
                  <Info className="h-4 w-4 shrink-0" />
                  <p>{formStatus.message}</p>
                </div>
              ) : null}

              <form onSubmit={handleSubmit}>
                <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field
                    label={t.contact.name}
                    name="name"
                    type="text"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder={t.contact.namePlaceholder}
                    required
                  />
                  <Field
                    label={t.contact.email}
                    name="email"
                    type="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder={t.contact.emailPlaceholder}
                    required
                  />
                </div>

                <Field
                  label={t.contact.subject}
                  name="subject"
                  type="text"
                  value={formState.subject}
                  onChange={handleChange}
                  placeholder={t.contact.subjectPlaceholder}
                  required
                />

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="mb-1.5 block text-sm text-muted"
                  >
                    {t.contact.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    placeholder={t.contact.messagePlaceholder}
                    className="w-full resize-none rounded-md border border-border bg-editor px-3 py-2 text-sm text-fore placeholder:text-faint focus:border-accent focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus.isSubmitting}
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2 text-sm font-medium text-black transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {formStatus.isSubmitting ? (
                    <>
                      <Loader className="h-4 w-4 animate-spin" />
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      {t.contact.send}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function Field({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm text-muted">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-editor px-3 py-2 text-sm text-fore placeholder:text-faint focus:border-accent focus:outline-none"
      />
    </div>
  );
}

const Loader = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={className}
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export default ContactView;