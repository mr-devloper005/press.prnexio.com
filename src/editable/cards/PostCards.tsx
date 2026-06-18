import Link from 'next/link'
import { ArrowRight, Clock3 } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { TaskKey } from '@/lib/site-config'
import { editableDesignContract as dc, editablePalette as pal } from '@/editable/layouts/design-contract'

export function getEditablePostImage(post?: SitePost | null) {
  const media = Array.isArray(post?.media) ? post.media : []
  const mediaUrl = media.find((item) => typeof item?.url === 'string' && item.url)?.url
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const images = Array.isArray(content.images) ? content.images : []
  const contentImage = images.find((value): value is string => typeof value === 'string' && Boolean(value))
  const directImage = ['featuredImage', 'image', 'thumbnail', 'coverImage', 'logo']
    .map((key) => content[key])
    .find((value): value is string => typeof value === 'string' && Boolean(value))
  return mediaUrl || directImage || contentImage || '/placeholder.svg?height=900&width=1400'
}

export function getEditableExcerpt(post?: SitePost | null, limit = 150) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  const raw =
    (typeof content.description === 'string' && content.description) ||
    (typeof content.summary === 'string' && content.summary) ||
    (typeof content.body === 'string' && content.body) ||
    post?.summary ||
    ''
  const clean = raw.replace(/<[^>]*>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim()
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

export function getEditableCategory(post?: SitePost | null) {
  const content = post?.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Latest'
}

export function postHref(task: TaskKey, post: SitePost, route = `/${task}`) {
  return `${route}/${post.slug}`
}

export function EditorialFeatureCard({ post, href, label = 'Cover story' }: { post: SitePost; href: string; label?: string }) {
  return (
    <Link href={href} className="group block min-w-0 text-center story-rise">
      <div className="mx-auto max-w-[760px]">
        <p className="editorial-kicker text-xl">{label}</p>
        <h3 className="editorial-serif mt-4 text-5xl leading-[1.05] tracking-[-.035em] sm:text-6xl">{post.title}</h3>
        <p className="mx-auto mt-4 max-w-2xl text-xl leading-7 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 170)}</p>
        <div className="hero-float relative mt-8 aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
          <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" />
        </div>
      </div>
    </Link>
  )
}

export function RailPostCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className={`group ${dc.layout.minRailCard} block bg-transparent ${dc.motion.lift}`}>
      <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
      <div className="pt-4">
        <div className="flex items-center justify-between gap-3 text-[10px] font-black uppercase tracking-[.16em] text-[var(--slot4-accent)]">
          <span>{getEditableCategory(post)}</span><span>{String(index + 1).padStart(2, '0')}</span>
        </div>
        <h3 className="editorial-serif mt-2 line-clamp-3 text-2xl leading-[1.08] tracking-[-.025em]">{post.title}</h3>
      </div>
    </Link>
  )
}

export function CompactIndexCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 grid-cols-[1fr_92px] gap-5 border-t border-[var(--editorial-rule)] py-6 first:border-t">
      <div className="min-w-0">
        <h3 className="editorial-serif line-clamp-2 text-2xl leading-[1.08] tracking-[-.02em] group-hover:text-[var(--slot4-accent)]">{post.title}</h3>
        <p className="mt-2 line-clamp-2 text-lg leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 86)}</p>
        <p className="mt-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-[.12em]"><Clock3 className="h-3 w-3" /> {getEditableCategory(post)} / {String(index + 1).padStart(2, '0')}</p>
      </div>
      <img src={getEditablePostImage(post)} alt={post.title} className="h-[92px] w-[92px] object-cover" />
    </Link>
  )
}

export function ArticleListCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group grid min-w-0 border-t border-[var(--editorial-rule)] py-7 sm:grid-cols-[minmax(0,1fr)_200px] sm:gap-8">
      <div className="min-w-0 pt-1">
        <p className={`${dc.type.eyebrow}`}>{String(index + 1).padStart(2, '0')} / {getEditableCategory(post)}</p>
        <h2 className="editorial-serif mt-3 line-clamp-3 text-3xl leading-[1.05] tracking-[-.025em] group-hover:text-[var(--slot4-accent)]">{post.title}</h2>
        <p className={`mt-2 line-clamp-2 text-lg leading-7 ${pal.mutedText}`}>{getEditableExcerpt(post, 150)}</p>
        <span className="fa-link-underline mt-4 inline-flex items-center gap-2 text-sm font-bold">Continue reading <ArrowRight className="h-4 w-4" /></span>
      </div>
      <div className="relative mt-4 aspect-[3/2] overflow-hidden bg-[var(--slot4-media-bg)] sm:mt-0">
        <img src={getEditablePostImage(post)} alt={post.title} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
      </div>
    </Link>
  )
}
