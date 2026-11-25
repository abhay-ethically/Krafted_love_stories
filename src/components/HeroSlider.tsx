'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { MediaItem } from '@/lib/media';
import { getFeatured } from '@/lib/media';

export default function HeroSlider() {
  const [slides, setSlides] = useState<MediaItem[]>([]);
  useEffect(() => {
    getFeatured().then((items) => setSlides(items));
  }, []);

  return (
    <section className="relative h-[60vh] overflow-hidden">
      {slides.map((item, i) => (
        <motion.div
          key={item.filename || i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: i * 3 }}
        >
          <Image
            src={item.thumb || `/images/original/${item.filename}`}
            alt={item.alt || 'Featured'}
            fill
            unoptimized
            style={{ objectFit: 'cover' }}
            priority
          />
        </motion.div>
      ))}
      <div className="absolute inset-0 bg-black/40" />
    </section>
  );
}
