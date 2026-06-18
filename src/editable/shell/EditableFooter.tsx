'use client'

import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'

export function EditableFooter() {
  const year = new Date().getFullYear()
  const footerLinks: Array<[string, string]> = [
    ['Home', '/'],
    ['About', '/about'],
    ['Contact', '/contact'],
    ['Distribution', '/media-distribution'],
    ['Login', '/login'],
  
    
  ]

  return (
    <footer className="mx-1 bg-[#202020] text-white sm:mx-4">
      <div className="mx-auto max-w-[1280px] px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.25fr_1.5fr]">
          <div>
            <Link href="/" className="editorial-brand text-5xl text-white sm:text-6xl">{SITE_CONFIG.name}</Link>
            <p className="mt-8 max-w-sm text-sm leading-7 text-[#9eb0c4]">{globalContent.footer?.description || SITE_CONFIG.description}</p>
            <p className="mt-5 text-sm text-[#9eb0c4]">(c) {year}. All Rights Reserved.</p>
          </div>
          <div>
            <h3 className="text-sm font-black">Navigation</h3>
            <FooterLinks links={footerLinks} />
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1280px] gap-8 border-t border-white/20 px-4 py-8 text-sm font-bold sm:px-6 lg:grid-cols-[1fr_1fr_1fr] lg:px-8">
        {footerLinks.map(([label, href]) => (
          <Link key={`bottom-${label}-${href}`} href={href} className="hover:text-[var(--slot4-accent)]">{label}</Link>
        ))}
      </div>
    </footer>
  )
}

function FooterLinks({ links }: { links: Array<[string, string]> }) {
  return (
    <div className="mt-5 grid gap-3">
      {links.map(([label, href]) => (
        <Link key={`${label}-${href}`} href={href} className="text-sm font-bold hover:text-[var(--slot4-accent)]">{label}</Link>
      ))}
    </div>
  )
}
