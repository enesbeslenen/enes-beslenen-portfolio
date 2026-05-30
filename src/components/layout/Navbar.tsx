"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

export default function Navbar() {
  const { t, lang, toggleLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  const links = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.contact, href: "#contact" },
  ];

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setHidden(y > lastY.current && y > 80);
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50"
      animate={{ y: hidden ? -100 : 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? "bg-[#0d0d0d]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/30"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center gap-2 select-none"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Image
              src="/logo.png"
              alt="Enes Beslenen logo"
              width={40}
              height={40}
              className="h-9 w-9 shrink-0 object-contain"
              priority
            />
            <span className="text-lg font-semibold tracking-tight leading-none">
              <span className="text-white">enes</span>
              <span className="text-[#e8621a]">.</span>
            </span>
          </motion.a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <NavLink key={link.href} link={link} onClick={handleNav} />
            ))}

            {/* Language toggle */}
            <motion.button
              onClick={toggleLang}
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-mono border border-white/10 text-neutral-400 hover:border-white/25 hover:text-white transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle language"
            >
              <span className={lang === "tr" ? "text-[#e8621a]" : "text-neutral-600"}>TR</span>
              <span className="text-neutral-700">/</span>
              <span className={lang === "en" ? "text-[#e8621a]" : "text-neutral-600"}>EN</span>
            </motion.button>

            <motion.a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNav("#contact");
              }}
              className="px-4 py-2 rounded-full text-sm font-medium border border-[#e8621a] text-[#e8621a] hover:bg-[#e8621a] hover:text-black transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t.nav.hireMe}
            </motion.a>
          </nav>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-3">
            <motion.button
              onClick={toggleLang}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono border border-white/10 text-neutral-400"
              whileTap={{ scale: 0.95 }}
            >
              <span className={lang === "tr" ? "text-[#e8621a]" : "text-neutral-600"}>TR</span>
              <span className="text-neutral-700">/</span>
              <span className={lang === "en" ? "text-[#e8621a]" : "text-neutral-600"}>EN</span>
            </motion.button>
            <motion.button
              className="text-neutral-400 hover:text-white transition-colors"
              onClick={() => setMobileOpen((o) => !o)}
              whileTap={{ scale: 0.9 }}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden overflow-hidden bg-[#0d0d0d]/95 backdrop-blur-xl border-b border-white/5"
          >
            <nav className="flex flex-col px-6 py-4 gap-4">
              {links.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNav(link.href)}
                  className="text-left text-neutral-300 hover:text-white py-2 text-lg font-medium transition-colors"
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: links.length * 0.05 }}
                onClick={() => handleNav("#contact")}
                className="mt-2 px-4 py-3 rounded-full text-sm font-medium bg-[#e8621a] text-black text-center"
              >
                {t.nav.hireMe}
              </motion.button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

function NavLink({
  link,
  onClick,
}: {
  link: { label: string; href: string };
  onClick: (href: string) => void;
}) {
  return (
    <motion.button
      onClick={() => onClick(link.href)}
      className="relative text-sm text-neutral-400 hover:text-white transition-colors duration-200 group"
      whileHover={{ y: -1 }}
    >
      {link.label}
      <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#e8621a] group-hover:w-full transition-all duration-300" />
    </motion.button>
  );
}
