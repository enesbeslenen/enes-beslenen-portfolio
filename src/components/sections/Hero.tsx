"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, InstagramIcon } from "@/components/ui/SocialIcons";
import { useLang } from "@/contexts/LanguageContext";
import { useMotionProfile } from "@/hooks/useMotionProfile";

const EASE = [0.215, 0.61, 0.355, 1] as const;

/* ── Animated word-by-word headline ───────────────────── */
function AnimatedHeadline({ text, lite }: { text: string; lite: boolean }) {
  if (lite) {
    return <span>{text}</span>;
  }

  const words = text.split(" ");
  return (
    <span>
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-[0.25em]"
          initial={{ opacity: 0, y: 60, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            delay: 0.4 + i * 0.12,
            duration: 0.7,
            ease: EASE,
          }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

/* ── Cycling role typewriter ───────────────────────────── */
function RoleCycler({ lite }: { lite: boolean }) {
  const { t } = useLang();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [t]);

  useEffect(() => {
    if (lite) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % t.hero.roles.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [t, lite]);

  const role = t.hero.roles[index];

  if (lite) {
    return (
      <div className="h-8 flex items-center">
        <span className="text-[#e8621a] font-mono text-sm tracking-widest uppercase">
          {role}
        </span>
      </div>
    );
  }

  return (
    <div className="h-8 overflow-hidden relative">
      <motion.span
        key={`${role}-${index}`}
        initial={{ y: 32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: EASE }}
        className="absolute inset-0 flex items-center text-[#e8621a] font-mono text-sm tracking-widest uppercase"
      >
        {role}
      </motion.span>
    </div>
  );
}

/* ── Photo card with 3-D tilt (desktop only) ───────────── */
function PhotoCard() {
  const { t } = useLang();
  const { lite } = useMotionProfile();
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (lite) return;
    const rect = cardRef.current!.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    rotateY.set(((e.clientX - cx) / (rect.width / 2)) * 10);
    rotateX.set(-((e.clientY - cy) / (rect.height / 2)) * 10);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  const tiltStyle = lite
    ? undefined
    : { rotateX: springX, rotateY: springY, transformStyle: "preserve-3d" as const };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={lite ? undefined : handleMouseMove}
      onMouseLeave={lite ? undefined : handleMouseLeave}
      style={tiltStyle}
      initial={{ opacity: 0, scale: lite ? 1 : 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: lite ? 0 : 0.6, duration: lite ? 0.35 : 0.9, ease: EASE }}
      className="relative w-72 h-96 md:w-80 md:h-[26rem] lg:w-96 lg:h-[30rem] mb-6 lg:mb-0"
    >
      <div
        className={`absolute -inset-4 rounded-3xl bg-[#e8621a]/20 ${lite ? "opacity-60" : "blur-3xl"}`}
      />
      {!lite && (
        <div className="absolute -bottom-6 -right-6 w-48 h-48 rounded-full bg-[#e8621a]/15 blur-2xl" />
      )}

      <div className="relative w-full h-full rounded-2xl overflow-hidden border border-[#e8621a]/20 shadow-2xl shadow-[#e8621a]/10">
        <Image
          src="/portfolyo-fotograf.png"
          alt="Enes Beslenen"
          fill
          sizes="(max-width: 768px) 288px, (max-width: 1024px) 320px, 384px"
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-[#e8621a]/10 via-transparent to-transparent" />
      </div>

      <div className="absolute -bottom-5 -left-5 bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-xs text-neutral-500 font-mono">{t.hero.universityShort}</p>
        <p className="text-sm font-medium text-neutral-200 mt-0.5">{t.hero.universityDept}</p>
      </div>

      <div className="absolute -top-5 -right-5 bg-[#1c1c1c] border border-white/10 rounded-xl px-4 py-3 shadow-xl">
        <p className="text-xs text-neutral-500 font-mono">{t.hero.experienceLabel}</p>
        <p className="text-sm font-bold text-[#e8621a] mt-0.5">{t.hero.experienceValue}</p>
      </div>
    </motion.div>
  );
}

/* ── Main Hero ─────────────────────────────────────────── */
export default function Hero() {
  const { t } = useLang();
  const { lite } = useMotionProfile();

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  const fade = (delay: number) =>
    lite
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.25 } }
      : { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.6 } };

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#080808]">
      {!lite && (
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      )}

      <div
        className={`absolute top-1/4 right-1/3 w-[600px] h-[600px] rounded-full bg-[#e8621a]/5 pointer-events-none ${lite ? "opacity-40" : "blur-[120px]"}`}
      />
      {!lite && (
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#e8621a]/3 blur-[100px] pointer-events-none" />
      )}

      <div className="flex-1 flex items-center max-w-6xl mx-auto w-full px-6 pt-24 pb-10 lg:pb-16">
        <div className="w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-20">
          <div className="flex-1 flex flex-col gap-6 lg:max-w-xl">
            <motion.div {...fade(0.2)}>
              <RoleCycler lite={lite} />
            </motion.div>

            <h1
              className={`text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] ${lite ? "" : "perspective-[1000px]"}`}
              style={lite ? undefined : { perspective: "800px" }}
            >
              <AnimatedHeadline text={t.hero.line1} lite={lite} />
              <span className="block">
                <AnimatedHeadline text={t.hero.line2a} lite={lite} />{" "}
                {lite ? (
                  <span className="text-[#e8621a]">{t.hero.line2b}</span>
                ) : (
                  <motion.span
                    className="text-[#e8621a] relative inline-block"
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.7, ease: EASE }}
                  >
                    {t.hero.line2b}
                    <motion.span
                      className="absolute -bottom-1 left-0 h-px bg-[#e8621a]/50"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: 1.4, duration: 0.7, ease: "easeOut" }}
                      style={{ originX: 0, width: "100%" }}
                    />
                  </motion.span>
                )}
              </span>
              <span className="block">
                <AnimatedHeadline text={t.hero.line3} lite={lite} />
              </span>
            </h1>

            <motion.p className="text-neutral-400 text-lg leading-relaxed max-w-md" {...fade(0.4)}>
              {t.hero.bio}
            </motion.p>

            <motion.div className="flex flex-wrap gap-4" {...fade(0.5)}>
              <motion.button
                onClick={() =>
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-7 py-3.5 bg-[#e8621a] text-black font-semibold rounded-full text-sm hover:bg-[#ff7830] transition-colors duration-200 shadow-lg shadow-[#e8621a]/25"
                whileHover={lite ? undefined : { scale: 1.04, boxShadow: "0 0 30px rgba(232,98,26,0.4)" }}
                whileTap={lite ? undefined : { scale: 0.97 }}
              >
                {t.hero.viewWork}
              </motion.button>
            </motion.div>

            <motion.div className="flex items-center gap-5 pt-2" {...fade(0.6)}>
              {[
                { icon: GithubIcon, href: "https://github.com/enesbeslenen", label: "GitHub", isLucide: false },
                { icon: LinkedinIcon, href: "https://www.linkedin.com/in/enes-beslenen-b64866412/", label: "LinkedIn", isLucide: false },
                { icon: InstagramIcon, href: "https://www.instagram.com/enesbslnn_/", label: "Instagram", isLucide: false },
                { icon: Mail, href: "mailto:enesbeslenen.dev@gmail.com", label: "Email", isLucide: true },
              ].map(({ icon: Icon, href, label, isLucide }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-neutral-500 hover:text-[#e8621a] transition-colors duration-200"
                  whileHover={lite ? undefined : { y: -3 }}
                  whileTap={lite ? undefined : { scale: 0.9 }}
                >
                  {isLucide ? <Icon size={20} /> : <Icon style={{ width: 20, height: 20 }} />}
                </motion.a>
              ))}
              <span className="w-16 h-px bg-white/10" />
              <span className="text-xs text-neutral-600 font-mono">{t.hero.handle}</span>
            </motion.div>
          </div>

          <div className="flex-shrink-0 w-full flex flex-col items-center lg:w-auto">
            <PhotoCard />
            <motion.button
              onClick={scrollToAbout}
              className="lg:hidden mt-12 flex flex-col items-center gap-2 text-neutral-600 hover:text-neutral-400 transition-colors"
              {...fade(0.7)}
            >
              <span className="text-xs font-mono tracking-widest uppercase">{t.hero.scroll}</span>
              {lite ? (
                <ArrowDown size={16} />
              ) : (
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                >
                  <ArrowDown size={16} />
                </motion.div>
              )}
            </motion.button>
          </div>
        </div>
      </div>

      <motion.button
        onClick={scrollToAbout}
        className="hidden lg:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-neutral-600 hover:text-neutral-400 transition-colors"
        {...fade(0.7)}
      >
        <span className="text-xs font-mono tracking-widest uppercase">{t.hero.scroll}</span>
        {lite ? (
          <ArrowDown size={16} />
        ) : (
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <ArrowDown size={16} />
          </motion.div>
        )}
      </motion.button>
    </section>
  );
}
