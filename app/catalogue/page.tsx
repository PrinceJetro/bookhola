'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  FlaskConical,
  Menu,
  MessageCircle,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShoppingBasket,
  X,
  Phone,
  Armchair,
} from 'lucide-react'

const whatsappNumber = '2349069372983'
const phoneNumber = '09069372983'

const categories = [
  {
    title: 'Laboratory equipment',
    text: 'Equip your science lab with confidence.',
    icon: FlaskConical,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85',
    highlights: ['Chemistry & Biology', 'Physics', 'General lab supplies'],
    href: '/catalogue/lab',
  },
  {
    title: 'School furniture',
    text: 'Practical, comfortable spaces for learning.',
    icon: Armchair,
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=85',
    highlights: ['Classroom desks & chairs', 'Teacher tables', 'Library shelves'],
    href: '/catalogue/furniture',
  },
  {
    title: 'Textbooks',
    text: 'The right books for every class and level.',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=85',
    highlights: ['Nursery & Primary', 'Junior Secondary', 'Senior Secondary'],
    href: '/catalogue/textbooks',
  },
  {
    title: 'Bags & stationery',
    text: 'Everyday school essentials, sourced simply.',
    icon: ShoppingBasket,
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=85',
    highlights: ['School bags', 'Notebooks', 'Pens & pencils'],
    href: '/catalogue/stationery',
  },
]

export default function CataloguePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quoteItems, setQuoteItems] = useState<string[]>([])
  const [announcement, setAnnouncement] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const saved = window.localStorage.getItem('bookhola-quote-items')
    if (saved) setQuoteItems(JSON.parse(saved))
  }, [])

  useEffect(() => {
    window.localStorage.setItem('bookhola-quote-items', JSON.stringify(quoteItems))
  }, [quoteItems])

  const itemCount = quoteItems.length
  const quoteText = useMemo(() => quoteItems.map((item) => `• ${item}`).join('\n'), [quoteItems])

  function addToQuote(name: string) {
    if (!quoteItems.includes(name)) setQuoteItems([...quoteItems, name])
  }

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
          <p className="eyebrow">Our catalogue</p>
          <h1>Everything your school needs.</h1>
          <p>Browse laboratory equipment, school furniture, textbooks, and stationery. Add items to your quote and we'll respond with pricing and availability.</p>
        </section>

        <section className="section-wrap">
          <div className="catalogue-search">
            <Search size={17} />
            <input
              type="text"
              placeholder="Search all products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
          </div>
        </section>

        <section className="section-wrap catalogue-grid">
          {categories.map(({ title, text, icon: Icon, image, highlights, href }) => (
            <a className="catalogue-category-card" href={href} key={title}>
              <div className="catalogue-category-image">
                <img src={image} alt="" />
                <span className="catalogue-category-icon"><Icon size={20} /></span>
              </div>
              <div className="catalogue-category-body">
                <h3>{title}</h3>
                <p>{text}</p>
                <ul className="catalogue-highlights">
                  {highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <span className="text-link">View category <ChevronRight size={15} /></span>
              </div>
            </a>
          ))}
        </section>

        <section className="catalogue-cta section-wrap">
          <div>
            <p className="eyebrow">Can't find what you need?</p>
            <h2>We source hard-to-find items too.</h2>
            <p>Send us your school list and we'll help you find everything.</p>
          </div>
          <button className="button primary" onClick={() => openWhatsApp('Hello Bookhola Hub, I have a school list and would like to request a quote.')}>
            Send on WhatsApp <MessageCircle size={18} />
          </button>
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
