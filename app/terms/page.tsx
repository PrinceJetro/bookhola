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
  Phone,
  ShoppingBasket,
  X,
} from 'lucide-react'

const whatsappNumber = '2349069372983'
const phoneNumber = '09069372983'
const email = 'bookhola@gmail.com'

export default function TermsPage() {
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
          <p className="eyebrow">Legal</p>
          <h1>Terms of Service</h1>
          <p>Last updated: January 2026</p>
        </section>

        <section className="section-wrap legal-content">
          <div className="legal-text">
            <h2>Introduction</h2>
            <p>These terms of service govern your use of the Bookhola Hub website and our services. By using our website or requesting a quote, you agree to these terms.</p>

            <h2>Quote requests</h2>
            <p>When you submit a quote request through our website:</p>
            <ul>
              <li>We will respond with pricing and availability within one business day</li>
              <li>Quotes are valid for 14 days from the date of issue</li>
              <li>Prices are subject to change based on market conditions and availability</li>
              <li>Quotes do not constitute a binding contract until payment is confirmed</li>
            </ul>

            <h2>Orders and payment</h2>
            <p>Once you confirm an order:</p>
            <ul>
              <li>Payment terms will be agreed upon before order processing</li>
              <li>We accept bank transfers and other agreed payment methods</li>
              <li>Orders are processed only after payment confirmation</li>
              <li>Delivery timelines will be communicated based on product availability</li>
            </ul>

            <h2>Delivery</h2>
            <p>Our delivery policy:</p>
            <ul>
              <li>We deliver to schools across Lagos and Nigeria</li>
              <li>Delivery fees are calculated based on location and order size</li>
              <li>We aim to deliver within agreed timelines, but delays may occur due to factors beyond our control</li>
              <li>You will be notified when your order is dispatched</li>
              <li>Someone must be available to receive the delivery at the specified address</li>
            </ul>

            <h2>Returns and refunds</h2>
            <p>Our return policy:</p>
            <ul>
              <li>Defective or damaged items may be returned within 7 days of delivery</li>
              <li>Please inspect items upon delivery and report any issues immediately</li>
              <li>Custom or special-order items may not be returnable unless defective</li>
              <li>Refunds will be processed within 14 days of approved returns</li>
            </ul>

            <h2>Product information</h2>
            <p>We strive to provide accurate product information, but:</p>
            <ul>
              <li>Product images are for illustration purposes and may vary slightly from actual items</li>
              <li>Specifications are subject to change by manufacturers</li>
              <li>We will inform you of any significant changes before order confirmation</li>
            </ul>

            <h2>Limitation of liability</h2>
            <p>To the fullest extent permitted by law:</p>
            <ul>
              <li>We are not liable for indirect or consequential damages</li>
              <li>Our liability is limited to the purchase price of the products</li>
              <li>We are not responsible for delays caused by third parties or force majeure events</li>
            </ul>

            <h2>Contact us</h2>
            <p>If you have questions about these terms, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> {email}</li>
              <li><strong>Phone:</strong> {phoneNumber}</li>
              <li><strong>Address:</strong> 7 Oludare Odekoya Street, Agric, Ikorodu, Lagos</li>
            </ul>
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
            <a href={`mailto:${email}`}>{email}</a>
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
