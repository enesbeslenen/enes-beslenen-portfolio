import type { Lang } from "@/lib/i18n";

export type Project = {
  id: number;
  title: string;
  description: string;
  longDesc?: string;
  category: string;
  tags: string[];
  href: string | null;
  live: string | null;
  image?: string;
  featured: boolean;
  gradient: string;
  year: string;
};

export const projectsData: Record<Lang, Project[]> = {
  tr: [
    {
      id: 1,
      title: "Nansan Sulama Sistemleri",
      description:
        "Tarımsal sulama üreticisi Nansan için Next.js 16 ve React 19 ile geliştirilmiş, 25 sayfalık responsive kurumsal web sitesi.",
      longDesc:
        "Çok seviyeli ürün kataloğu, görselli mega-menü, fotoğraf galerisi ve tamamen statik (SSG) optimize yapı içeren kurumsal web sitesi. Gerçek bir müşteri projesi.",
      category: "Kurumsal Web Sitesi",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
      href: null,
      live: "https://nansan-plastik.vercel.app",
      image: "/projects/nansan-plastik.png",
      featured: true,
      gradient: "from-orange-500/20 via-transparent to-transparent",
      year: "2025",
    },
    {
      id: 2,
      title: "Joya Women — Üye Yönetim Paneli",
      description:
        "Kadın spor salonları için üye takibi, üyelik planları ve otomatik iletişim yönetimini tek ekranda birleştiren modern yönetim paneli.",
      longDesc:
        "Canlı gösterge paneli istatistikleri, gelişmiş filtreleme ve Excel dışa aktarma özellikleriyle salon operasyonlarını kolaylaştıran admin paneli. Demo versiyonu.",
      category: "Admin Panel",
      tags: ["HTML", "CSS", "JavaScript", "Supabase", "Flatpickr", "ExcelJS"],
      href: "https://github.com/enesbeslenen/Joya_Women_Admin_Panel_demo",
      live: "https://enesbeslenen.github.io/Joya_Women_Admin_Panel_demo/login.html",
      image: "/projects/joya-women-admin-panel.png",
      featured: true,
      gradient: "from-pink-500/15 via-transparent to-transparent",
      year: "2025",
    },
    {
      id: 3,
      title: "Deniz Balık",
      description:
        "Bir balık restoranı için sıfırdan tasarlanmış, tamamen responsive ve SEO uyumlu modern tanıtım sitesi. Konsept tasarım.",
      category: "Landing Page",
      tags: ["HTML", "CSS", "JavaScript", "SEO"],
      href: "https://github.com/enesbeslenen/ugur-balikcilik",
      live: "https://balikci-restoran-sablonu.vercel.app",
      image: "/projects/ugur-balikcilik.png",
      featured: false,
      gradient: "from-blue-500/15 via-transparent to-transparent",
      year: "2025",
    },
    {
      id: 4,
      title: "MarketPOS",
      description:
        "Bakkal ve küçük marketler için sunucusuz, localStorage tabanlı hafif POS uygulaması. Fiyat sözlüğü, hızlı kasa ve günlük ciro özeti.",
      category: "Web App",
      tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
      href: "https://github.com/enesbeslenen/Market-pos",
      live: "https://enesbeslenen.github.io/Market-pos/",
      image: "/projects/marketpos.png",
      featured: false,
      gradient: "from-emerald-500/15 via-transparent to-transparent",
      year: "2025",
    },
    {
      id: 5,
      title: "Sofra Lokantası",
      description:
        "Konsept bir lokanta için sıfırdan tasarlanmış, tek sayfalık modern ve animasyonlu tanıtım web sitesi.",
      category: "Landing Page",
      tags: ["HTML", "CSS", "JavaScript", "Font Awesome"],
      href: "https://github.com/enesbeslenen/cigerci-yusuf",
      live: "https://enesbeslenen.github.io/cigerci-yusuf/",
      image: "/projects/cigerci-yusuf.png",
      featured: false,
      gradient: "from-red-500/15 via-transparent to-transparent",
      year: "2025",
    },
    {
      id: 6,
      title: "Öğrenci Ödev & Not Takip",
      description:
        "Öğrencilerin derslerini, ödevlerini ve vize/final notlarını tek ekrandan yönetebildiği, tarayıcıda çalışan web uygulaması.",
      category: "Web App",
      tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
      href: "https://github.com/enesbeslenen/ogrenci-dashboard",
      live: "https://enesbeslenen.github.io/ogrenci-dashboard/",
      image: "/projects/ogrenci-bilgi-sistemi.png",
      featured: false,
      gradient: "from-purple-500/15 via-transparent to-transparent",
      year: "2025",
    },
    {
      id: 7,
      title: "Araç Durum Takip Sistemi",
      description:
        "Filodaki araçların sigorta, muayene ve kasko tarihlerini tek panelden takip eden dahili yönetim uygulaması.",
      category: "Admin Panel",
      tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
      href: "https://github.com/enesbeslenen/nansan-arac-takip",
      live: "https://enesbeslenen.github.io/nansan-arac-takip/",
      image: "/projects/arac-takip-sistemi.png",
      featured: false,
      gradient: "from-cyan-500/10 via-transparent to-transparent",
      year: "2025",
    },
  ],
  en: [
    {
      id: 1,
      title: "Nansan Irrigation Systems",
      description:
        "A 25-page responsive corporate website built with Next.js 16 and React 19 for Nansan, an agricultural irrigation manufacturer.",
      longDesc:
        "Features a multi-level product catalog, visual mega-menu, photo gallery, and fully static (SSG) optimized architecture. A real client project.",
      category: "Corporate Website",
      tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
      href: null,
      live: "https://nansan-plastik.vercel.app",
      image: "/projects/nansan-plastik.png",
      featured: true,
      gradient: "from-orange-500/20 via-transparent to-transparent",
      year: "2025",
    },
    {
      id: 2,
      title: "Joya Women — Member Admin Panel",
      description:
        "A modern admin panel for women's gyms combining member tracking, membership plans, and automated communication management.",
      longDesc:
        "Live dashboard statistics, advanced filtering, and Excel export features to simplify gym operations. Demo version.",
      category: "Admin Panel",
      tags: ["HTML", "CSS", "JavaScript", "Supabase", "Flatpickr", "ExcelJS"],
      href: "https://github.com/enesbeslenen/Joya_Women_Admin_Panel_demo",
      live: "https://enesbeslenen.github.io/Joya_Women_Admin_Panel_demo/login.html",
      image: "/projects/joya-women-admin-panel.png",
      featured: true,
      gradient: "from-pink-500/15 via-transparent to-transparent",
      year: "2025",
    },
    {
      id: 3,
      title: "Deniz Balık",
      description:
        "A fully responsive, SEO-friendly modern showcase website designed from scratch for a fish restaurant. Concept design.",
      category: "Landing Page",
      tags: ["HTML", "CSS", "JavaScript", "SEO"],
      href: "https://github.com/enesbeslenen/ugur-balikcilik",
      live: "https://balikci-restoran-sablonu.vercel.app",
      image: "/projects/ugur-balikcilik.png",
      featured: false,
      gradient: "from-blue-500/15 via-transparent to-transparent",
      year: "2025",
    },
    {
      id: 4,
      title: "MarketPOS",
      description:
        "A lightweight, serverless POS app for small grocery stores using localStorage. Price dictionary, quick checkout, and daily revenue summary.",
      category: "Web App",
      tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
      href: "https://github.com/enesbeslenen/Market-pos",
      live: "https://enesbeslenen.github.io/Market-pos/",
      image: "/projects/marketpos.png",
      featured: false,
      gradient: "from-emerald-500/15 via-transparent to-transparent",
      year: "2025",
    },
    {
      id: 5,
      title: "Sofra Lokantası",
      description:
        "A single-page modern animated showcase website designed from scratch for a concept restaurant.",
      category: "Landing Page",
      tags: ["HTML", "CSS", "JavaScript", "Font Awesome"],
      href: "https://github.com/enesbeslenen/cigerci-yusuf",
      live: "https://enesbeslenen.github.io/cigerci-yusuf/",
      image: "/projects/cigerci-yusuf.png",
      featured: false,
      gradient: "from-red-500/15 via-transparent to-transparent",
      year: "2025",
    },
    {
      id: 6,
      title: "Student Assignment & Grade Tracker",
      description:
        "A browser-based app where students manage courses, assignments, and midterm/final grades with LocalStorage persistence.",
      category: "Web App",
      tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
      href: "https://github.com/enesbeslenen/ogrenci-dashboard",
      live: "https://enesbeslenen.github.io/ogrenci-dashboard/",
      image: "/projects/ogrenci-bilgi-sistemi.png",
      featured: false,
      gradient: "from-purple-500/15 via-transparent to-transparent",
      year: "2025",
    },
    {
      id: 7,
      title: "Vehicle Status Tracking System",
      description:
        "An internal management app to track insurance, inspection, and comprehensive insurance dates for fleet vehicles from a single panel.",
      category: "Admin Panel",
      tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
      href: "https://github.com/enesbeslenen/nansan-arac-takip",
      live: "https://enesbeslenen.github.io/nansan-arac-takip/",
      image: "/projects/arac-takip-sistemi.png",
      featured: false,
      gradient: "from-cyan-500/10 via-transparent to-transparent",
      year: "2025",
    },
  ],
};
