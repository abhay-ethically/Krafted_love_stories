import { MediaItem } from '@/lib/media';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useState } from 'react';

interface Props {
  images: MediaItem[]; // array of items belonging to a carousel post
}

export default function Lightbox({ images }: Props) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        {images.map((img, i) => (
          <button key={i} onClick={() => { setIndex(i); setOpen(true); }}>
            <Image src={img.thumb!} alt={img.alt ?? 'Photo'} width={250} height={180} className="object-cover rounded" />
          </button>
        ))}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button onClick={() => setOpen(false)} className="absolute top-4 right-4 text-white text-2xl">✕</button>
            <button onClick={prev} className="absolute left-4 text-white text-3xl">‹</button>
            <motion.img
              src={images[index].thumb!}
              alt={images[index].alt ?? 'Photo'}
              className="max-w-full max-h-full object-contain"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
            />
            <button onClick={next} className="absolute right-4 text-white text-3xl">›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
