import PostClient from './PostClient';
import { getAllSlugs } from '@/lib/media';

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <PostClient slug={resolvedParams.slug} />;
}
