"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";import { useLang } from "@/contexts/LanguageContext";

const SKILLS = [
  { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"] },
  { category: "Design & Tools", items: ["Figma", "VS Code", "Git", "Responsive Design"] },
  { category: "Learning", items: ["Next.js", "TypeScript"] },
];

/* ── Animated counter ─────────────────────────────────── */
function Stat({
  value,
  label,
  delay,
}: {
  value: string;
  label: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.5, ease: [0.215, 0.61, 0.355, 1] }}
      className="flex flex-col items-center text-center p-6 rounded-2xl bg-[#141414] border border-white/5 hover:border-[#e8621a]/20 transition-colors duration-300"
    >
      <span className="text-4xl font-bold text-[#e8621a] tabular-nums">{value}</span>
      <span className="mt-2 text-xs text-neutral-500 leading-snug whitespace-pre-line font-mono uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );
}

/* ── Skill chip ──────────────────────────────────────────*/
function SkillChip({ name, delay, inView }: { name: string; delay: number; inView: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay, duration: 0.25 }}
      whileHover={{ scale: 1.06, borderColor: "rgba(232,98,26,0.5)", color: "#e8621a" }}
      className="px-3 py-1.5 rounded-full text-xs font-mono text-neutral-400 border border-white/8 bg-white/3 cursor-default transition-colors duration-200"
    >
      {name}
    </motion.span>
  );
}

export default function About() {
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 bg-[#0d0d0d]">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-[#e8621a] font-mono text-sm tracking-widest uppercase mb-3">
            {t.about.sectionLabel}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            {t.about.title}{" "}
            <span className="text-neutral-500">{t.about.titleAccent}</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-16">
          {/* Left: Bio + skills */}
          <div className="flex flex-col gap-10">
            {/* Bio paragraphs */}
            <div className="space-y-5">
              {t.about.bio.map((para, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.15 + i * 0.12, duration: 0.6 }}
                  className="text-neutral-400 leading-relaxed text-[15px]"
                >
                  {para}
                </motion.p>
              ))}
            </div>

            {/* Skills grouped */}
            <div className="space-y-6">
              {SKILLS.map((group, gi) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.5 + gi * 0.1 }}
                >
                  <p className="text-xs text-neutral-600 font-mono uppercase tracking-wider mb-3">
                    {group.category}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill, si) => (
                      <SkillChip
                        key={skill}
                        name={skill}
                        delay={0.1 + gi * 0.05 + si * 0.03}
                        inView={inView}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right: Stats grid */}
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              {t.about.stats.map((stat, i) => (
                <Stat key={stat.label} {...stat} delay={0.2 + i * 0.1} />
              ))}
            </div>

            {/* Currently exploring card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7 }}
              className="rounded-2xl bg-[#141414] border border-[#e8621a]/15 p-6"
            >
              <p className="text-xs text-[#e8621a] font-mono uppercase tracking-wider mb-3">
                {t.about.currentlyExploring}
              </p>
              <div className="space-y-2.5">
                {t.about.exploring.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#e8621a] flex-shrink-0" />
                    <span className="text-sm text-neutral-400">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Location card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="rounded-2xl bg-[#141414] border border-white/5 p-6 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-[#e8621a]/10 flex items-center justify-center text-lg">
                📍
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-200">{t.about.location}</p>
                <p className="text-xs text-neutral-500 mt-0.5">{t.about.timezone}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
