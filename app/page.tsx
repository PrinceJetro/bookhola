'use client'

import { useEffect, useMemo, useState, useRef } from 'react'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Clock3,
  FlaskConical,
  Menu,
  MessageCircle,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBasket,
  Sparkles,
  Truck,
  X,
  Phone,
  GraduationCap,
  Armchair,
} from 'lucide-react'

const whatsappNumber = '2349069372983'
const phoneNumber = '09069372983'

const categories = [
  { title: 'Laboratory equipment', text: 'Equip your science lab with confidence.', icon: FlaskConical, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=85', href: '/catalogue/lab' },
  { title: 'School furniture', text: 'Practical, comfortable spaces for learning.', icon: Armchair, image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=800&q=85', href: '/catalogue/furniture' },
  { title: 'Textbooks', text: 'The right books for every class and level.', icon: BookOpen, image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=85', href: '/catalogue/textbooks' },
  { title: 'Bags & stationery', text: 'Everyday school essentials, sourced simply.', icon: ShoppingBasket, image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=800&q=85', href: '/catalogue/stationery' },
]

const products = [
  { name: 'Compound microscope', spec: '1000x magnification · LED illumination', category: 'Laboratory', image: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=700&q=85' },
  { name: 'Burette with retort stand', spec: 'Complete titration set for school labs', category: 'Laboratory', image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=700&q=85' },
  { name: 'Classroom desks & chairs', spec: 'Durable sets for pupils aged 6–12', category: 'Furniture', image: 'https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=700&q=85' },
  { name: 'Teacher table & office chair', spec: 'A considered setup for every classroom', category: 'Furniture', image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=700&q=85' },
  { name: 'Bunsen burner', spec: 'Brass body with adjustable flame', category: 'Laboratory', image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=700&q=85' },
  { name: 'Library bookshelves', spec: 'Sturdy storage for growing collections', category: 'Furniture', image: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=700&q=85' },
]

const trustPoints = [
  { icon: ShieldCheck, title: 'Quality assured', text: 'Products selected for real school use.' },
  { icon: Sparkles, title: 'Competitive pricing', text: 'Clear quotes that respect your budget.' },
  { icon: Truck, title: 'Timely delivery', text: 'We get your supplies where they need to be.' },
  { icon: Clock3, title: 'Reliable support', text: 'A responsive partner before and after delivery.' },
]

export default function Page() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quoteItems, setQuoteItems] = useState<string[]>([])
  const [announcement, setAnnouncement] = useState(true)

  const heroRef = useRef<HTMLElement>(null)
  const categoriesRef = useRef<HTMLElement>(null)
  const trustRef = useRef<HTMLElement>(null)
  const productsRef = useRef<HTMLElement>(null)
  const stepsRef = useRef<HTMLElement>(null)
  const listBannerRef = useRef<HTMLElement>(null)
  const mdRef = useRef<HTMLElement>(null)
  const ctaRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const refs = [heroRef, categoriesRef, trustRef, productsRef, stepsRef, listBannerRef, mdRef, ctaRef]
    refs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current)
    })

    return () => observer.disconnect()
  }, [])

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
          <a href="/catalogue" onClick={() => setMenuOpen(false)}>Catalogue</a><a href="#why-us" onClick={() => setMenuOpen(false)}>Why us</a><a href="/about" onClick={() => setMenuOpen(false)}>About</a><a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <button className="nav-quote mobile-only" onClick={() => { setQuoteOpen(true); setMenuOpen(false) }}>Request a quote <ArrowRight size={16} /></button>
        </nav>
        <button className="nav-quote desktop-only" onClick={() => setQuoteOpen(true)}>Request a quote <ArrowRight size={16} /></button>
        <button className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main id="top">
        <section ref={heroRef} className="hero section-wrap animate-on-scroll">
          <div className="hero-copy"><p className="eyebrow">Your school supply partner</p><h1>Everything your school needs, <em>from one supplier.</em></h1><p className="hero-lede">Textbooks, laboratory equipment, school furniture, bags and stationery. Reliable sourcing, competitive pricing, timely delivery.</p><div className="hero-actions"><button className="button primary" onClick={() => setQuoteOpen(true)}>Request a quote <ArrowRight size={18} /></button><button className="button secondary" onClick={() => openWhatsApp()}> <MessageCircle size={18} /> Chat on WhatsApp</button></div><p className="trust-line"><span className="trust-dot"><Check size={12} /></span> A dependable partner for schools across Lagos and Nigeria</p></div>
          <div className="hero-visual" aria-label="School supplies collage"><div className="hero-watermark">BH</div><div className="photo photo-main"><img src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=900&q=85" alt="Laboratory glassware" /></div><div className="photo photo-small one"><img src="https://images.unsplash.com/photo-1560785496-3c9d27877182?auto=format&fit=crop&w=500&q=85" alt="School desks" /></div><div className="photo photo-small two"><img src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=500&q=85" alt="Compound microscope" /></div><div className="hero-note"><span className="note-icon"><PackageCheck size={17} /></span><span><b>School-ready supplies</b><small>For every stage of learning</small></span></div></div>
        </section>

        <section ref={categoriesRef} className="section-wrap categories animate-on-scroll" id="catalogue"><div className="section-heading"><div><p className="eyebrow">Explore our catalogue</p><h2>Built around the way schools buy.</h2></div><a className="text-link" href="/catalogue">View all products <ArrowRight size={16} /></a></div><div className="category-grid">{categories.map(({ title, text, icon: Icon, image, href }) => <a className="category-card" href={href} key={title}><div className="category-image"><img src={image} alt="" /><span className="category-icon"><Icon size={20} /></span></div><div className="category-body"><h3>{title}</h3><p>{text}</p><span className="text-link">View items <ChevronRight size={15} /></span></div></a>)}</div></section>

        <section ref={trustRef} className="trust-section animate-on-scroll" id="why-us"><div className="section-wrap"><div className="trust-intro"><p className="eyebrow light">Why schools choose us</p><h2>A practical partner for <em>better learning.</em></h2><p>From your first list to final delivery, Bookhola Hub makes school procurement feel simpler, clearer and more dependable.</p></div><div className="trust-grid">{trustPoints.map(({ icon: Icon, title, text }) => <div className="trust-card" key={title}><Icon size={25} /><h3>{title}</h3><p>{text}</p></div>)}</div></div></section>

        <section ref={productsRef} className="section-wrap products-section animate-on-scroll" id="products"><div className="section-heading"><div><p className="eyebrow">Popular picks</p><h2>Start with what you need.</h2></div><div className="product-search"><Search size={17} /><input aria-label="Search products" placeholder="Search products" /></div></div><div className="product-grid">{products.map((product) => <article className="product-card" key={product.name}><div className="product-image"><img src={product.image} alt={product.name} /><span>{product.category}</span></div><div className="product-body"><h3>{product.name}</h3><p>{product.spec}</p><button className={quoteItems.includes(product.name) ? 'added-button' : 'add-button'} onClick={() => addToQuote(product.name)}>{quoteItems.includes(product.name) ? <><Check size={16} /> Added</> : <><Plus size={16} /> Add to quote</>}</button></div></article>)}</div></section>

        <section ref={stepsRef} className="steps-section animate-on-scroll"><div className="section-wrap"><div className="section-heading centered"><div><p className="eyebrow">How it works</p><h2>Simple from list to delivery.</h2></div></div><div className="steps-grid">{['Tell us what you need', 'Get a clear quote', 'Confirm your order', 'We deliver to you'].map((step, i) => <div className="step" key={step}><span>0{i + 1}</span><h3>{step}</h3><p>{['Browse our catalogue or send your school list.', 'We reply with pricing and availability.', 'Approve the details and make payment.', 'Your supplies arrive ready for the classroom.'][i]}</p>{i < 3 && <ArrowRight className="step-arrow" size={20} />}</div>)}</div></div></section>

        <section ref={listBannerRef} className="list-banner section-wrap animate-on-scroll"><div><p className="eyebrow">Have a long list?</p><h2>Send your school list. We&apos;ll do the sourcing.</h2><p>Share your booklist, lab requirements or furniture plan and we&apos;ll come back with a tailored quote.</p></div><button className="button primary" onClick={() => openWhatsApp('Hello Bookhola Hub, I have a school list and would like to request a quote.')}>Send on WhatsApp <MessageCircle size={18} /></button></section>

        <section ref={mdRef} className="md-section section-wrap animate-on-scroll" id="about"><div className="md-photo"><img src="/mr banjo.jpeg" alt="School procurement partner" /><span>Banjo Babalola<br /><small>Managing Director</small></span></div><div className="md-copy"><p className="eyebrow">A note from our MD</p><blockquote>“We are committed to making quality learning materials accessible and affordable for every child, while giving schools a partner they can count on.”</blockquote><p>At Bookhola Hub, we believe that well-equipped schools create confident learners. That belief guides every product we source and every school we serve.</p><a className="text-link" href="#contact">Learn more about us <ArrowRight size={16} /></a></div></section>

        <section ref={ctaRef} className="final-cta animate-on-scroll" id="contact"><div className="section-wrap"><div><p className="eyebrow light">Let&apos;s get your school ready</p><h2>Ready to equip your school?</h2><p>Tell us what you need and we&apos;ll help you find the right fit.</p></div><div className="cta-actions"><button className="button primary" onClick={() => setQuoteOpen(true)}>Request a quote <ArrowRight size={18} /></button><a className="button light-button" href={`tel:${phoneNumber}`}><Phone size={17} /> Call {phoneNumber}</a></div></div></section>
      </main>

      <footer className="site-footer"><div className="section-wrap footer-grid"><div><a className="brand footer-brand" href="/"><img src="/logo.jpeg" alt="Bookhola Hub logo" className="brand-logo" /></a><p>Everything your school needs, from one supplier.</p></div><div><h4>Catalogue</h4><a href="/catalogue/lab">Laboratory equipment</a><a href="/catalogue/furniture">School furniture</a><a href="/catalogue/textbooks">Textbooks</a></div><div><h4>Company</h4><a href="/about">About us</a><a href="/contact">Contact</a><a href="/privacy">Privacy policy</a></div><div><h4>Talk to us</h4><a href={`tel:${phoneNumber}`}>{phoneNumber}</a><a href={`mailto:bookhola@gmail.com`}>bookhola@gmail.com</a><span>7 Oludare Odekoya Street,<br />Agric, Ikorodu, Lagos</span></div></div><div className="footer-bottom section-wrap"><span>© 2026 Bookhola Hub. All rights reserved.</span><span>Made for schools in Nigeria.</span></div></footer>

      <button className="floating-whatsapp" aria-label="Chat on WhatsApp" onClick={() => openWhatsApp()}><MessageCircle size={24} /></button><div className="mobile-bar"><a href={`tel:${phoneNumber}`}><Phone size={18} />Call</a><button onClick={() => openWhatsApp()}><MessageCircle size={18} />WhatsApp</button><button onClick={() => setQuoteOpen(true)}><ShoppingBasket size={18} />Quote{itemCount > 0 && <b>{itemCount}</b>}</button></div>

      {quoteOpen && <div className="drawer-overlay" onClick={() => setQuoteOpen(false)}><aside className="quote-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">Your selection</p><h2>Request a quote</h2></div><button className="close-button" onClick={() => setQuoteOpen(false)} aria-label="Close quote drawer"><X /></button></div>{quoteItems.length === 0 ? <div className="empty-quote"><ShoppingBasket size={36} /><h3>Your quote is empty</h3><p>Add products from the catalogue and they&apos;ll appear here.</p></div> : <div className="selected-items">{quoteItems.map((item) => <div className="selected-item" key={item}><span>{item}</span><div><button aria-label={`Decrease ${item}`}><Minus size={14} /></button><b>1</b><button aria-label={`Increase ${item}`}><Plus size={14} /></button><button className="remove" onClick={() => removeFromQuote(item)} aria-label={`Remove ${item}`}><X size={15} /></button></div></div>)}</div>}<div className="drawer-footer"><p>We&apos;ll reply with pricing and availability.</p><button className="button primary full" onClick={() => openWhatsApp(`Hello Bookhola Hub, I would like a quote for:\n${quoteText}`)}>Send request on WhatsApp <MessageCircle size={18} /></button><button className="button secondary full" onClick={() => { setQuoteOpen(false); window.location.href = '/contact' }}>I&apos;d rather speak to someone <Phone size={17} /></button></div></aside></div>}
    </div>
  )
}
