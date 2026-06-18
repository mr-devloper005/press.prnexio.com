import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[#111]">
        <section className="mx-1 bg-white sm:mx-4">
          <div className="mx-auto grid max-w-[1280px] gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,.88fr)] lg:px-8 lg:py-24">
            <div className="text-center lg:text-left">
              <p className="editorial-kicker text-xl text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
              <h1 className="editorial-serif mx-auto mt-5 max-w-4xl text-5xl leading-[1.04] tracking-[-.035em] sm:text-6xl lg:mx-0 lg:text-[4.55rem]">
                Independent media, built for clear stories.
              </h1>
              <p className="mx-auto mt-5 max-w-2xl text-2xl leading-8 text-[var(--slot4-muted-text)] lg:mx-0">{pagesContent.about.description}</p>
            </div>
            <aside className="border-t border-[var(--editorial-rule)] pt-2">
              {pagesContent.about.values.slice(0, 3).map((value, index) => (
                <div key={value.title} className="border-b border-[var(--editorial-rule)] py-6">
                  <p className="text-[10px] font-black uppercase tracking-[.16em] text-[var(--slot4-accent)]">{String(index + 1).padStart(2, '0')}</p>
                  <h2 className="editorial-serif mt-2 text-2xl leading-tight">{value.title}</h2>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="bg-[var(--slot4-page-bg)]">
          <div className="mx-auto grid max-w-[1280px] gap-16 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,760px)_300px] lg:px-8">
          <article>
            <p className="editorial-kicker text-[var(--slot4-accent)]">About {SITE_CONFIG.name}</p>
            <p className="editorial-serif mt-6 text-4xl leading-[1.15] sm:text-5xl">{pagesContent.about.description}</p>
            <div className="article-content mt-10 space-y-6">
              {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </article>
          <aside className="bg-white">
            {pagesContent.about.values.map((value, index) => (
              <div key={value.title} className="border-b border-[var(--editorial-rule)] p-7 last:border-b-0">
                <p className="editorial-kicker text-[var(--slot4-accent)]">0{index + 1}</p>
                <h2 className="editorial-serif mt-4 text-3xl leading-tight">{value.title}</h2>
                <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
              </div>
            ))}
          </aside>
          </div>
        </section>

        <section className="mx-1 bg-white sm:mx-4">
          <div className="mx-auto flex max-w-[1280px] flex-col gap-6 px-4 py-12 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
            <h2 className="editorial-serif max-w-3xl text-4xl leading-tight sm:text-5xl">Read the stories shaping the conversation.</h2>
            <Link href="/search" className="inline-flex w-fit bg-[var(--slot4-accent)] px-6 py-4 text-xs font-black uppercase tracking-[0.18em] text-white">Explore the archive</Link>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
