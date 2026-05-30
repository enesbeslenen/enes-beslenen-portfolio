"use client";

import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { useLang } from "@/contexts/LanguageContext";

const socials = [
  { icon: GithubIcon, href: "https://github.com/enesbeslenen", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/enes-beslenen-b64866412/", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://www.instagram.com/enesbslnn_/", label: "Instagram" },
];

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="border-t border-white/5 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2 text-neutral-500 text-sm">
          <span>© {new Date().getFullYear()}</span>
          <span className="text-[#e8621a] font-medium">Enes Beslenen</span>
          <span>{t.footer.builtWith}</span>
        </div>

        <div className="flex items-center gap-6">
          {socials.map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="text-neutral-500 hover:text-[#e8621a] transition-colors duration-200"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon style={{ width: 18, height: 18 }} />
            </motion.a>
          ))}

          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ml-2 p-2 rounded-full border border-white/10 text-neutral-500 hover:border-[#e8621a] hover:text-[#e8621a] transition-colors duration-200"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Back to top"
          >
            <ArrowUp size={14} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
