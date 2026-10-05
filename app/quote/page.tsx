'use client'

import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  BookOpen,
  Check,
  ChevronRight,
  Menu,
  MessageCircle,
  Phone,
  ShoppingBasket,
  X,
  Upload,
} from 'lucide-react'

const whatsappNumber = '2349069372983'
const phoneNumber = '09069372983'

export default function QuotePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [quoteItems, setQuoteItems] = useState<string[]>([])
  const [announcement, setAnnouncement] = useState(true)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    schoolName: '',
    contactPerson: '',
    role: '',
    phone: '',
    email: '',
    location: '',
    categories: [] as string[],
    additionalNotes: '',
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

  function openWhatsApp(message: string) {
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
  }

  function validateForm() {
    const newErrors: Record<string, string> = {}
    
    if (!formData.schoolName.trim()) newErrors.schoolName = 'Please enter your school name'
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Please enter a contact person'
    if (!formData.phone.trim()) newErrors.phone = 'Please enter a phone number'
    else if (!/^0[789][01]\d{8}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid Nigerian phone number (e.g., 0802 949 6820)'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validateForm()) return

    const message = `Hello Bookhola Hub, I would like to request a quote.

School: ${formData.schoolName}
Contact: ${formData.contactPerson}
Role: ${formData.role || 'Not specified'}
Phone: ${formData.phone}
Email: ${formData.email || 'Not provided'}
Location: ${formData.location || 'Not provided'}
Category interest: ${formData.categories.join(', ') || 'Not specified'}

Items:
${quoteText || 'No items selected'}

Additional notes:
${formData.additionalNotes || 'None'}`

    openWhatsApp(message)
    setSubmitted(true)
  }

  function handleCategoryChange(category: string) {
    setFormData(prev => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter(c => c !== category)
        : [...prev.categories, category]
    }))
  }

  if (submitted) {
    return (
      <div className="site-shell">
        {announcement && <div className="announcement">Supplying schools across Nigeria. <button onClick={() => setAnnouncement(false)}>Request a free quote today <ArrowRight size={14} /></button><button className="dismiss" aria-label="Dismiss announcement" onClick={() => setAnnouncement(false)}><X size={16} /></button></div>}
        <header className="site-header">
          <a className="brand" href="/" aria-label="Bookhola Hub home"><span className="brand-mark"><BookOpen size={21} /></span><span>BOOKHOLA <b>HUB</b></span></a>
          <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
            <a href="/catalogue" onClick={() => setMenuOpen(false)}>Catalogue</a><a href="/about" onClick={() => setMenuOpen(false)}>About</a><a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
          </nav>
          <button className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        </header>

        <main>
          <section className="page-header section-wrap">
            <div className="success-message">
              <Check size={64} />
              <h1>Quote request sent!</h1>
              <p>We've received your request and will reply within one business day with pricing and availability.</p>
              <div className="success-actions">
                <button className="button primary" onClick={() => window.location.href = '/'}>Return to home</button>
                <button className="button secondary" onClick={() => window.location.href = '/catalogue'}>Browse catalogue</button>
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
      </div>
    )
  }

  return (
    <div className="site-shell">
      {announcement && <div className="announcement">Supplying schools across Nigeria. <button onClick={() => setAnnouncement(false)}>Request a free quote today <ArrowRight size={14} /></button><button className="dismiss" aria-label="Dismiss announcement" onClick={() => setAnnouncement(false)}><X size={16} /></button></div>}
      <header className="site-header">
        <a className="brand" href="/" aria-label="Bookhola Hub home"><img src="/logo.jpeg" alt="Bookhola Hub logo" className="brand-logo" /></a>
        <nav className={menuOpen ? 'main-nav open' : 'main-nav'} aria-label="Main navigation">
          <a href="/catalogue" onClick={() => setMenuOpen(false)}>Catalogue</a><a href="/about" onClick={() => setMenuOpen(false)}>About</a><a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <button className="menu-button" aria-label="Open menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
      </header>

      <main>
        <section className="page-header section-wrap">
          <p className="eyebrow">Request a Quote</p>
          <h1>Tell us what your school needs.</h1>
          <p>Fill in the details below and we'll get back to you with pricing and availability within one business day.</p>
        </section>

        <section className="section-wrap">
          <form className="quote-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="schoolName">School name *</label>
                <input
                  type="text"
                  id="schoolName"
                  value={formData.schoolName}
                  onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                  className={errors.schoolName ? 'error' : ''}
                />
                {errors.schoolName && <span className="error-text">{errors.schoolName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="contactPerson">Contact person *</label>
                <input
                  type="text"
                  id="contactPerson"
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className={errors.contactPerson ? 'error' : ''}
                />
                {errors.contactPerson && <span className="error-text">{errors.contactPerson}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                >
                  <option value="">Select your role</option>
                  <option value="Proprietor">Proprietor</option>
                  <option value="Bursar">Bursar</option>
                  <option value="Teacher">Teacher</option>
                  <option value="Parent association">Parent association</option>
                  <option value="Other">Other</option>
                </select>
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
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="school@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="location">Location (State / LGA)</label>
                <input
                  type="text"
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="Lagos / Ikorodu"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Category interest</label>
              <div className="checkbox-group">
                {['Laboratory equipment', 'School furniture', 'Textbooks', 'Bags & stationery'].map((category) => (
                  <label key={category} className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={formData.categories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {quoteItems.length > 0 && (
              <div className="form-group">
                <label>Selected items</label>
                <div className="selected-items-list">
                  {quoteItems.map((item) => (
                    <div className="selected-item" key={item}>
                      <span>{item}</span>
                      <button type="button" onClick={() => removeFromQuote(item)} aria-label={`Remove ${item}`}>
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="additionalNotes">Additional notes</label>
              <textarea
                id="additionalNotes"
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                rows={4}
                placeholder="Any specific requirements or questions..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="fileUpload">Upload booklist or school list (optional)</label>
              <div className="file-upload">
                <input type="file" id="fileUpload" />
                <label htmlFor="fileUpload">
                  <Upload size={20} />
                  <span>Choose file or drag and drop</span>
                </label>
              </div>
            </div>

            <div className="form-actions">
              <button type="submit" className="button primary">
                Send request on WhatsApp <MessageCircle size={18} />
              </button>
              <button type="button" className="button secondary" onClick={() => window.location.href = '/contact'}>
                I'd rather speak to someone <Phone size={17} />
              </button>
            </div>
          </form>
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
    </div>
  )
}
