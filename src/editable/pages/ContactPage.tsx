'use client'

import { FileText, Mail, Megaphone } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const desks = [
  { icon: FileText, title: 'Editorial desk', body: 'Send story ideas, corrections, source material, and publication questions.' },
  { icon: Megaphone, title: 'Media partnerships', body: 'Discuss distribution, syndication, newsroom collaborations, and campaigns.' },
  { icon: Mail, title: 'General support', body: 'Reach the team for account, publishing, or site-related help.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[#111]">
        <section className="mx-1 bg-white sm:mx-4">
          <div className="mx-auto grid max-w-[1280px] gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.12fr)_minmax(320px,.88fr)] lg:px-8 lg:py-24">
            <div className="text-center lg:text-left">
              <p className="editorial-kicker text-xl text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
              <h1 className="editorial-serif mx-auto mt-5 max-w-4xl text-5xl leading-[1.04] tracking-[-.035em] sm:text-6xl lg:mx-0 lg:text-[4.55rem]">{pagesContent.contact.title}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-2xl leading-8 text-[var(--slot4-muted-text)] lg:mx-0">{pagesContent.contact.description}</p>
            </div>
            <aside className="border-t border-[var(--editorial-rule)] pt-2">
              {desks.map((desk, index) => (
                <div key={desk.title} className="grid grid-cols-[1fr_auto] gap-5 border-b border-[var(--editorial-rule)] py-6">
                  <div>
                    <h2 className="editorial-serif text-2xl leading-tight">{desk.title}</h2>
                    <p className="mt-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{desk.body}</p>
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[.16em] text-[var(--slot4-accent)]">0{index + 1}</span>
                </div>
              ))}
            </aside>
          </div>
        </section>

        <section className="bg-[var(--slot4-page-bg)]">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[300px_minmax(0,1fr)] lg:px-8 lg:py-20">
          <aside className="border-t border-[var(--editorial-rule)] pt-6">
            {desks.map((desk, index) => (
              <div key={desk.title} className="border-b border-[var(--editorial-rule)] py-6 last:border-b-0">
                <div className="flex items-center justify-between"><desk.icon className="h-5 w-5 text-[var(--slot4-accent)]" /><span className="text-xs font-black text-black/40">0{index + 1}</span></div>
                <h2 className="editorial-serif mt-5 text-3xl leading-tight">{desk.title}</h2>
              </div>
            ))}
          </aside>
          <div className="bg-white p-6 sm:p-10 lg:p-14">
            <p className="editorial-kicker text-[var(--slot4-accent)]">Send a message</p>
            <h2 className="editorial-serif mt-3 text-4xl">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
