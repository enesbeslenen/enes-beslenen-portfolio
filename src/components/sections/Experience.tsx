"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, MapPin } from "lucide-react";
import { useLang } from "@/contexts/LanguageContext";

const EDUCATION_DATA = {
  en: [
    {
      role: "Web Design and Coding",
      company: "Harran University",
      location: "Şanlıurfa, Turkey",
      period: "2025 — Present",
      current: true,
      description:
        "Currently studying web design and coding at Harran University. Focused on frontend development, UI/UX design principles, and modern web technologies. Building real-world projects to apply what I learn.",
      highlights: [
        "Learning HTML, CSS, JavaScript, and modern frameworks like React & Next.js",
        "Working on personal and academic projects to build a strong portfolio",
        "Exploring UI/UX design, responsive web design, and accessibility",
      ],
      tech: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Figma"],
    },
  ],
  tr: [
    {
      role: "Web Tasarım ve Kodlama",
      company: "Harran Üniversitesi",
      location: "Şanlıurfa, Türkiye",
      period: "2025 — Devam Ediyor",
      current: true,
      description:
        "Harran Üniversitesi'nde web tasarım ve kodlama bölümünde öğrenciyim. Frontend geliştirme, UI/UX tasarım prensipleri ve modern web teknolojilerine odaklanıyorum. Öğrendiklerimi uygulamak için gerçek projeler geliştiriyorum.",
      highlights: [
        "HTML, CSS, JavaScript ve React & Next.js gibi modern framework'leri öğreniyorum",
        "Güçlü bir portföy oluşturmak için kişisel ve akademik projeler üzerinde çalışıyorum",
        "UI/UX tasarımı, duyarlı web tasarımı ve erişilebilirliği keşfediyorum",
      ],
      tech: ["HTML", "CSS", "JavaScript", "React", "Next.js", "Tailwind CSS", "Figma"],
    },
  ],
};

function TimelineItem({
  item,
  index,
  currentLabel,
}: {
  item: (typeof EDUCATION_DATA.en)[number];
  index: number;
  currentLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
      className="relative flex gap-6"
    >
      {/* Timeline dot */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.2, type: "spring", stiffness: 300 }}
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 border-2 ${
            item.current
              ? "bg-[#e8621a] border-[#e8621a] shadow-lg shadow-[#e8621a]/30"
              : "bg-[#1c1c1c] border-white/10"
          }`}
        >
          <GraduationCap size={16} className={item.current ? "text-black" : "text-neutral-400"} />
        </motion.div>
      </div>

      {/* Content card */}
      <div className="pb-10 flex-1">
        <motion.div
          whileHover={{ borderColor: "rgba(232,98,26,0.2)" }}
          className="rounded-2xl bg-[#141414] border border-white/5 p-6 transition-colors duration-300"
        >
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-base font-semibold text-neutral-100">{item.role}</h3>
                {item.current && (
                  <span className="px-2 py-0.5 text-[10px] font-mono rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {currentLabel}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <span className="text-[#e8621a] font-medium">{item.company}</span>
                <span className="text-neutral-600 flex items-center gap-1">
                  <MapPin size={11} />
                  {item.location}
                </span>
              </div>
            </div>
            <span className="text-xs text-neutral-600 font-mono bg-white/3 border border-white/5 px-3 py-1.5 rounded-full flex-shrink-0">
              {item.period}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-neutral-400 leading-relaxed mb-4">{item.description}</p>

          {/* Highlights */}
          <div className="space-y-1.5 mb-4">
            {item.highlights.map((h) => (
              <div key={h} className="flex items-start gap-2">
                <span className="mt-1.5 w-1 h-1 rounded-full bg-[#e8621a]/60 flex-shrink-0" />
                <span className="text-xs text-neutral-500">{h}</span>
              </div>
            ))}
          </div>

          {/* Tech chips */}
          <div className="flex flex-wrap gap-1.5">
            {item.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-white/3 text-neutral-600 border border-white/5"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });
  const items = EDUCATION_DATA[lang];

  return (
    <section id="experience" ref={sectionRef} className="py-24 md:py-32 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#e8621a] font-mono text-sm tracking-widest uppercase mb-3">
            {t.experience.sectionLabel}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t.experience.title}{" "}
            <span className="text-neutral-500">{t.experience.titleAccent}</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl">
          {items.map((item, i) => (
            <TimelineItem
              key={i}
              item={item}
              index={i}
              currentLabel={t.experience.current}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
