import { MediaItem } from '@/lib/media';
import React from 'react';

interface Props {
  href?: string;
  onClick?: () => void;
  label: string;
  type?: 'button' | 'submit';
}

export default function CTAButton({ href, onClick, label, type = 'button' }: Props) {
  const base = 'px-6 py-3 bg-primary text-white rounded-full font-medium hover:bg-primary/90 transition';
  if (href) {
    return (
      <a href={href} className={base}>{label}</a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={base}>{label}</button>
  );
}
