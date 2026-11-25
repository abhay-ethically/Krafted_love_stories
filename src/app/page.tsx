'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

/* ─── Client Details ─── */
const PHONE_NUMBER = '+919822321660';
const WHATSAPP_URL = 'https://wa.me/919822321660?text=Hi%20Akshay,%20I%20came%20across%20Krafted_Love%20Stories%20and%20would%20love%20to%20discuss%20a%20shoot!';
const INSTAGRAM_URL = 'https://www.instagram.com/krafted_love_stories';

/* ─── Curated High-Res Media ─── */
const HERO = [
  { src: '/images/sections/hero_1.jpg', label: 'Whispers of Forever' },
  { src: '/images/sections/hero_2.jpg', label: 'Golden Hour Romance' },
  { src: '/images/sections/hero_3.jpg', label: 'Unscripted Moments' },
  { src: '/images/sections/hero_4.jpg', label: 'Timeless Celebrations' },
  { src: '/images/sections/hero_5.jpg', label: 'Documentary Artistry' },
  { src: '/images/sections/hero_6.jpg', label: 'Your Story, Krafted' },
  { src: '/images/sections/hero_7.jpg', label: 'Memories Across India' },
  { src: '/images/sections/hero_8.jpg', label: 'Pure Emotion' },
];

const STATS = [
  { num: 10, suffix: '+', label: 'Years Experience' },
  { num: 350, suffix: '+', label: 'Weddings Captured' },
  { num: 40, suffix: '+', label: 'Cities Across India' },
  { num: 100, suffix: '%', label: 'Heart & Artistry' },
];

const SERVICES = [
  {
    num: '01',
    title: 'Wedding Photography',
    desc: 'Complete wedding coverage from sacred rituals to joyful celebrations, documented with unobtrusive editorial precision.',
  },
  {
    num: '02',
    title: 'Pre-Wedding & Engagement',
    desc: 'Cinematic destination sessions crafted around your personal connection, favorite vistas, and golden-hour light.',
  },
  {
    num: '03',
    title: 'Bridal & Couple Portraits',
    desc: 'Timeless portraiture focusing on authentic chemistry, delicate details, and intimate expressions.',
  },
  {
    num: '04',
    title: 'Cinematic Wedding Films',
    desc: 'Artisan short films that capture the voices, laughter, and heartbeat of your milestone day.',
  },
];

const PROCESS = [
  { step: '01', title: 'WhatsApp Connect', desc: 'Message or call Akshay directly with your dates, venue, and vision.' },
  { step: '02', title: 'Creative Alignment', desc: 'We curate a tailored coverage plan, shot-list, and timeline matching your event.' },
  { step: '03', title: 'The Wedding Day', desc: 'Discreet documentary storytelling preserving real emotion without forced posing.' },
  { step: '04', title: 'Curated Delivery', desc: 'Masterfully color-graded high-resolution photos in your private digital gallery.' },
];

/* ─── Animated Counter ─── */
function Counter({ num, suffix }: { num: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      let n = 0;
      const inc = Math.max(1, num / 50);
      const id = setInterval(() => {
        n += inc;
        if (n >= num) { setCount(num); clearInterval(id); return; }
        setCount(Math.floor(n));
      }, 25);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [num]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [navSolid, setNavSolid] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const heroParallax = useTransform(scrollY, [0, 700], [0, 100]);
  const quoteParallax = useTransform(scrollY, [900, 2800], [-30, 30]);
  const ctaParallax = useTransform(scrollY, [2500, 4500], [-25, 25]);

  const advance = useCallback(() => setSlide(s => (s + 1) % HERO.length), []);

  useEffect(() => {
    const t = setInterval(advance, 5000);
    return () => clearInterval(t);
  }, [advance]);

  useEffect(() => {
    return scrollY.on('change', y => setNavSolid(y > 30));
  }, [scrollY]);

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

  return (
    <main className="bg-[#0a0a0a] text-white overflow-x-hidden pb-20 sm:pb-0">

      {/* ══════ MOBILE STICKY BOTTOM ACTION BAR (PHONE-ONLY) ══════ */}
      <div className="sm:hidden fixed bottom-0 inset-x-0 z-50 bg-black/90 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex items-center gap-3">
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-[#25D366] text-black font-semibold text-[0.72rem] uppercase tracking-[0.16em] rounded-full active:scale-95 transition-transform"
        >
          <span className="w-2 h-2 rounded-full bg-black animate-pulse" />
          WhatsApp Akshay
        </a>
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex items-center justify-center px-4 py-3 border border-white/30 text-white font-medium text-[0.72rem] uppercase tracking-[0.16em] rounded-full active:scale-95 transition-transform"
        >
          Call
        </a>
      </div>

      {/* ══════ DESKTOP FLOATING WHATSAPP BUTTON ══════ */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp message to Akshay Takawane"
        className="hidden sm:flex fixed bottom-7 right-7 z-50 items-center gap-3 px-5 py-3.5 bg-[#25D366] text-black font-semibold text-xs uppercase tracking-[0.18em] rounded-full shadow-2xl hover:bg-white hover:scale-105 transition-all duration-300"
      >
        <span className="w-2.5 h-2.5 rounded-full bg-black animate-pulse" />
        WhatsApp Akshay
      </a>

      {/* ══════ NAV ══════ */}
      <nav className={`fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 sm:px-8 md:px-16 transition-all duration-500 ${
        navSolid
          ? 'py-3.5 bg-black/90 backdrop-blur-xl border-b border-white/[0.08]'
          : 'py-5 bg-gradient-to-b from-black/70 via-black/30 to-transparent'
      }`}>
        <Link href="/" className="font-serif text-[1.1rem] sm:text-[1.2rem] tracking-[0.14em] text-white hover:text-[#c8a97e] transition-colors duration-300">
          Krafted_<em className="not-italic text-[#c8a97e]">Love Stories</em>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-10">
          <Link href="/" className="text-[0.78rem] uppercase tracking-[0.18em] text-[#c8a97e]">
            Home
          </Link>
          <Link href="/gallery" className="text-[0.78rem] uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors duration-300">
            Portfolio
          </Link>
          <Link href="/contact" className="text-[0.78rem] uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors duration-300">
            Bookings
          </Link>
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.78rem] uppercase tracking-[0.18em] text-white/60 hover:text-[#c8a97e] transition-colors duration-300"
          >
            Instagram
          </a>
        </div>

        <div className="hidden md:block">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-[#c8a97e] text-[#c8a97e] hover:bg-[#c8a97e] hover:text-black text-[0.72rem] uppercase tracking-[0.2em] px-6 py-2.5 transition-all duration-300"
          >
            Book on WhatsApp
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-white/80 hover:text-white focus:outline-none"
          aria-label="Toggle navigation menu"
        >
          <div className="w-6 h-4 flex flex-col justify-between">
            <span className={`block h-[2px] bg-white transition-transform duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block h-[2px] bg-white transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-[2px] bg-white transition-transform duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </div>
        </button>
      </nav>

      {/* ══════ FULLSCREEN MOBILE DRAWER ══════ */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-8 pt-28 md:hidden"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-6">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-[#c8a97e]"
              >
                Home
              </Link>
              <Link
                href="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-white/80 hover:text-white"
              >
                Portfolio Archive (300+)
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-white/80 hover:text-white"
              >
                Bookings & Contact
              </Link>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-3xl text-white/50 hover:text-[#c8a97e]"
              >
                Instagram &rarr;
              </a>
            </div>

            <div className="pt-8 border-t border-white/10 space-y-4">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#c8a97e]">Lead Photographer</p>
              <p className="font-serif text-xl">Akshay Takawane</p>
              <p className="text-white/50 text-sm">Pune, Maharashtra &middot; All Over India</p>
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="block text-[#c8a97e] text-base font-mono"
              >
                📞 +91 9822321660
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ══════ HERO ══════ */}
      <section className="relative min-h-[92vh] sm:min-h-screen overflow-hidden flex flex-col justify-end">
        <motion.div className="absolute inset-0 scale-105" style={{ y: heroParallax }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={slide}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: 'easeInOut' }}
            >
              <Image
                src={HERO[slide].src}
                alt={HERO[slide].label}
                fill
                unoptimized
                priority
                className="object-cover object-center"
              />
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-transparent z-10" />

        {/* Hero Content */}
        <div className="relative z-20 px-5 sm:px-8 md:px-20 pb-20 sm:pb-28 md:pb-32 max-w-5xl">
          <AnimatePresence mode="wait">
            <motion.p
              key={`lbl-${slide}`}
              className="text-[#c8a97e] text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.35em] sm:tracking-[0.45em] mb-3 sm:mb-4 font-mono"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              Akshay Takawane &middot; Pune &middot; Pan-India
            </motion.p>
          </AnimatePresence>

          <motion.h1
            className="font-serif text-[2.6rem] sm:text-[4.2rem] md:text-[5.5rem] lg:text-[6.8rem] leading-[1.05] sm:leading-[1.0] tracking-[-0.01em] sm:tracking-[-0.02em] mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Every Love Story
            <br />
            <span className="italic text-[#c8a97e]">Deserves to be</span>
            <br />
            Krafted Perfectly
          </motion.h1>

          <motion.p
            className="text-white/70 text-sm sm:text-base md:text-lg max-w-lg mb-8 sm:mb-10 leading-relaxed font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            Led by Akshay Takawane with 10+ years of documentary wedding artistry.
            Based in Pune, preserving celebrations across India.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md sm:max-w-none"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 px-7 sm:px-10 py-4 bg-[#c8a97e] text-black text-[0.72rem] sm:text-[0.75rem] uppercase tracking-[0.2em] font-semibold hover:bg-white active:scale-98 transition-all duration-300"
            >
              Book via WhatsApp
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">&#8594;</span>
            </a>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="flex items-center justify-center gap-3 px-7 sm:px-10 py-4 border border-white/30 text-white text-[0.72rem] sm:text-[0.75rem] uppercase tracking-[0.2em] hover:border-[#c8a97e] hover:text-[#c8a97e] active:scale-98 transition-all duration-300"
            >
              Call 9822321660
            </a>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-6 sm:bottom-10 right-5 sm:right-8 md:right-20 z-20 flex gap-1.5 sm:gap-2 items-center">
          {HERO.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className={`transition-all duration-400 h-[2px] ${
                i === slide ? 'w-8 sm:w-10 bg-[#c8a97e]' : 'w-2.5 sm:w-3 bg-white/30 hover:bg-white/60'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ══════ ARTIST & PHILOSOPHY ══════ */}
      <section className="border-y border-white/[0.07] py-16 sm:py-20 px-5 sm:px-8 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
          <motion.div
            className="md:col-span-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#c8a97e] text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.4em] mb-3 sm:mb-4">The Photographer</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight mb-5">
              Akshay Takawane
            </h2>
            <p className="text-white/65 text-sm sm:text-base leading-loose font-light mb-5">
              Founder & Lead Visionary behind <strong className="text-white font-medium">Krafted_Love Stories</strong>. 
              With over 10+ years behind the lens, Akshay transforms fragile, once-in-a-lifetime feelings into heirloom portraits.
            </p>
            <p className="text-white/45 text-sm leading-relaxed font-light mb-7">
              Based in Pune with frequent commissions across Rajasthan, Goa, Mumbai, Delhi, and destinations throughout India.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-white/[0.05] border border-white/15 text-[#c8a97e] text-[0.68rem] uppercase tracking-[0.2em] hover:bg-[#c8a97e] hover:text-black transition-all duration-300"
              >
                Direct WhatsApp Message
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[0.68rem] uppercase tracking-[0.2em] text-white/50 hover:text-white transition-colors"
              >
                @krafted_love_stories &rarr;
              </a>
            </div>
          </motion.div>

          {/* Stats: 2x2 grid on mobile & desktop */}
          <div className="md:col-span-6 grid grid-cols-2 gap-6 sm:gap-8 pt-4 md:pt-0">
            {STATS.map(({ num, suffix, label }, i) => (
              <motion.div
                key={label}
                className="border-l border-white/15 pl-4 sm:pl-6"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <p className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#c8a97e] leading-none mb-2">
                  <Counter num={num} suffix={suffix} />
                </p>
                <p className="text-white/45 text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.2em] leading-snug">{label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ CURATED PORTFOLIO HIGHLIGHTS (RESPONSIVE GRID) ══════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 md:px-16 max-w-7xl mx-auto">
        <motion.div
          className="mb-10 sm:mb-14 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div>
            <p className="text-[#c8a97e] text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.4em] mb-2 sm:mb-3">Curated Portfolio</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight">Moments Frozen<br />in Time</h2>
          </div>
          <Link
            href="/gallery"
            className="group flex items-center gap-2 text-white/50 hover:text-[#c8a97e] text-[0.72rem] sm:text-[0.75rem] uppercase tracking-[0.2em] transition-colors duration-300"
          >
            Explore 300+ Archive Works
            <span className="group-hover:translate-x-1.5 transition-transform duration-200">&#8594;</span>
          </Link>
        </motion.div>

        {/* Responsive Bento Layout: Stacked on phone, Bento on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-3.5 md:h-[640px]">
          {/* Main Large Hero Image */}
          <motion.div
            className="sm:col-span-2 md:col-span-5 md:row-span-2 relative min-h-[380px] md:min-h-0 overflow-hidden group border border-white/[0.05]"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/images/sections/bento_1.jpg"
              alt="Krafted_Love Stories Wedding Frame"
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent flex items-end p-5">
              <span className="text-white font-serif text-base sm:text-lg italic">Intimate Vows &middot; Pune</span>
            </div>
          </motion.div>

          {/* Top Wide */}
          <motion.div
            className="sm:col-span-2 md:col-span-7 relative min-h-[240px] md:min-h-0 overflow-hidden group border border-white/[0.05]"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Image
              src="/images/sections/bento_2.jpg"
              alt="Celebration Panorama"
              fill
              unoptimized
              className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </motion.div>

          {/* 3 Secondary Frames */}
          <motion.div
            className="sm:col-span-1 md:col-span-3 relative min-h-[220px] md:min-h-0 overflow-hidden group border border-white/[0.05]"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/images/sections/bento_3.jpg"
              alt="Bridal Detail"
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </motion.div>

          <motion.div
            className="sm:col-span-1 md:col-span-2 relative min-h-[220px] md:min-h-0 overflow-hidden group border border-white/[0.05]"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Image
              src="/images/sections/bento_4.jpg"
              alt="Ceremonial Emotion"
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </motion.div>

          <motion.div
            className="sm:col-span-2 md:col-span-2 relative min-h-[220px] md:min-h-0 overflow-hidden group border border-white/[0.05]"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image
              src="/images/sections/bento_5.jpg"
              alt="Golden Moment"
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
          </motion.div>
        </div>
      </section>

      {/* ══════ SERVICES ══════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 md:px-16 border-t border-white/[0.07]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-12 sm:mb-16 md:flex justify-between items-end"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <p className="text-[#c8a97e] text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.4em] mb-2 sm:mb-3">Our Offerings</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl">Bespoke Coverage</h2>
            </div>
            <p className="text-white/45 text-sm max-w-sm mt-3 md:mt-0 leading-relaxed font-light">
              Tailored for traditional, contemporary, and destination celebrations across India.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.07]">
            {SERVICES.map(({ num, title, desc }, i) => (
              <motion.div
                key={num}
                className="group bg-[#0a0a0a] p-6 sm:p-8 hover:bg-[#111] transition-colors duration-500"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.7 }}
              >
                <p className="text-[#c8a97e]/50 text-[0.65rem] uppercase tracking-[0.3em] mb-4 sm:mb-6 font-mono group-hover:text-[#c8a97e] transition-colors duration-400">
                  {num}
                </p>
                <h3 className="font-serif text-lg sm:text-xl mb-3 leading-snug">{title}</h3>
                <p className="text-white/45 text-xs sm:text-sm leading-relaxed font-light mb-6">{desc}</p>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.68rem] uppercase tracking-[0.2em] text-[#c8a97e] transition-opacity duration-300 inline-block"
                >
                  Inquire on WhatsApp &rarr;
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PHOTO STRIP ROW 1 (PHONE-SCROLLABLE & TOUCH-FRIENDLY) ══════ */}
      <section className="py-12 sm:py-16 px-5 sm:px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex md:grid md:grid-cols-4 gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-3">
          {[1, 2, 3, 4].map((n, i) => (
            <motion.div
              key={n}
              className="relative min-w-[260px] sm:min-w-[320px] md:min-w-0 aspect-[3/4] flex-shrink-0 md:flex-shrink overflow-hidden group border border-white/[0.04] snap-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
            >
              <Image
                src={`/images/sections/strip1_${n}.jpg`}
                alt="Celebration Frame"
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════ PARALLAX QUOTE ══════ */}
      <section className="relative h-[360px] sm:h-[430px] overflow-hidden flex items-center justify-center my-4">
        <motion.div className="absolute inset-0" style={{ y: quoteParallax }}>
          <Image
            src="/images/sections/quote_1.jpg"
            alt="Atmospheric wedding background"
            fill
            unoptimized
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/70" />
        <motion.blockquote
          className="relative z-10 text-center px-6 sm:px-8 max-w-3xl"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <p className="text-[#c8a97e] text-[0.62rem] uppercase tracking-[0.5em] mb-4 sm:mb-6 font-mono">Artistic Vision</p>
          <p className="font-serif italic text-2xl sm:text-3xl md:text-4xl text-white leading-relaxed">
            &ldquo;We don&apos;t just capture how your wedding looks &mdash; we preserve how it felt to live it.&rdquo;
          </p>
          <p className="text-white/40 text-[0.68rem] sm:text-[0.72rem] uppercase tracking-[0.25em] sm:tracking-[0.3em] mt-5 sm:mt-6">
            Akshay Takawane &middot; Krafted_Love Stories
          </p>
          <div className="mt-5 h-px w-14 bg-[#c8a97e] mx-auto" />
        </motion.blockquote>
      </section>

      {/* ══════ PROCESS ══════ */}
      <section className="py-16 sm:py-24 px-5 sm:px-8 md:px-16 border-t border-white/[0.07]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-12 sm:mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-[#c8a97e] text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.4em] mb-2 sm:mb-3">Seamless Booking</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl">How We Work Together</h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
            {PROCESS.map(({ step, title, desc }, i) => (
              <motion.div
                key={step}
                className="relative border-l sm:border-l-0 sm:border-t border-white/10 pl-4 sm:pl-0 sm:pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <div className="text-[#c8a97e] text-[0.65rem] uppercase tracking-[0.4em] mb-2 sm:mb-3 font-mono">{step}</div>
                <h3 className="font-serif text-lg sm:text-xl mb-2 sm:mb-3">{title}</h3>
                <p className="text-white/45 text-xs sm:text-sm leading-relaxed font-light">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════ PHOTO STRIP ROW 2 (HORIZONTAL SCROLL ON MOBILE) ══════ */}
      <section className="px-5 sm:px-8 md:px-16 pb-16">
        <div className="max-w-7xl mx-auto flex md:grid md:grid-cols-4 gap-3.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-3">
          {[1, 2, 3, 4].map((n, i) => (
            <motion.div
              key={n}
              className="relative min-w-[260px] sm:min-w-[320px] md:min-w-0 aspect-[3/4] flex-shrink-0 md:flex-shrink overflow-hidden group border border-white/[0.04] snap-start"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.7 }}
            >
              <Image
                src={`/images/sections/strip2_${n}.jpg`}
                alt="Story Archive"
                fill
                unoptimized
                className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════ CTA / DIRECT BOOKING ══════ */}
      <section className="relative py-28 sm:py-36 overflow-hidden border-t border-white/[0.08]">
        <motion.div className="absolute inset-0" style={{ y: ctaParallax }}>
          <Image
            src="/images/sections/cta_bg_1.jpg"
            alt="Reserve your date with Akshay"
            fill
            unoptimized
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/80" />
        <div className="relative z-10 text-center px-5 sm:px-6 max-w-3xl mx-auto">
          <motion.p
            className="text-[#c8a97e] text-[0.65rem] sm:text-[0.68rem] uppercase tracking-[0.5em] mb-4 sm:mb-5 font-mono"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Pune &middot; Across India
          </motion.p>
          <motion.h2
            className="font-serif text-4xl sm:text-5xl md:text-6xl mb-5 sm:mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            Ready to Begin<br />
            <span className="italic text-[#c8a97e]">Your Love Story?</span>
          </motion.h2>
          <motion.p
            className="text-white/65 text-sm sm:text-base md:text-lg max-w-md mx-auto mb-10 sm:mb-12 leading-relaxed font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Connect directly on WhatsApp or call to discuss availability for your celebration.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-[#c8a97e] text-black text-[0.72rem] sm:text-[0.75rem] uppercase tracking-[0.25em] font-semibold hover:bg-white active:scale-98 transition-all duration-300"
            >
              Chat on WhatsApp
              <span className="group-hover:translate-x-1.5 transition-transform duration-300">&#8594;</span>
            </a>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 border border-white/30 text-white text-[0.72rem] sm:text-[0.75rem] uppercase tracking-[0.25em] hover:border-[#c8a97e] hover:text-[#c8a97e] active:scale-98 transition-all duration-300"
            >
              Call +91 9822321660
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════ FOOTER ══════ */}
      <footer className="bg-black border-t border-white/[0.07] py-14 px-5 sm:px-8 md:px-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-serif text-2xl mb-3">
              Krafted_<em className="not-italic text-[#c8a97e]">Love Stories</em>
            </p>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs font-light">
              Led by Akshay Takawane. 10+ years capturing authentic, soul-stirring wedding stories across Pune and all over India.
            </p>
          </div>
          <div>
            <p className="text-white/40 text-[0.6rem] uppercase tracking-[0.35em] mb-4 font-mono">Quick Navigation</p>
            <div className="space-y-2.5">
              <Link href="/" className="block text-white/40 hover:text-white text-sm transition-colors tracking-wide">
                Home
              </Link>
              <Link href="/gallery" className="block text-white/40 hover:text-white text-sm transition-colors tracking-wide">
                Portfolio Archive (300+)
              </Link>
              <Link href="/contact" className="block text-white/40 hover:text-white text-sm transition-colors tracking-wide">
                Contact & Direct Bookings
              </Link>
            </div>
          </div>
          <div>
            <p className="text-white/40 text-[0.6rem] uppercase tracking-[0.35em] mb-4 font-mono">Direct Contact</p>
            <p className="text-white/60 text-sm mb-1">Akshay Takawane</p>
            <p className="text-white/40 text-sm mb-1">📞 +91 9822321660</p>
            <p className="text-white/40 text-sm mb-6">📍 Studio in Pune &middot; Traveling All Over India</p>
            <div className="flex gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/15 text-white/50 hover:border-[#c8a97e] hover:text-[#c8a97e] text-[0.68rem] uppercase tracking-[0.2em] px-4 py-2 transition-all duration-300"
              >
                Instagram
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/15 text-white/50 hover:border-[#c8a97e] hover:text-[#c8a97e] text-[0.68rem] uppercase tracking-[0.2em] px-4 py-2 transition-all duration-300"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto border-t border-white/[0.05] mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-white/25 text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.2em] text-center sm:text-left">
          <span>&copy; {new Date().getFullYear()} Krafted_Love Stories &middot; Akshay Takawane</span>
          <span>Pune, India &middot; All Rights Reserved</span>
        </div>
      </footer>
    </main>
  );
}
