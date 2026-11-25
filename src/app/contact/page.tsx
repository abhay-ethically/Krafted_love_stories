'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

const PHONE_NUMBER = '+919822321660';
const WHATSAPP_URL = 'https://wa.me/919822321660?text=Hi%20Akshay,%20I%20came%20across%20Krafted_Love%20Stories%20and%20would%20love%20to%20discuss%20a%20wedding%20shoot!';
const INSTAGRAM_URL = 'https://www.instagram.com/krafted_love_stories';

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [mobileMenuOpen]);

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

      {/* Floating WhatsApp Action Desktop */}
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
          <Link href="/gallery" className="text-[0.78rem] uppercase tracking-[0.18em] text-white/60 hover:text-white transition-colors duration-300">
            Portfolio
          </Link>
          <Link href="/contact" className="text-[0.78rem] uppercase tracking-[0.18em] text-[#c8a97e]">
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
                className="font-serif text-3xl text-white/80 hover:text-white"
              >
                Portfolio Archive (300+)
              </Link>
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-3xl text-[#c8a97e]"
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
          Direct Artist Concierge
        </motion.p>
        <motion.h1
          className="font-serif text-4xl sm:text-6xl md:text-7xl mb-4 sm:mb-6 tracking-tight"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Book With <span className="italic text-[#c8a97e]">Akshay</span>
        </motion.h1>
        <motion.p
          className="text-white/60 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          Skip waiting on emails. Message directly on WhatsApp or call to discuss availability for dates in Pune or anywhere across India.
        </motion.p>
      </section>

      {/* Direct Booking Cards */}
      <section className="max-w-5xl mx-auto px-5 sm:px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-14">
          {/* Card 1: WhatsApp */}
          <motion.div
            className="p-8 sm:p-12 border border-white/10 bg-[#111] hover:border-[#c8a97e]/60 transition-all duration-400 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div>
              <p className="text-[#c8a97e] text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.3em] mb-3 font-mono">Fastest Response</p>
              <h2 className="font-serif text-2xl sm:text-3xl mb-3 sm:mb-4">WhatsApp Direct</h2>
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-light mb-8">
                Share your wedding dates, venue details, or photography vision. Akshay will reply with portfolio links, tailored package options, and schedule.
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 w-full py-4 bg-[#25D366] text-black text-[0.72rem] sm:text-[0.75rem] uppercase tracking-[0.2em] font-semibold hover:bg-white active:scale-98 transition-all duration-300"
            >
              Start WhatsApp Chat &rarr;
            </a>
          </motion.div>

          {/* Card 2: Phone Call */}
          <motion.div
            className="p-8 sm:p-12 border border-white/10 bg-[#111] hover:border-[#c8a97e]/60 transition-all duration-400 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div>
              <p className="text-[#c8a97e] text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.3em] mb-3 font-mono">Direct Voice Consultation</p>
              <h2 className="font-serif text-2xl sm:text-3xl mb-3 sm:mb-4">Phone Call</h2>
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-light mb-8">
                Prefer discussing your special day over a phone call? Dial directly to speak with Akshay regarding wedding dates, coverage, and logistics.
              </p>
            </div>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="inline-flex items-center justify-center gap-3 w-full py-4 border border-[#c8a97e] text-[#c8a97e] hover:bg-[#c8a97e] hover:text-black text-[0.72rem] sm:text-[0.75rem] uppercase tracking-[0.2em] font-semibold active:scale-98 transition-all duration-300"
            >
              Call 9822321660 &rarr;
            </a>
          </motion.div>
        </div>

        {/* Agency Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/[0.08] pt-12 sm:pt-16">
          <div>
            <p className="text-[#c8a97e] text-[0.62rem] uppercase tracking-[0.3em] mb-2 font-mono">Studio Base</p>
            <h3 className="font-serif text-lg sm:text-xl mb-1.5">Pune, Maharashtra</h3>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-light">
              Available for meetings in Pune by appointment.
            </p>
          </div>

          <div>
            <p className="text-[#c8a97e] text-[0.62rem] uppercase tracking-[0.3em] mb-2 font-mono">Coverage Area</p>
            <h3 className="font-serif text-lg sm:text-xl mb-1.5">All Over India</h3>
            <p className="text-white/50 text-xs sm:text-sm leading-relaxed font-light">
              Frequent destination weddings in Goa, Rajasthan, Delhi NCR, and across Maharashtra.
            </p>
          </div>

          <div>
            <p className="text-[#c8a97e] text-[0.62rem] uppercase tracking-[0.3em] mb-2 font-mono">Social Archive</p>
            <h3 className="font-serif text-lg sm:text-xl mb-1.5">Instagram</h3>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-[#c8a97e] text-xs sm:text-sm leading-relaxed transition-colors inline-block font-light"
            >
              @krafted_love_stories &rarr;
            </a>
          </div>
        </div>

        {/* Visual Banner */}
        <div className="mt-12 sm:mt-16 relative h-[260px] sm:h-[320px] overflow-hidden border border-white/10">
          <Image
            src="/images/sections/quote_1.jpg"
            alt="Krafted_Love Stories Studio Atmosphere"
            fill
            unoptimized
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/65 flex items-center justify-center text-center p-6">
            <div>
              <p className="text-[#c8a97e] text-[0.62rem] uppercase tracking-[0.35em] mb-3 font-mono">10+ Years Experience</p>
              <h4 className="font-serif text-xl sm:text-2xl md:text-3xl italic max-w-lg mx-auto leading-relaxed">
                &ldquo;Every love story is unique, and we treat it with the sanctity it deserves.&rdquo;
              </h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/[0.05] py-12 px-6 text-center text-white/30 text-[0.62rem] sm:text-[0.65rem] uppercase tracking-[0.2em]">
        &copy; {new Date().getFullYear()} Krafted_Love Stories &middot; Akshay Takawane &middot; Pune
      </footer>
    </main>
  );
}
