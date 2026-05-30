"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import { GithubIcon } from "@/components/ui/SocialIcons";
import { useLang } from "@/contexts/LanguageContext";
import { projectsData, type Project } from "@/data/projects";

/* ── Animated live link visual (featured, no screenshot) ─ */
function LiveLinkVisual({ href, className = "" }: { href: string; className?: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Live demo"
      className={`group/live flex items-center justify-center flex-shrink-0 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="relative w-36 h-36">
        <motion.div
          className="absolute inset-0 rounded-2xl bg-[#e8621a]/10 border border-[#e8621a]/20 group-hover/live:bg-[#e8621a]/15 transition-colors"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        />
        <motion.div
          className="absolute inset-4 rounded-xl bg-[#e8621a]/15 border border-[#e8621a]/25 group-hover/live:bg-[#e8621a]/20 transition-colors"
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
        />
        <div className="absolute inset-8 rounded-lg bg-[#e8621a]/20 group-hover/live:bg-[#e8621a]/30 flex items-center justify-center transition-colors">
          <ExternalLink className="text-[#e8621a]" size={20} />
        </div>
      </div>
    </motion.a>
  );
}

/* ── Project preview image ───────────────────────────── */
function ProjectPreview({
  project,
  className = "",
  sizes,
}: {
  project: Project;
  className?: string;
  sizes: string;
}) {
  if (!project.image) return null;

  const image = (
    <div className={`relative overflow-hidden bg-[#1c1c1c] ${className}`}>
      <Image
        src={project.image}
        alt={project.title}
        fill
        sizes={sizes}
        className="object-cover object-top transition-transform duration-500 group-hover/preview:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414]/80 via-transparent to-transparent pointer-events-none" />
      {project.live && (
        <div className="absolute bottom-3 right-3 p-2 rounded-lg bg-black/50 border border-white/10 opacity-0 group-hover/preview:opacity-100 transition-opacity">
          <ExternalLink size={16} className="text-[#e8621a]" />
        </div>
      )}
    </div>
  );

  if (project.live) {
    return (
      <motion.a
        href={project.live}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${project.title} — live demo`}
        className="group/preview block flex-shrink-0"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {image}
      </motion.a>
    );
  }

  return <div className="flex-shrink-0">{image}</div>;
}

/* ── Project action buttons ──────────────────────────── */
function ProjectActions({
  project,
  iconSize = 15,
}: {
  project: Project;
  iconSize?: number;
}) {
  return (
    <div className="flex gap-2 flex-shrink-0">
      {project.href && (
        <motion.a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="p-2 rounded-lg bg-white/5 text-neutral-500 hover:text-white hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <GithubIcon style={{ width: iconSize, height: iconSize }} />
        </motion.a>
      )}
      {project.live && (
        <motion.a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Live demo"
          className="p-2 rounded-lg bg-white/5 text-neutral-500 hover:text-[#e8621a] hover:bg-[#e8621a]/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ExternalLink size={iconSize} />
        </motion.a>
      )}
    </div>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 200, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 200, damping: 25 });

  const glowOpacity = useMotionValue(0);
  const springGlow = useSpring(glowOpacity, { stiffness: 200, damping: 25 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 8);
    rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 8);
    glowOpacity.set(1);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    glowOpacity.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        delay: index * 0.08,
        duration: 0.6,
        ease: [0.215, 0.61, 0.355, 1],
      }}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative rounded-2xl bg-[#141414] border border-white/5 p-6 overflow-hidden hover:border-[#e8621a]/20 transition-colors duration-300"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} pointer-events-none`} />

      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(232,98,26,0.06), transparent)",
          opacity: springGlow,
        }}
      />

      <div className="relative flex flex-col h-full gap-4">
        <ProjectPreview
          project={project}
          className="aspect-video rounded-xl border border-white/5"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs text-neutral-600 font-mono">{project.year}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-neutral-500 border border-white/5">
                {project.category}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-100 group-hover:text-white transition-colors">
              {project.title}
            </h3>
          </div>
          <ProjectActions project={project} />
        </div>

        <p className="text-sm text-neutral-400 leading-relaxed flex-1">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-[11px] font-mono rounded-full bg-white/5 text-neutral-500 border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Featured project ────────────────────────────────── */
function FeaturedProject({ project }: { project: Project }) {
  const { t } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1] }}
      className="relative rounded-3xl bg-[#141414] border border-white/5 overflow-hidden group hover:border-[#e8621a]/20 transition-colors duration-500"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`} />

      <div className="relative p-8 md:p-10 flex flex-col md:flex-row gap-8 items-start">
        <div className="flex-1 space-y-5 w-full">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span className="px-2.5 py-1 text-[10px] font-mono rounded-full bg-[#e8621a]/15 text-[#e8621a] border border-[#e8621a]/20 uppercase tracking-wider">
                  {t.projects.featuredLabel}
                </span>
                <span className="text-xs text-neutral-600 font-mono">{project.year}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-neutral-500 border border-white/5">
                  {project.category}
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white">{project.title}</h3>
            </div>
            {/* Mobile: corner action buttons */}
            <div className="md:hidden">
              <ProjectActions project={project} iconSize={16} />
            </div>
          </div>
          <p className="text-neutral-400 leading-relaxed">{project.longDesc ?? project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-mono rounded-full bg-white/5 text-neutral-400 border border-white/8"
              >
                {tag}
              </span>
            ))}
          </div>
          {project.href && (
            <div className="flex flex-wrap gap-4 pt-2">
              <motion.a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors"
                whileHover={{ x: 4 }}
              >
                <GithubIcon style={{ width: 16, height: 16 }} /> {t.projects.sourceCode}
              </motion.a>
            </div>
          )}
        </div>

        {/* Desktop: screenshot or animated live link */}
        {project.image ? (
          <ProjectPreview
            project={project}
            className="hidden md:block w-52 h-52 rounded-2xl border border-white/10"
            sizes="208px"
          />
        ) : (
          project.live && (
            <LiveLinkVisual href={project.live} className="hidden md:flex w-52 h-52" />
          )
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const { t, lang } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const projects = projectsData[lang];
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" ref={sectionRef} className="py-24 md:py-32 bg-[#080808]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4"
        >
          <div>
            <p className="text-[#e8621a] font-mono text-sm tracking-widest uppercase mb-3">
              {t.projects.sectionLabel}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              {t.projects.title} <span className="text-neutral-500">{t.projects.titleAccent}</span>
            </h2>
          </div>
          <motion.a
            href="https://github.com/enesbeslenen"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-neutral-500 hover:text-[#e8621a] transition-colors duration-200 group"
            whileHover={{ x: 4 }}
          >
            {t.projects.viewAll}
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        <div className="space-y-6 mb-8">
          {featured.map((project) => (
            <FeaturedProject key={project.id} project={project} />
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {rest.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
