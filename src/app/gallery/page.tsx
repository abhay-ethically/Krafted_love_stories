'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { MediaItem } from '../../lib/media';
import { getMedia } from '../../lib/media';

const PHONE_NUMBER = '+919822321660';
const WHATSAPP_URL = 'https://wa.me/919822321660?text=Hi%20Akshay,%20I%20am%20browsing%20your%20portfolio%20on%20Krafted_Love%20Stories%20and%20would%20love%20to%20discuss%20a%20shoot!';
const INSTAGRAM_URL = 'https://www.instagram.com/krafted_love_stories';

export default function GalleryPage() {
  const [all, setAll] = useState<MediaItem[]>([]);
  const [filter, setFilter] = useState<'all' | 'jpg' | 'mp4'>('all');
  const [activeItem, setActiveItem] = useState<MediaItem | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    getMedia().then(setAll);
  }, []);

  // Lock scroll on active modal or menu
  useEffect(() => {
    if (activeItem || mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [activeItem, mobileMenuOpen]);

  const filtered = filter === 'all' ? all : all.filter((m) => m.ext === filter);

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white pb-20 sm:pb-0">
      {/* ══════ MOBILE BOTTOM ACTION BAR ══════ */}
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

      {/* Floating WhatsApp Action for Desktop */}
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

      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-black/85 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-5 sm:px-8 md:px-16 py-4 sm:py-5">
        <Link href="/" className="font-serif text-[1.1rem] sm:text-[1.15rem] tracking-[0.14em] text-white hover:text-[#c8a97e] transition-colors duration-300">
          Krafted_<em className="not-italic text-[#c8a97e]">Love Stories</em>
        </Link>
        <div className="hidden md:flex items-center gap-8 md:gap-10">
          <Link href="/" className="text-[0.78rem] uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors duration-300">
            Home
          </Link>
          <Link href="/gallery" className="text-[0.78rem] uppercase tracking-[0.18em] text-[#c8a97e]">
            Portfolio
          </Link>
          <Link href="/contact" className="text-[0.78rem] uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors duration-300">
            Bookings
          </Link>
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

      {/* Fullscreen Mobile Drawer */}
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
                className="font-serif text-3xl text-white/80 hover:text-white"
              >
                Home
              </Link>
              <Link
                href="/gallery"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-[#c8a97e]"
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

            <div className="pt-8 border-t border-white/10 space-y-3">
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#c8a97e]">Akshay Takawane</p>
              <p className="text-white/50 text-sm">Pune &middot; Destination Weddings All Over India</p>
              <a href={`tel:${PHONE_NUMBER}`} className="block text-[#c8a97e] text-base font-mono">
                📞 +91 9822321660
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <section className="pt-16 sm:pt-24 pb-10 sm:pb-14 text-center px-5 sm:px-6 max-w-4xl mx-auto">
        <motion.p
          className="text-[#c8a97e] text-[0.62rem] sm:text-[0.68rem] uppercase tracking-[0.4em] sm:tracking-[0.5em] mb-3 sm:mb-4 font-mono"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Archive &middot; Akshay Takawane
        </motion.p>
        <motion.h1
          className="font-serif text-4xl sm:text-6xl md:text-7xl mb-4 sm:mb-6 tracking-tight"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Visual <span className="italic text-[#c8a97e]">Chronicles</span>
        </motion.h1>
        <motion.p
          className="text-white/55 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Over 300 timeless frames celebrating love stories captured in Pune and across India.
        </motion.p>

        {/* Filter Pills */}
        <motion.div
          className="inline-flex p-1 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-sm max-w-full overflow-x-auto"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {(['all', 'jpg', 'mp4'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 sm:px-6 py-2 rounded-full text-[0.68rem] sm:text-[0.72rem] uppercase tracking-[0.16em] sm:tracking-[0.2em] font-medium transition-all duration-300 ${
                filter === f
                  ? 'bg-[#c8a97e] text-black shadow-lg shadow-[#c8a97e]/20'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {f === 'all' ? 'All Works' : f === 'jpg' ? 'Photos' : 'Films'}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Gallery Grid (Optimized 2-column layout on phones) */}
      <section className="px-3 sm:px-6 md:px-12 pb-24 max-w-7xl mx-auto">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-2.5 sm:gap-4 space-y-2.5 sm:space-y-4">
          {filtered.map((item, i) => (
            <motion.div
              key={item.filename}
              className="relative overflow-hidden group cursor-pointer break-inside-avoid border border-white/[0.05] bg-[#111]"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.5, delay: (i % 6) * 0.04 }}
              onClick={() => setActiveItem(item)}
            >
              <Image
                src={item.thumb!}
                alt={item.alt ?? 'Krafted_Love Stories'}
                width={600}
                height={800}
                unoptimized
                placeholder={item.lqip ? 'blur' : 'empty'}
                blurDataURL={item.lqip}
                className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-5">
                <span className="text-[#c8a97e] text-[0.58rem] sm:text-[0.62rem] uppercase tracking-[0.25em] font-mono mb-1">
                  {item.ext === 'mp4' ? 'Motion Film' : 'Still Portrait'}
                </span>
                <span className="text-white text-[0.7rem] sm:text-xs font-serif italic tracking-wide">
                  View Detail &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Lightbox Modal (Optimized for Mobile Pinch/Tap) */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
          >
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-5 sm:top-6 sm:right-8 text-white/60 hover:text-white text-3xl font-light p-2 z-50 transition-colors"
              aria-label="Close Preview"
            >
              &times;
            </button>
            <div
              className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {activeItem.ext === 'mp4' ? (
                <video
                  controls
                  autoPlay
                  playsInline
                  className="max-h-[80vh] w-full rounded shadow-2xl"
                  poster={activeItem.thumb}
                >
                  <source src={`/images/original/${activeItem.filename}`} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={`/images/original/${activeItem.filename}`}
                  alt={activeItem.alt ?? 'Full Preview'}
                  width={1400}
                  height={1800}
                  unoptimized
                  className="max-h-[82vh] w-auto max-w-full object-contain shadow-2xl"
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Direct CTA */}
      <section className="py-16 sm:py-24 text-center border-t border-white/[0.07] px-5 sm:px-6">
        <p className="text-[#c8a97e] text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.4em] mb-3 font-mono">Bookings &middot; Akshay Takawane</p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-6">Love What You See?</h2>
        <p className="text-white/50 text-sm max-w-md mx-auto mb-8 sm:mb-10 leading-relaxed font-light">
          Connect directly on WhatsApp to check availability for your celebration dates.
        </p>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 sm:px-10 py-4 bg-[#c8a97e] text-black text-[0.72rem] uppercase tracking-[0.2em] font-semibold hover:bg-white active:scale-98 transition-all duration-300"
        >
          Message on WhatsApp
        </a>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/[0.05] py-12 px-6 text-center text-white/30 text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.2em]">
        &copy; {new Date().getFullYear()} Krafted_Love Stories &middot; Akshay Takawane &middot; Pune
      </footer>
    </main>
  );
}
