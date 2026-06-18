'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, Search, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const primaryLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Distribution', href: '/media-distribution' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-[var(--slot4-page-bg)] text-black">
      <div className="mx-1 bg-white shadow-[0_1px_0_rgba(0,0,0,.08)] sm:mx-4">
        <div className="mx-auto grid min-h-[120px] max-w-[1880px] grid-cols-[1fr_auto_1fr] items-center px-4 sm:px-8 lg:px-12">
          <nav className="hidden items-center gap-6 text-[13px] font-black uppercase tracking-[.22em] lg:flex">
            {primaryLinks.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </nav>

          <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-10 w-10 items-center justify-center lg:hidden" aria-label="Toggle navigation">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <Link href="/" className="editorial-brand max-w-[58vw] text-center text-4xl text-black sm:text-5xl">
          {SITE_CONFIG.name}
          </Link>

          <div className="flex items-center justify-end gap-4 text-[13px] font-black uppercase tracking-[.18em]">
            <Link href="/login" className="hidden lg:block">Login</Link>
            <Link href="/signup" className="hidden text-[var(--slot4-accent)] lg:block">Sign Up</Link>
            <Link href="/search" className="inline-flex items-center gap-1" aria-label="Search">
              <span className="hidden sm:inline">Search</span><Search className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="border-t border-[var(--editorial-rule)] bg-[var(--slot4-page-bg)] lg:hidden">
          <form action="/search" className="mx-auto flex max-w-[720px] items-center px-4">
            <Search className="h-4 w-4 text-black/50" />
            <input name="q" type="search" placeholder="Search the archive" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-black/45" />
          </form>
        </div>
      </div>

      {open ? (
        <div className="mx-1 border-t border-[var(--editorial-rule)] bg-white px-4 py-5 shadow-xl sm:mx-4">
          <div className="mx-auto grid max-w-[1180px] gap-px bg-[var(--editorial-rule)] sm:grid-cols-2 lg:grid-cols-4">
            {[...primaryLinks, { label: 'Login', href: '/login' }, { label: 'Sign Up', href: '/signup' }, { label: 'Search', href: '/search' }].map((item) => (
              <Link key={`${item.label}-${item.href}`} href={item.href} onClick={() => setOpen(false)} className="bg-white px-4 py-3 text-sm font-black uppercase tracking-[.14em] hover:text-[var(--slot4-accent)]">{item.label}</Link>
            ))}
          </div>
          <form action="/search" className="mx-auto mt-5 flex max-w-[1180px] border border-black bg-white">
            <Search className="ml-4 mt-4 h-4 w-4" />
            <input name="q" type="search" placeholder="Search topics, releases, and reports" className="min-w-0 flex-1 px-3 py-3 text-sm outline-none" />
            <button className="bg-black px-5 text-xs font-black uppercase tracking-[.14em] text-white">Search</button>
          </form>
        </div>
      ) : null}
    </header>
  )
}
