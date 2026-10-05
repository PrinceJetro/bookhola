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
  Beaker,
  Atom,
} from 'lucide-react'

const whatsappNumber = '2349069372983'
const phoneNumber = '09069372983'

const subcategories = [
  { id: 'chemistry-biology', name: 'Chemistry & Biology', icon: Beaker },
  { id: 'physics', name: 'Physics', icon: Atom },
  { id: 'general', name: 'General', icon: FlaskConical },
]

const products = [
  { name: 'Compound microscope', spec: '1000x magnification · LED illumination', subcategory: 'chemistry-biology', image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=700&q=85' },
  { name: 'Beakers (set of 6)', spec: 'Borosilicate glass · Various sizes', subcategory: 'chemistry-biology', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=700&q=85' },
  { name: 'Conical flasks', spec: 'Erlenmeyer flasks · 250ml-1000ml', subcategory: 'chemistry-biology', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85' },
  { name: 'Test tube rack', spec: 'Wooden or plastic · Holds 12 tubes', subcategory: 'chemistry-biology', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=700&q=85' },
  { name: 'Measuring cylinders', spec: 'Graduated · 10ml-1000ml', subcategory: 'chemistry-biology', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85' },
  { name: 'Bunsen burner', spec: 'Brass body · Adjustable flame', subcategory: 'chemistry-biology', image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=700&q=85' },
  { name: 'Human skeleton model', spec: 'Life-size · Detailed anatomy', subcategory: 'chemistry-biology', image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=700&q=85' },
  { name: 'Petri dishes', spec: 'Sterile plastic · 90mm diameter', subcategory: 'chemistry-biology', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85' },
  { name: 'Meter rule', spec: 'Steel · 1 meter length', subcategory: 'physics', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85' },
  { name: 'Vernier caliper', spec: 'Stainless steel · 0.05mm precision', subcategory: 'physics', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85' },
  { name: 'Ammeter', spec: 'DC analog · 0-5A range', subcategory: 'physics', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85' },
  { name: 'Voltmeter', spec: 'DC analog · 0-15V range', subcategory: 'physics', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85' },
  { name: 'Retort stand', spec: 'Cast iron base · Adjustable rod', subcategory: 'physics', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=700&q=85' },
  { name: 'Pendulum bob', spec: 'Brass · Threaded hook', subcategory: 'physics', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85' },
  { name: 'Bar magnets', spec: 'Pair · Aluminum coated', subcategory: 'physics', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=700&q=85' },
  { name: 'Burette with retort stand', spec: 'Complete titration set', subcategory: 'general', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=700&q=85' },
]

export default function LabPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quoteItems, setQuoteItems] = useState<string[]>([])
  const [announcement, setAnnouncement] = useState(true)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
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

  const filteredProducts = products.filter((product) => {
    const matchesSubcategory = !selectedSubcategory || product.subcategory === selectedSubcategory
    const matchesSearch = !searchQuery || product.name.toLowerCase().includes(searchQuery.toLowerCase()) || product.spec.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSubcategory && matchesSearch
  })

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
        <nav className="breadcrumb section-wrap">
          <a href="/">Home</a> <ChevronRight size={14} /> <a href="/catalogue">Catalogue</a> <ChevronRight size={14} /> <span>Laboratory Equipment</span>
        </nav>

        <section className="page-header section-wrap">
          <p className="eyebrow">Laboratory Equipment</p>
          <h1>We supply complete school labs.</h1>
          <p>From basic glassware to advanced measuring instruments. Everything your science department needs for practical lessons.</p>
        </section>

        <section className="section-wrap">
          <div className="category-toolbar">
            <div className="filter-chips">
              <button className={!selectedSubcategory ? 'chip active' : 'chip'} onClick={() => setSelectedSubcategory(null)}>All</button>
              {subcategories.map(({ id, name, icon: Icon }) => (
                <button key={id} className={selectedSubcategory === id ? 'chip active' : 'chip'} onClick={() => setSelectedSubcategory(id)}>
                  <Icon size={14} /> {name}
                </button>
              ))}
            </div>
            <div className="product-search">
              <Search size={17} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
              />
            </div>
          </div>
        </section>

        <section className="section-wrap">
          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.name}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  <span>{subcategories.find(sc => sc.id === product.subcategory)?.name}</span>
                </div>
                <div className="product-body">
                  <h3>{product.name}</h3>
                  <p>{product.spec}</p>
                  <button className={quoteItems.includes(product.name) ? 'added-button' : 'add-button'} onClick={() => addToQuote(product.name)}>
                    {quoteItems.includes(product.name) ? <><Check size={16} /> Added</> : <><Plus size={16} /> Add to quote</>}
                  </button>
                </div>
              </article>
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="no-results">
              <FlaskConical size={48} />
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms.</p>
            </div>
          )}
        </section>

        <section className="category-cta section-wrap">
          <div>
            <p className="eyebrow">Can't find it?</p>
            <h2>We source hard-to-find lab equipment too.</h2>
            <p>Contact us with your specific requirements and we'll help you find what you need.</p>
          </div>
          <button className="button primary" onClick={() => openWhatsApp('Hello Bookhola Hub, I have a specific lab equipment request.')}>
            Ask us on WhatsApp <MessageCircle size={18} />
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
