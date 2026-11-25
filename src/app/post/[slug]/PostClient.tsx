'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import type { MediaItem } from '@/lib/media';
import { getMedia } from '@/lib/media';

export default function PostClient({ slug }: { slug: string }) {
  const [group, setGroup] = useState<MediaItem[]>([]);
  const [index, setIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    getMedia().then((all) => {
      const [post_id, user_id] = slug.split('_u_');
      const g = all.filter((m) => m.post_id === post_id && m.user_id === user_id);
      setGroup(g);
    });
  }, [slug]);

  const prev = () => setIndex((i) => (i - 1 + group.length) % group.length);
  const next = () => setIndex((i) => (i + 1) % group.length);
  const current = group[index];

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <nav className="sticky top-0 z-40 bg-black/85 backdrop-blur-xl border-b border-white/[0.06] flex items-center justify-between px-8 md:px-16 py-5">
        <Link href="/" className="font-serif text-[1.1rem] tracking-[0.18em] text-white hover:text-[#c8a97e] transition-colors duration-300">
          krafted <em className="not-italic text-[#c8a97e]">Love Stories</em>
        </Link>
        <Link href="/gallery" className="text-[0.75rem] uppercase tracking-[0.2em] text-[#c8a97e] hover:text-white transition-colors">
          &larr; Back to Gallery
        </Link>
      </nav>

      <section className="max-w-5xl mx-auto px-6 py-16">
        {!current ? (
          <div className="text-center py-24 text-white/40 text-sm uppercase tracking-[0.2em]">
            Loading Story...
          </div>
        ) : current.ext === 'mp4' ? (
          <div className="overflow-hidden border border-white/10 shadow-2xl bg-black">
            <video controls className="w-full max-h-[75vh]" poster={current.thumb}>
              <source src={`/images/original/${current.filename}`} type="video/mp4" />
            </video>
          </div>
        ) : (
          <>
            <motion.div
              className="relative overflow-hidden border border-white/10 shadow-2xl cursor-pointer group bg-[#111]"
              onClick={() => setLightboxOpen(true)}
              whileHover={{ scale: 1.005 }}
            >
              <Image
                src={`/images/original/${current.filename}`}
                alt={current.alt ?? 'Full resolution photograph'}
                width={1200}
                height={800}
                unoptimized
                className="w-full h-auto max-h-[75vh] object-contain"
              />
              <div className="absolute bottom-5 right-5 bg-black/70 backdrop-blur-md text-white text-[0.65rem] uppercase tracking-[0.2em] px-4 py-1.5 border border-white/10">
                {index + 1} / {group.length}
              </div>
            </motion.div>

            {group.length > 1 && (
              <div className="flex gap-3 mt-6 overflow-x-auto pb-2 justify-center">
                {group.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`flex-shrink-0 overflow-hidden border transition-all ${
                      i === index
                        ? 'border-[#c8a97e] opacity-100'
                        : 'border-transparent opacity-40 hover:opacity-80'
                    }`}
                  >
                    <Image
                      src={img.thumb!}
                      alt=""
                      width={80}
                      height={60}
                      unoptimized
                      className="object-cover w-20 h-14"
                    />
                  </button>
                ))}
              </div>
            )}

            {group.length > 1 && (
              <div className="flex justify-center gap-6 mt-8">
                <button
                  onClick={prev}
                  className="px-6 py-2 border border-white/20 text-white/60 hover:border-[#c8a97e] hover:text-[#c8a97e] transition text-[0.72rem] uppercase tracking-[0.2em]"
                >
                  &larr; Previous
                </button>
                <button
                  onClick={next}
                  className="px-6 py-2 border border-white/20 text-white/60 hover:border-[#c8a97e] hover:text-[#c8a97e] transition text-[0.72rem] uppercase tracking-[0.2em]"
                >
                  Next &rarr;
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {/* Full-screen lightbox */}
      <AnimatePresence>
        {lightboxOpen && current && (
          <motion.div
            className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-50 flex items-center justify-center p-4 md:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxOpen(false)}
          >
            <button
              className="absolute top-6 right-8 text-white/60 hover:text-white text-3xl font-light"
              onClick={() => setLightboxOpen(false)}
            >
              &times;
            </button>
            <button
              className="absolute left-6 text-white/60 hover:text-white text-4xl font-light"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
            >
              &#8249;
            </button>
            <motion.img
              src={`/images/original/${current.filename}`}
              alt={current.alt}
              className="max-w-full max-h-[85vh] object-contain shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button
              className="absolute right-6 text-white/60 hover:text-white text-4xl font-light"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
            >
              &#8250;
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
