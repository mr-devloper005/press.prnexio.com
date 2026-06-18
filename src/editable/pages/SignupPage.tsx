import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[#111]">
        <section className="mx-1 bg-white sm:mx-4">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8 lg:py-24">
            <div className="text-center lg:text-left">
              <p className="editorial-kicker text-xl text-[var(--slot4-accent)]">{pagesContent.auth.signup.badge}</p>
              <h1 className="editorial-serif mx-auto mt-5 max-w-4xl text-5xl leading-[1.04] tracking-[-.035em] sm:text-6xl lg:mx-0 lg:text-[4.55rem]">{pagesContent.auth.signup.title}</h1>
              <p className="mx-auto mt-5 max-w-2xl text-2xl leading-8 text-[var(--slot4-muted-text)] lg:mx-0">{pagesContent.auth.signup.description}</p>
            </div>
            <aside className="hidden border-l border-[var(--editorial-rule)] pl-8 lg:block">
              <p className="editorial-serif text-3xl leading-tight">Save details, submit content, and keep publishing from one account.</p>
              <Link href="/login" className="fa-link-underline mt-8 inline-flex font-bold">{pagesContent.auth.signup.loginCta}</Link>
            </aside>
          </div>
        </section>

        <section className="bg-[var(--slot4-page-bg)]">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:px-8 lg:py-20">
            <div className="bg-white p-7 sm:p-12 lg:p-16">
              <p className="editorial-kicker text-[var(--slot4-accent)]">Create account</p>
              <h1 className="editorial-serif mt-3 text-4xl">{pagesContent.auth.signup.formTitle}</h1>
              <EditableLocalSignupForm />
              <p className="mt-5 border-t border-[var(--editorial-rule)] pt-5 text-sm text-black/65">Already have an account? <Link href="/login" className="font-black text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
            </div>
            <aside className="border-t border-[var(--editorial-rule)] pt-6">
              <p className="editorial-kicker">Access</p>
              <h2 className="editorial-serif mt-4 text-3xl leading-tight">A magazine-style account page with the publishing tools close at hand.</h2>
            </aside>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
