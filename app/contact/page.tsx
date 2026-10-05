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
  Mail,
  MapPin,
  Clock,
  createLucideIcon,
} from 'lucide-react'

const Instagram = createLucideIcon('Instagram', [
  ['rect', { width: '20', height: '20', x: '2', y: '2', rx: '5', ry: '5', key: '2e1cvw' }],
  ['path', { d: 'M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z', key: '9exkf1' }],
  ['line', { x1: '17.5', x2: '17.51', y1: '6.5', y2: '6.5', key: 'r4j83e' }],
])

const whatsappNumber = '2349069372983'
const phoneNumber = '09069372983'
const email = 'bookhola@gmail.com'

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [quoteOpen, setQuoteOpen] = useState(false)
  const [quoteItems, setQuoteItems] = useState<string[]>([])
  const [announcement, setAnnouncement] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    const saved = window.localStorage.getItem('bookhola-quote-items')
    if (saved) setQuoteItems(JSON.parse(saved))
  }, [])

  const itemCount = quoteItems.length
  const quoteText = useMemo(() => quoteItems.map((item) => `• ${item}`).join('\n'), [quoteItems])

  function removeFromQuote(name: string) {
    setQuoteItems(quoteItems.filter((item) => item !== name))
  }

  function openWhatsApp(message = 'Hello Bookhola Hub, I would like to request a quote for my school.') {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  function validateForm() {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) newErrors.name = 'Please enter your name'
    if (!formData.phone.trim()) newErrors.phone = 'Please enter a phone number'
    else if (!/^0[789][01]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid Nigerian phone number'
    }
    if (!formData.message.trim()) newErrors.message = 'Please enter a message'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateForm()) return

    const message = `Hello Bookhola Hub,

Name: ${formData.name}
Phone: ${formData.phone}

Message:
${formData.message}`

    openWhatsApp(message)
    setSubmitted(true)
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
          <p className="eyebrow">Contact us</p>
          <h1>Get in touch.</h1>
          <p>Have questions or ready to order? Reach out and we'll respond within one business day.</p>
        </section>

        <section className="section-wrap">
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <div className="contact-icon"><Phone size={20} /></div>
                <div>
                  <h3>Phone</h3>
                  <a href={`tel:${phoneNumber}`}>{phoneNumber}</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><MessageCircle size={20} /></div>
                <div>
                  <h3>WhatsApp</h3>
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Mail size={20} /></div>
                <div>
                  <h3>Email</h3>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Instagram size={20} /></div>
                <div>
                  <h3>Instagram</h3>
                  <a href="https://instagram.com/bookhola" target="_blank" rel="noopener noreferrer">@bookhola</a>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><MapPin size={20} /></div>
                <div>
                  <h3>Address</h3>
                  <p>7 Oludare Odekoya Street,<br />Agric, Ikorodu, Lagos</p>
                </div>
              </div>

              <div className="contact-item">
                <div className="contact-icon"><Clock size={20} /></div>
                <div>
                  <h3>Opening hours</h3>
                  <p>Monday – Saturday<br />8:00am – 8:00pm</p>
                </div>
              </div>

              <div className="contact-actions">
                <button className="button primary full" onClick={() => openWhatsApp()}>
                  <MessageCircle size={18} /> Chat on WhatsApp
                </button>
                <a className="button secondary full" href={`tel:${phoneNumber}`}>
                  <Phone size={17} /> Call {phoneNumber}
                </a>
              </div>
            </div>

            <div className="contact-form-wrapper">
              {submitted ? (
                <div className="success-message">
                  <Check size={48} />
                  <h2>Message sent!</h2>
                  <p>We'll get back to you within one business day.</p>
                  <button className="button primary" onClick={() => setSubmitted(false)}>Send another message</button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your name *</label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={errors.name ? 'error' : ''}
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone number *</label>
                    <input
                      type="tel"
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0802 949 6820"
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      placeholder="How can we help you?"
                      className={errors.message ? 'error' : ''}
                    />
                    {errors.message && <span className="error-text">{errors.message}</span>}
                  </div>

                  <button type="submit" className="button primary full">
                    Send message <ArrowRight size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        <section className="map-section">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.952912260219!2d3.5223!3d6.5666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNsKwMzMnNTkuOCJOIDMwwrAzMCczOS44IkU!5e0!3m2!1sen!2sng!4v1620000000000!5m2!1sen!2sng"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bookhola Hub location"
          />
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

      {quoteOpen && <div className="drawer-overlay" onClick={() => setQuoteOpen(false)}><aside className="quote-drawer" onClick={(e) => e.stopPropagation()}><div className="drawer-header"><div><p className="eyebrow">Your selection</p><h2>Request a quote</h2></div><button className="close-button" onClick={() => setQuoteOpen(false)} aria-label="Close quote drawer"><X /></button></div>{quoteItems.length === 0 ? <div className="empty-quote"><ShoppingBasket size={36} /><h3>Your quote is empty</h3><p>Add products from the catalogue and they&apos;ll appear here.</p></div> : <div className="selected-items">{quoteItems.map((item) => <div className="selected-item" key={item}><span>{item}</span><div><button aria-label={`Decrease ${item}`}><Minus size={14} /></button><b>1</b><button aria-label={`Increase ${item}`}><Plus size={14} /></button><button className="remove" onClick={() => removeFromQuote(item)} aria-label={`Remove ${item}`}><X size={15} /></button></div></div>)}</div>}<div className="drawer-footer"><p>We&apos;ll reply with pricing and availability.</p><button className="button primary full" onClick={() => openWhatsApp(`Hello Bookhola Hub, I would like a quote for:\n${quoteText}`)}>Send request on WhatsApp <MessageCircle size={18} /></button><button className="button secondary full" onClick={() => { setQuoteOpen(false); window.location.href = '/quote' }}>I&apos;d rather speak to someone <Phone size={17} /></button></div></aside></div>}
    </div>
  )
}
