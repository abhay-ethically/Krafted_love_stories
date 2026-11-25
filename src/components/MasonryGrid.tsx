import { MediaItem } from '@/lib/media';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface Props {
  items: MediaItem[];
}

export default function MasonryGrid({ items }: Props) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
      {items.map((item) => (
        <motion.div
          key={item.filename}
          whileHover={{ scale: 1.03 }}
          className="relative rounded overflow-hidden mb-4"
        >
          <Image
            src={item.thumb!}
            alt={item.alt ?? 'Photo'}
            width={400}
            height={300}
            placeholder="blur"
            blurDataURL={item.lqip}
            className="w-full h-auto object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
}
