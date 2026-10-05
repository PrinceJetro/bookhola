'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Menu,
  MessageCircle,
  Minus,
  PackageCheck,
  Plus,
  ShoppingBasket,
  X,
  Phone,
  Armchair,
  Heart,
  Target,
  Shield,
  Users,
} from 'lucide-react'

const whatsappNumber = '2349069372983'
const phoneNumber = '09069372983'

const values = [
  { icon: Shield, title: 'Integrity', text: 'We build trust through honest pricing and reliable delivery.' },
  { icon: PackageCheck, title: 'Quality', text: 'Every product we source meets the standards Nigerian schools expect.' },
  { icon: Heart, title: 'Affordability', text: 'Competitive pricing that respects school budgets.' },
  { icon: Users, title: 'Service', text: 'A responsive partner before, during, and after delivery.' },
]

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quoteItems, setQuoteItems] = useState<string[]>([])
  const [announcement, setAnnouncement] = useState(true)

  useEffect(() => {
    const saved = window.localStorage.getItem('bookhola-quote-items')
    if (saved) setQuoteItems(JSON.parse(saved))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('bookhola-quote-items', JSON.stringify(quoteItems))
  }, [quoteItems])

  const itemCount = quoteItems.length
  const quoteText = useMemo(() => quoteItems.map((item) => `• ${item}`).join('\n'), [quoteItems])

  function removeFromQuote(name: string) {
    setQuoteItems(quoteItems.filter((item) => item !== name))
  }

  function openWhatsApp(message = 'Hello Bookhola Hub, I would like to request a quote for my school.') {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="site-shell">
      {announcement && <div className="announcement">Supplying schools across Nigeria. <button onClick={() => setAnnouncement(false)}>Request a free quote today <ArrowRight size={14} /></button><button className="dismiss" aria-label="Dismiss announcement" onClick={() => setAnnouncement(false)}><X size={16} /></button></div>}
      <header className="site-header">
        <a className="brand" href="/" aria-label="Bookhola Hub home"><img src="/logo.jpeg" alt="Bookhola Hub logo" className="brand-logo" /></a>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          <a href="/catalogue" onClick={() => setMenuOpen(false)}>Catalogue</a><a href="/about" onClick={() => setMenuOpen(false)}>About</a><a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <button className="nav-quote mobile-only" onClick={() => { setQuoteOpen(true); setMenuOpen(false) }}>Request a quote <ArrowRight size={16} /></button>
        </nav>
        <button className="nav-quote desktop-only" onClick={() => setQuoteOpen(true)}>Request a quote <ArrowRight size={16} /></button>
        <button className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="page-header section-wrap">
          <p className="eyebrow">About us</p>
          <h1>Your trusted school supply partner.</h1>
          <p>We make quality learning materials accessible and affordable for every child in Nigeria.</p>
        </section>

        <section className="section-wrap about-intro">
          <div className="about-content">
            <h2>Who we are</h2>
            <p>Bookhola Hub is a Nigerian school supplies company dedicated to serving schools across Lagos and beyond. We understand the challenges school administrators face when sourcing learning materials—limited options, unreliable suppliers, and unpredictable pricing.</p>
            <p>That's why we've built a simpler way: one trusted partner for textbooks, laboratory equipment, school furniture, and stationery. We source quality products, offer competitive pricing, and deliver on time.</p>
          </div>
        </section>

        <section className="mission-vision">
          <div className="section-wrap">
            <div className="mv-grid">
              <div className="mv-card">
                <div className="mv-icon"><Target size={32} /></div>
                <h3>Our mission</h3>
                <p>To make learning materials accessible and affordable for every child.</p>
              </div>
              <div className="mv-card">
                <div className="mv-icon"><BookOpen size={32} /></div>
                <h3>Our vision</h3>
                <p>To become Nigeria's most trusted school supplies partner.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap">
          <div className="section-heading centered">
            <div>
              <p className="eyebrow">Our values</p>
              <h2>What guides everything we do.</h2>
            </div>
          </div>
          <div className="values-grid">
            {values.map(({ icon: Icon, title, text }) => (
              <div className="value-card" key={title}>
                <Icon size={28} />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="md-section section-wrap">
          <div className="md-photo">
            <img src="/mr banjo.jpeg" alt="Banjo Babalola, Managing Director" />
            <span>Banjo Babalola<br /><small>Managing Director</small></span>
          </div>
          <div className="md-copy">
            <p className="eyebrow">A note from our MD</p>
            <blockquote>“We are committed to making quality learning materials accessible and affordable for every child, while giving schools a partner they can count on.”</blockquote>
            <p>At Bookhola Hub, we believe that well-equipped schools create confident learners. That belief guides every product we source and every school we serve.</p>
            <p>When you work with us, you're not just buying supplies—you're building a relationship with a team that understands Nigerian schools and cares about your success.</p>
          </div>
        </section>

        <section className="final-cta">
          <div className="section-wrap">
            <div>
              <p className="eyebrow light">Let's work together</p>
              <h2>Ready to equip your school?</h2>
              <p>Get in touch and let's discuss how we can support your school's needs.</p>
            </div>
            <div className="cta-actions">
              <button className="button primary" onClick={() => window.location.href = '/quote'}>Request a quote <ArrowRight size={18} /></button>
              <a className="button light-button" href={`tel:${phoneNumber}`}><Phone size={17} /> Call {phoneNumber}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-wrap footer-grid">
          <div>
            <a className="brand footer-brand" href="/"><img src="/logo.jpeg" alt="Bookhola Hub logo" className="brand-logo" /></a>
            <p>Everything your school needs, from one supplier.</p>
          </div>
          <div>
            <h4>Catalogue</h4>
            <a href="/catalogue/lab">Laboratory equipment</a>
            <a href="/catalogue/furniture">School furniture</a>
            <a href="/catalogue/textbooks">Textbooks</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="/about">About us</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy policy</a>
          </div>
          <div>
            <h4>Talk to us</h4>
            <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
            <a href="mailto:bookhola@gmail.com">bookhola@gmail.com</a>
            <span>7 Oludare Odekoya Street,<br />Agric, Ikorodu, Lagos</span>
          </div>
        </div>
        <div className="footer-bottom section-wrap">
          <span>© 2026 Bookhola Hub. All rights reserved.</span>
          <span>Made for schools in Nigeria.</span>
        </div>
      </footer>

      <button className="floating-whatsapp" aria-label="Chat on WhatsApp" onClick={() => openWhatsApp()}><MessageCircle size={24} /></button>
      <div className="mobile-bar">
        <a href={`tel:${phoneNumber}`}><Phone size={18} />Call</a>
        <button onClick={() => openWhatsApp()}><MessageCircle size={18} />WhatsApp</button>
        <button onClick={() => setQuoteOpen(true)}><ShoppingBasket size={18} />Quote{itemCount > 0 && <b>{itemCount}</b>}</button>
      </div>

      {quoteOpen && <div className="drawer-overlay" onClick={() => setQuoteOpen(false)}><aside className="quote-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">Your selection</p><h2>Request a quote</h2></div><button className="close-button" onClick={() => setQuoteOpen(false)} aria-label="Close quote drawer"><X /></button></div>{quoteItems.length === 0 ? <div className="empty-quote"><ShoppingBasket size={36} /><h3>Your quote is empty</h3><p>Add products from the catalogue and they&apos;ll appear here.</p></div> : <div className="selected-items">{quoteItems.map((item) => <div className="selected-item" key={item}><span>{item}</span><div><button aria-label={`Decrease ${item}`}><Minus size={14} /></button><b>1</b><button aria-label={`Increase ${item}`}><Plus size={14} /></button><button className="remove" onClick={() => removeFromQuote(item)} aria-label={`Remove ${item}`}><X size={15} /></button></div></div>)}</div>}<div className="drawer-footer"><p>We&apos;ll reply with pricing and availability.</p><button className="button primary full" onClick={() => openWhatsApp(`Hello Bookhola Hub, I would like a quote for:\n${quoteText}`)}>Send request on WhatsApp <MessageCircle size={18} /></button><button className="button secondary full" onClick={() => { setQuoteOpen(false); window.location.href = '/contact' }}>I&apos;d rather speak to someone <Phone size={17} /></button></div></aside></div>}
    </div>
  )
}
