import Link from 'next/link'
import { ArrowRight, Check, Search } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { editableDesignContract as dc } from '@/editable/layouts/design-contract'
import { ArticleListCard, CompactIndexCard, getEditableExcerpt, getEditablePostImage, postHref, RailPostCard } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

function taskLabel(task: TaskKey) {
  return SITE_CONFIG.tasks.find((item) => item.key === task)?.label || task
}

function safePosts(posts: SitePost[], fallback: SitePost[] = []) {
  return posts.length ? posts : fallback
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const lead = posts[0]
  const side = safePosts(posts.slice(1, 5), posts.slice(0, 4))
  const heroTitle = pagesContent.home.hero.title.join(' ') || `${SITE_CONFIG.name}: media, communication, and culture.`

  return (
    <section className="mx-1 bg-white sm:mx-4">
      <div className="mx-auto grid max-w-[1280px] gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(360px,.88fr)] lg:px-8 lg:py-24">
        {lead ? (
          <Link href={postHref(primaryTask, lead, primaryRoute)} className="group min-w-0 text-center story-rise">
            <h1 className="editorial-serif mx-auto max-w-[720px] text-5xl leading-[1.04] tracking-[-.035em] sm:text-6xl lg:text-[4.55rem]">{lead.title}</h1>
            <p className="mx-auto mt-5 max-w-[720px] text-2xl leading-8 text-black">{getEditableExcerpt(lead, 155)}</p>
            <p className="mt-5 text-lg font-bold">Editorial Desk</p>
            <div className="hero-float relative mx-auto mt-8 aspect-[4/3] max-w-[720px] overflow-hidden bg-[var(--slot4-media-bg)]">
              <img src={getEditablePostImage(lead)} alt={lead.title} className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.025]" />
            </div>
          </Link>
        ) : (
          <div className="min-h-[520px] text-center">
            <p className="editorial-kicker text-2xl">{pagesContent.home.hero.badge}</p>
            <h1 className="editorial-serif mx-auto mt-5 max-w-4xl text-5xl leading-[1.04] sm:text-6xl">{heroTitle}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-xl leading-8 text-[var(--slot4-muted-text)]">{pagesContent.home.hero.description}</p>
            <Link href={primaryRoute} className="fa-link-underline mt-8 inline-flex font-bold">Open current issue <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </div>
        )}

        <aside className="pt-2">
          <div className="border-t border-[var(--editorial-rule)]">
            {side.map((post, index) => (
              <CompactIndexCard key={post.id || post.slug || post.title} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
            ))}
          </div>
        </aside>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const railPosts = safePosts(posts.slice(4, 14), posts).slice(0, 10)
  if (!railPosts.length) return null
  const marquee = [...railPosts, ...railPosts]

  return (
    <section className="overflow-hidden bg-[var(--slot4-page-bg)]">
      <div className={`${dc.shell.section} py-14 sm:py-20`}>
        <div className="relative mx-1 overflow-hidden sm:mx-0">
          <div className="home-marquee flex w-max gap-5">
            {marquee.map((post, index) => (
              <RailPostCard key={`${post.id || post.slug || post.title}-${index}`} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index % railPosts.length} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts }: HomeSectionProps) {
  const spotlight = posts[5] || posts[0]
  const list = safePosts(posts.slice(6, 12), posts.slice(1, 7))
  if (!spotlight) return null

  return (
    <>
      <section className="relative seal-watermark mx-1 overflow-hidden bg-white sm:mx-4">
        <div className="mx-auto max-w-[1280px] px-4 py-20 text-center sm:px-6 lg:px-8 lg:py-28">
          <h2 className="editorial-serif mx-auto max-w-4xl text-5xl leading-[1.1] sm:text-6xl">
            <span className="italic">Stay informed.</span> Subscribe for full site access, audio, and exclusive downloads.
          </h2>
          <Link href="/signup" className="mt-8 inline-flex bg-[var(--slot4-accent)] px-6 py-3 text-sm font-bold text-white">Subscribe <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </div>
      </section>

      <section className="bg-[var(--slot4-page-bg)]">
        <div className={`${dc.shell.section} py-16 sm:py-20`}>
          <p className="editorial-kicker mb-5 text-2xl">Spotlight: Media</p>
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,.85fr)]">
            <Link href={postHref(primaryTask, spotlight, primaryRoute)} className="group block">
              <div className="relative aspect-[4/3] overflow-hidden bg-[var(--slot4-media-bg)]">
                <img src={getEditablePostImage(spotlight)} alt={spotlight.title} className="absolute inset-0 h-full w-full object-cover grayscale transition duration-700 group-hover:scale-[1.025] group-hover:grayscale-0" />
              </div>
              <h2 className="editorial-serif mt-6 text-5xl leading-[1.05] tracking-[-.035em]">{spotlight.title}</h2>
              <p className="mt-3 max-w-2xl text-xl leading-8 text-[var(--slot4-muted-text)]">{getEditableExcerpt(spotlight, 160)}</p>
            </Link>

            <div className="border-t border-[var(--editorial-rule)]">
              {list.slice(0, 4).map((post, index) => (
                <CompactIndexCard key={post.id || post.slug || post.title} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const collected = timeSections.flatMap((section) => section.posts)
  const source = safePosts(collected, posts)
  const issueLead = source[0] || posts[0]
  const issueItems = safePosts(source.slice(1, 5), posts.slice(1, 5))
  const reviewsLead = source[5] || posts[5] || posts[0]
  const more = safePosts(source.slice(6, 14), posts.slice(6, 14))
  const editorsPick = source[14] || posts[2] || posts[0]

  return (
    <>
      {issueLead ? (
        <section className="bg-[var(--slot4-page-bg)]">
          <div className={`${dc.shell.section} py-16 sm:py-24`}>
            <p className="editorial-kicker text-2xl">Current Issue</p>
            <p className="editorial-serif mt-1 text-3xl">June 2026</p>
            <div className="mt-8 grid gap-8 lg:grid-cols-[210px_minmax(0,1fr)]">
              <Link href={postHref(primaryTask, issueLead, primaryRoute)} className="group block">
                <div className="aspect-[2/3] bg-[#b8dbf4] p-3 shadow-sm">
                  <img src={getEditablePostImage(issueLead)} alt={issueLead.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
                </div>
                <span className="fa-link-underline mt-10 inline-block font-bold">Full Table of Contents <ArrowRight className="inline h-4 w-4" /></span>
                <span className="fa-link-underline mt-6 block text-[var(--slot4-accent)]">Subscribe <ArrowRight className="inline h-4 w-4" /></span>
              </Link>
              <div className="grid gap-x-10 gap-y-0 md:grid-cols-2">
                {issueItems.map((post, index) => (
                  <ArticleListCard key={post.id || post.slug || post.title} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {reviewsLead ? (
        <section className="bg-[var(--slot4-page-bg)]">
          <div className={`${dc.shell.section} py-14 sm:py-20`}>
            <p className="editorial-kicker text-2xl">Book Reviews</p>
            <div className="mt-8 grid gap-10 lg:grid-cols-[270px_minmax(0,1fr)_360px] lg:items-start">
              <Link href={postHref(primaryTask, reviewsLead, primaryRoute)} className="group aspect-[2/3] overflow-hidden bg-[var(--slot4-media-bg)]">
                <img src={getEditablePostImage(reviewsLead)} alt={reviewsLead.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
              </Link>
              <div>
                <h2 className="editorial-serif text-5xl leading-[1.08] tracking-[-.035em] sm:text-6xl">{reviewsLead.title}</h2>
                <p className="mt-5 text-2xl">Reviewed by Editorial Desk</p>
                <Link href={postHref(primaryTask, reviewsLead, primaryRoute)} className="fa-link-underline mt-6 inline-flex font-bold">Continue reading <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {more.slice(0, 4).map((post) => (
                  <Link key={post.id || post.slug || post.title} href={postHref(primaryTask, post, primaryRoute)} className="group aspect-[3/4] overflow-hidden bg-[var(--slot4-media-bg)]">
                    <img src={getEditablePostImage(post)} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {more.length ? (
        <section className="mx-1 bg-white sm:mx-4">
          <div className="mx-auto grid max-w-[1280px] gap-16 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,760px)_300px] lg:px-8">
            <div>
              {more.slice(4, 12).map((post, index) => (
                <ArticleListCard key={post.id || post.slug || post.title} post={post} href={postHref(primaryTask, post, primaryRoute)} index={index} />
              ))}
              <Link href={primaryRoute} className="fa-link-underline mt-5 inline-block font-bold">View All <ArrowRight className="inline h-4 w-4" /></Link>
            </div>
            <aside className="hidden lg:block">
              <div className="sticky top-32 border border-black bg-white p-4 text-center">
                <p className="text-xs font-black uppercase tracking-[.18em] text-[var(--slot4-accent)]">Media Desk</p>
                <p className="editorial-serif mt-4 text-3xl leading-tight">Choose your path in content, branding, and digital publishing.</p>
              </div>
            </aside>
          </div>
        </section>
      ) : null}

      {editorsPick ? (
        <section className="bg-[var(--slot4-page-bg)]">
          <div className={`${dc.shell.section} grid gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,.9fr)_minmax(360px,1.1fr)] lg:items-center`}>
            <Link href={postHref(primaryTask, editorsPick, primaryRoute)} className="hero-float block overflow-hidden bg-[var(--slot4-media-bg)]">
              <img src={getEditablePostImage(editorsPick)} alt={editorsPick.title} className="aspect-[3/4] w-full object-cover" />
            </Link>
            <div className="text-center">
              <p className="editorial-serif text-2xl">Editor&apos;s Pick</p>
              <div className="mx-auto mt-5 h-px w-12 bg-black" />
              <h2 className="editorial-serif mt-10 text-6xl leading-[1.05] tracking-[-.04em]">{editorsPick.title}</h2>
              <p className="mx-auto mt-5 max-w-xl text-2xl leading-8 text-[var(--slot4-muted-text)]">{getEditableExcerpt(editorsPick, 125)}</p>
              <p className="mt-5 font-bold">Editorial Desk</p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-[var(--slot4-page-bg)]">
        <form action="/search" className={`${dc.shell.section} grid gap-5 py-10 sm:grid-cols-[1fr_auto] sm:items-center`}>
          <div>
            <h3 className="editorial-serif text-4xl">Search the archive</h3>
            <p className="mt-2 text-[var(--slot4-muted-text)]">Explore {taskLabel(primaryTask).toLowerCase()}, media updates, and public communication notes.</p>
          </div>
          <label className="flex border border-black bg-white sm:min-w-[420px]">
            <Search className="ml-4 mt-4 h-4 w-4" />
            <input name="q" placeholder="Search stories" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none" />
            <button className="bg-black px-5 text-xs font-black uppercase tracking-[.14em] text-white">Search</button>
          </label>
        </form>
      </section>
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[var(--slot4-page-bg)]">
      <div className={`${dc.shell.section} grid gap-10 py-16 sm:py-24 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-center`}>
        <div>
          <h2 className="editorial-serif text-5xl leading-tight sm:text-6xl">Subscribe to <span className="italic">{SITE_CONFIG.name}</span> today</h2>
          <div className="mt-6 grid gap-3 text-2xl leading-8">
            {['Enjoy fresh media updates across digital formats', 'Browse public communication, publishing, and branding coverage', 'Access useful article pages and visual posts', 'Get a cleaner way to follow important releases'].map((item) => (
              <p key={item} className="flex gap-3"><Check className="mt-1 h-6 w-6 shrink-0 text-[#3549d8]" /> {item}</p>
            ))}
          </div>
          <Link href="/signup" className="mt-9 inline-flex bg-[var(--slot4-accent)] px-6 py-3 text-sm font-bold text-white">Subscribe Now <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </div>
        <div className="bg-[#b8dbf4] p-3 shadow-[0_20px_60px_rgba(30,80,120,.14)]">
          <div className="aspect-[2/3] bg-[var(--slot4-accent)] p-6 text-white">
            <p className="editorial-brand text-4xl leading-none">{SITE_CONFIG.name}</p>
            <p className="editorial-serif mt-20 text-3xl leading-tight">Modern media, public updates, and digital culture.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
