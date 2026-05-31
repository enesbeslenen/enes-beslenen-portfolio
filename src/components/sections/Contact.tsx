"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Mail, Send, ArrowRight, CheckCircle2 } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { useLang } from "@/contexts/LanguageContext";
import {
  WEB3FORMS_ENDPOINT,
  buildWeb3FormsBody,
  getWeb3FormsAccessKey,
  isWeb3FormsSuccess,
  type Web3FormsResponse,
} from "@/lib/contact";

const SOCIALS = [
  {
    icon: GithubIcon,
    label: "GitHub",
    handle: "@enesbeslenen",
    href: "https://github.com/enesbeslenen",
    color: "#ffffff",
  },
  {
    icon: LinkedinIcon,
    label: "LinkedIn",
    handle: "Enes Beslenen",
    href: "https://www.linkedin.com/in/enes-beslenen-b64866412/",
    color: "#0a66c2",
  },
  {
    icon: InstagramIcon,
    label: "Instagram",
    handle: "@enesbslnn_",
    href: "https://www.instagram.com/enesbslnn_/",
    color: "#e1306c",
  },
  {
    icon: Mail,
    label: "Email",
    handle: "enesbeslenen.dev@gmail.com",
    href: "mailto:enesbeslenen.dev@gmail.com",
    color: "#e8621a",
  },
];

type FormState = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState<FormState>("idle");
  const [errorHint, setErrorHint] = useState<string | null>(null);
  const [fields, setFields] = useState({ name: "", email: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");
    setErrorHint(null);

    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(
          buildWeb3FormsBody(
            {
              name: fields.name,
              email: fields.email,
              message: fields.message,
            },
            getWeb3FormsAccessKey()
          )
        ),
      });

      let data: Web3FormsResponse = {};
      try {
        data = (await response.json()) as Web3FormsResponse;
      } catch {
        /* non-JSON response */
      }

      if (!response.ok || !isWeb3FormsSuccess(data)) {
        setErrorHint(data.message ?? t.contact.sendError);
        throw new Error(data.message ?? "Send failed");
      }

      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFields((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-32 bg-[#080808] relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#e8621a]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="text-[#e8621a] font-mono text-sm tracking-widest uppercase mb-3">
            {t.contact.sectionLabel}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {t.contact.title}{" "}
            <span className="text-[#e8621a]">{t.contact.titleAccent}</span>
          </h2>
          <p className="text-neutral-400 max-w-md mx-auto text-[15px] leading-relaxed">
            {t.contact.subtitle}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-10 items-start">
          {/* Left: Socials */}
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-xs text-neutral-600 font-mono uppercase tracking-wider mb-6"
            >
              {t.contact.findMeOn}
            </motion.p>

            {SOCIALS.map((social, i) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                whileHover={{ x: 6, borderColor: `${social.color}30` }}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#141414] border border-white/5 group transition-colors duration-200"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${social.color}15` }}
                >
                  <social.icon style={{ width: 18, height: 18, color: social.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-200">{social.label}</p>
                  <p className="text-xs text-neutral-500 font-mono">{social.handle}</p>
                </div>
                <ArrowRight
                  size={14}
                  className="text-neutral-700 group-hover:text-neutral-400 group-hover:translate-x-1 transition-all duration-200"
                />
              </motion.a>
            ))}
          </div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="rounded-2xl bg-[#141414] border border-white/5 p-8"
          >
            <AnimatePresence mode="wait">
              {formState === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-12 gap-5 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                  >
                    <CheckCircle2 size={52} className="text-emerald-400" />
                  </motion.div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-100 mb-2">
                      {t.contact.messageSent}
                    </h3>
                    <p className="text-neutral-400 text-sm">{t.contact.thankYou}</p>
                  </div>
                  <motion.button
                    onClick={() => {
                      setFormState("idle");
                      setFields({ name: "", email: "", message: "" });
                    }}
                    className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors font-mono underline underline-offset-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    {t.contact.sendAnother}
                  </motion.button>
                </motion.div>
              ) : formState === "error" ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="flex flex-col items-center justify-center py-12 gap-5 text-center"
                >
                  <p className="text-neutral-400 text-sm max-w-sm">
                    {errorHint ?? t.contact.sendError}
                  </p>
                  <motion.button
                    onClick={() => {
                      setFormState("idle");
                      setErrorHint(null);
                    }}
                    className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors font-mono underline underline-offset-2"
                    whileHover={{ scale: 1.05 }}
                  >
                    {t.contact.sendAnother}
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <FormField
                      label={t.contact.nameLabel}
                      name="name"
                      type="text"
                      placeholder={t.contact.namePlaceholder}
                      value={fields.name}
                      onChange={handleChange}
                      required
                    />
                    <FormField
                      label={t.contact.emailLabel}
                      name="email"
                      type="email"
                      placeholder={t.contact.emailPlaceholder}
                      value={fields.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-neutral-500 font-mono uppercase tracking-wider">
                      {t.contact.messageLabel}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      placeholder={t.contact.messagePlaceholder}
                      required
                      value={fields.message}
                      onChange={handleChange}
                      className="w-full bg-[#1c1c1c] border border-white/8 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-[#e8621a]/40 focus:ring-1 focus:ring-[#e8621a]/20 transition-colors duration-200 resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={formState === "sending"}
                    className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#e8621a] text-black font-semibold rounded-xl text-sm hover:bg-[#ff7830] disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200"
                    whileHover={formState !== "sending" ? { scale: 1.02, boxShadow: "0 0 25px rgba(232,98,26,0.35)" } : {}}
                    whileTap={formState !== "sending" ? { scale: 0.98 } : {}}
                  >
                    {formState === "sending" ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                        />
                        {t.contact.sending}
                      </>
                    ) : (
                      <>
                        <Send size={15} />
                        {t.contact.sendButton}
                      </>
                    )}
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs text-neutral-500 font-mono uppercase tracking-wider">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        className="bg-[#1c1c1c] border border-white/8 rounded-xl px-4 py-3 text-sm text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-[#e8621a]/40 focus:ring-1 focus:ring-[#e8621a]/20 transition-colors duration-200"
      />
    </div>
  );
}
