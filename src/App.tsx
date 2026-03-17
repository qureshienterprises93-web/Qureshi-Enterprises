import React, { useState, useEffect } from 'react';
import { 
  Anchor, 
  Ship, 
  Clock, 
  ShieldCheck, 
  Truck, 
  Phone, 
  Mail, 
  MessageCircle, 
  ChevronRight, 
  CheckCircle2, 
  Menu, 
  X, 
  MapPin,
  Star,
  ArrowRight,
  Package,
  Wrench,
  Utensils,
  Zap,
  Droplets,
  LifeBuoy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const Navbar = ({ onOpenQuote }: { onOpenQuote: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Why Us', href: '#why-us' },
    { name: 'Process', href: '#process' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Anchor className={`w-8 h-8 ${isScrolled ? 'text-navy' : 'text-white'}`} />
          <span className={`text-xl font-bold tracking-tight ${isScrolled ? 'text-navy' : 'text-white'}`}>
            QURESHI <span className="text-teal-accent">ENTERPRISES</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-sm font-medium hover:text-teal-accent transition-colors ${isScrolled ? 'text-slate-700' : 'text-white'}`}
            >
              {link.name}
            </a>
          ))}
          <button onClick={onOpenQuote} className="btn-primary py-2 px-5 text-sm">
            Request Quote
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className={isScrolled ? 'text-navy' : 'text-white'} /> : <Menu className={isScrolled ? 'text-navy' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-6 px-4 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg font-medium text-slate-800 hover:text-teal-accent"
              >
                {link.name}
              </a>
            ))}
            <button onClick={() => { onOpenQuote(); setIsMobileMenuOpen(false); }} className="btn-primary w-full">
              Request Quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const QuoteModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden relative"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
          <X className="w-6 h-6" />
        </button>
        <div className="p-8">
          <h3 className="text-2xl font-bold text-navy mb-2">Request a Quick Quote</h3>
          <p className="text-slate-500 mb-6">Get a response within 60 minutes for Karachi Port supplies.</p>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-accent outline-none" required />
              <input type="text" placeholder="Company Name" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-accent outline-none" required />
            </div>
            <input type="text" placeholder="Vessel Name / IMO" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-accent outline-none" required />
            <select className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-accent outline-none bg-white">
              <option>Select Service Type</option>
              <option>Provisions (Fresh/Dry)</option>
              <option>Technical & Engine Stores</option>
              <option>Safety & Deck Equipment</option>
              <option>Cabin & Cleaning Stores</option>
              <option>Full Vessel Supply</option>
            </select>
            <textarea placeholder="Briefly describe your requirements..." rows={3} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-teal-accent outline-none"></textarea>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-slate-600">Urgency:</span>
              <label className="flex items-center gap-1 text-sm cursor-pointer">
                <input type="radio" name="urgency" className="text-teal-accent" /> Normal
              </label>
              <label className="flex items-center gap-1 text-sm cursor-pointer">
                <input type="radio" name="urgency" className="text-orange-accent" /> Urgent (Next 12h)
              </label>
            </div>

            <button className="btn-primary w-full py-4 text-lg">
              Send Inquiry Now
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

const ServiceCard = ({ icon: Icon, title, description, benefits }: any) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <div className="w-14 h-14 bg-teal-accent/10 rounded-xl flex items-center justify-center mb-6">
      <Icon className="w-7 h-7 text-teal-accent" />
    </div>
    <h3 className="text-xl font-bold text-navy mb-3">{title}</h3>
    <p className="text-slate-600 mb-4 leading-relaxed">{description}</p>
    <ul className="space-y-2">
      {benefits.map((benefit: string, idx: number) => (
        <li key={idx} className="flex items-center gap-2 text-sm text-slate-500">
          <CheckCircle2 className="w-4 h-4 text-teal-accent" />
          {benefit}
        </li>
      ))}
    </ul>
  </motion.div>
);

const TestimonialCard = ({ quote, author, role, company }: any) => (
  <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-orange-accent text-orange-accent" />)}
    </div>
    <p className="text-slate-700 italic mb-6">"{quote}"</p>
    <div>
      <p className="font-bold text-navy">{author}</p>
      <p className="text-sm text-slate-500">{role} • {company}</p>
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const services = [
    {
      icon: Utensils,
      title: "Provisions Supply",
      description: "Fresh, frozen, and dry provisions sourced from premium local markets and international brands.",
      benefits: ["HACCP Certified Quality", "Fresh Daily Sourcing", "Global Cuisine Options"]
    },
    {
      icon: Wrench,
      title: "Deck & Engine Stores",
      description: "Comprehensive range of technical stores, tools, and spare parts for seamless vessel operations.",
      benefits: ["IMPA/ISSA Coded Items", "Genuine Spare Parts", "Fast Technical Sourcing"]
    },
    {
      icon: LifeBuoy,
      title: "Safety Equipment",
      description: "SOLAS approved life-saving appliances, firefighting equipment, and personal protective gear.",
      benefits: ["Certified Safety Standards", "Inspection Ready", "Emergency Replacements"]
    },
    {
      icon: Zap,
      title: "Electrical Supplies",
      description: "Marine-grade cables, lighting, batteries, and specialized electrical components for all vessel types.",
      benefits: ["Voltage Specific Stock", "Marine Grade Durability", "Technical Support"]
    },
    {
      icon: Droplets,
      title: "Cabin & Cleaning",
      description: "Hotel stores, galley equipment, cleaning chemicals, and essential crew welfare supplies.",
      benefits: ["Bulk Availability", "Eco-friendly Options", "Full Galley Support"]
    },
    {
      icon: Package,
      title: "Bonded Stores",
      description: "Tax-free beverages, tobacco, confectionery, and high-end crew personal items.",
      benefits: ["Secure Handling", "Wide Brand Selection", "Customs Compliant"]
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar onOpenQuote={() => setIsQuoteModalOpen(true)} />
      <QuoteModal isOpen={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden bg-navy">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1524522173746-f628baad3644?auto=format&fit=crop&q=80&w=2000" 
            alt="Karachi Port Vessel" 
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 bg-teal-accent/20 text-teal-accent px-4 py-2 rounded-full text-sm font-bold mb-6 border border-teal-accent/30">
              <ShieldCheck className="w-4 h-4" />
              Karachi's Most Trusted Ship Chandler
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              Reliable Marine Supplies, <span className="text-teal-accent">Delivered 24/7.</span>
            </h1>
            <p className="text-xl text-slate-300 mb-10 leading-relaxed">
              Qureshi Enterprises provides premium ship chandling services at Karachi Port. From fresh provisions to critical engine stores, we ensure your vessel is always ready for the next voyage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => setIsQuoteModalOpen(true)} className="btn-primary py-4 px-8 text-lg group">
                Request Quick Quote
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="https://wa.me/923000000000" target="_blank" className="btn-secondary py-4 px-8 text-lg bg-white/10 border-white/20 text-white hover:bg-white hover:text-navy">
                <MessageCircle className="w-5 h-5" />
                WhatsApp Now
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <p className="text-2xl font-bold text-white">24/7</p>
                <p className="text-sm text-slate-400">Availability</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">60m</p>
                <p className="text-sm text-slate-400">Response Time</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="text-sm text-slate-400">Port Coverage</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Badges Bar */}
      <div className="bg-slate-50 py-10 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all">
          <div className="flex items-center gap-2 font-bold text-navy"><Ship className="w-6 h-6" /> KARACHI PORT</div>
          <div className="flex items-center gap-2 font-bold text-navy"><ShieldCheck className="w-6 h-6" /> ISO CERTIFIED</div>
          <div className="flex items-center gap-2 font-bold text-navy"><Truck className="w-6 h-6" /> FAST DELIVERY</div>
          <div className="flex items-center gap-2 font-bold text-navy"><Clock className="w-6 h-6" /> 24/7 SUPPORT</div>
        </div>
      </div>

      {/* About Us */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1494412574743-019485b7828d?auto=format&fit=crop&q=80&w=1000" 
                alt="Ship Chandler Team" 
                className="rounded-3xl shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-teal-accent rounded-3xl -z-0"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur p-6 rounded-2xl shadow-xl z-20 flex items-center gap-4">
                <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold">15+</div>
                <p className="text-sm font-bold text-navy leading-tight">Years of Excellence in<br/>Maritime Logistics</p>
              </div>
            </div>
            <div>
              <h2 className="text-teal-accent font-bold tracking-widest uppercase text-sm mb-4">About Qureshi Enterprises</h2>
              <h3 className="text-4xl font-bold text-navy mb-6 leading-tight">Your Strategic Partner at Karachi Port & Beyond</h3>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Founded on the principles of speed, reliability, and maritime expertise, Qureshi Enterprises has grown into one of Pakistan's leading ship chandlers. We understand that in the shipping industry, time is money.
              </p>
              <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                Our mission is simple: to provide vessels with the highest quality supplies at competitive prices, ensuring zero delays in port operations. Whether it's a bulk carrier, tanker, or container ship, we treat every vessel with the same level of professional urgency.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-teal-accent/10 p-1 rounded">
                    <CheckCircle2 className="w-5 h-5 text-teal-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-navy">Experienced Team</p>
                    <p className="text-sm text-slate-500">Ex-mariners and logistics experts.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 bg-teal-accent/10 p-1 rounded">
                    <CheckCircle2 className="w-5 h-5 text-teal-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-navy">Quality Sourcing</p>
                    <p className="text-sm text-slate-500">Only genuine and fresh products.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-teal-accent font-bold tracking-widest uppercase text-sm mb-4">Our Services</h2>
            <h3 className="text-4xl font-bold text-navy mb-6">Comprehensive Vessel Support</h3>
            <p className="text-slate-600 text-lg">
              We provide a one-stop-shop experience for all your vessel requirements, ensuring compliance with international maritime standards.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <ServiceCard key={idx} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="py-24 bg-navy text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-accent/5 -skew-x-12 translate-x-1/4"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-teal-accent font-bold tracking-widest uppercase text-sm mb-4">The Qureshi Advantage</h2>
              <h3 className="text-4xl font-bold mb-8 leading-tight">Why Leading Shipping Companies Choose Us</h3>
              
              <div className="space-y-8">
                {[
                  { icon: Clock, title: "Rapid Response Time", text: "Inquiries answered within 60 minutes, 24/7/365." },
                  { icon: ShieldCheck, title: "Quality Assurance", text: "Strict quality control on all provisions and technical stores." },
                  { icon: Zap, title: "Port Expertise", text: "Deep knowledge of Karachi Port operations for faster clearance." },
                  { icon: Truck, title: "Reliable Logistics", text: "Our own fleet of temperature-controlled delivery vehicles." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-teal-accent" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                      <p className="text-slate-400">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-10 rounded-3xl border border-white/10">
              <h4 className="text-2xl font-bold mb-6 text-center">Request a Quote Instantly</h4>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Full Name" className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 focus:border-teal-accent outline-none" />
                <input type="email" placeholder="Email Address" className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 focus:border-teal-accent outline-none" />
                <input type="text" placeholder="Vessel Name" className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 focus:border-teal-accent outline-none" />
                <textarea placeholder="Your Requirements" rows={4} className="w-full bg-navy/50 border border-white/10 rounded-xl px-4 py-3 focus:border-teal-accent outline-none"></textarea>
                <button className="btn-primary w-full py-4">Get My Quote Now</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-teal-accent font-bold tracking-widest uppercase text-sm mb-4">How It Works</h2>
            <h3 className="text-4xl font-bold text-navy">Our Seamless Supply Process</h3>
          </div>

          <div className="grid md:grid-cols-5 gap-4 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -z-10"></div>
            {[
              { step: "01", title: "Inquiry", desc: "Send us your list via Email or WhatsApp." },
              { step: "02", title: "Quote", desc: "We provide a competitive quote instantly." },
              { step: "03", title: "Confirm", desc: "Order is confirmed and items are picked." },
              { step: "04", title: "Deliver", desc: "Supplies delivered directly to your vessel." },
              { step: "05", title: "Done", desc: "Vessel sails with full supplies on time." }
            ].map((item, idx) => (
              <div key={idx} className="text-center bg-white p-6 rounded-2xl">
                <div className="w-12 h-12 bg-navy text-white rounded-full flex items-center justify-center font-bold mx-auto mb-4 border-4 border-white shadow-lg">
                  {item.step}
                </div>
                <h4 className="font-bold text-navy mb-2">{item.title}</h4>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-teal-accent font-bold tracking-widest uppercase text-sm mb-4">Testimonials</h2>
            <h3 className="text-4xl font-bold text-navy">Trusted by Global Fleets</h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="Qureshi Enterprises is our go-to partner in Karachi. Their response time is unmatched, and the quality of fresh provisions is always top-tier."
              author="Capt. Aris"
              role="Master"
              company="Aegean Shipping"
            />
            <TestimonialCard 
              quote="We had an emergency engine part requirement at midnight. Qureshi's team sourced it and delivered it before dawn. Truly reliable."
              author="Dimitris P."
              role="Procurement Manager"
              company="Global Tankers Ltd"
            />
            <TestimonialCard 
              quote="Professional service, transparent pricing, and excellent port coordination. They make ship chandling look easy."
              author="Sarah Chen"
              role="Vessel Agent"
              company="Pacific Maritime"
            />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-navy mb-12 text-center">Frequently Asked Questions</h3>
          <div className="space-y-6">
            {[
              { q: "What is your typical delivery time?", a: "For standard provisions, we can deliver within 6-12 hours. For urgent technical stores, we aim for under 24 hours depending on availability." },
              { q: "Which ports do you cover?", a: "We primarily serve Karachi Port (KPT) and Port Qasim. We also coordinate supplies for nearby operational zones." },
              { q: "Do you provide certified safety equipment?", a: "Yes, all our safety equipment is SOLAS/MED approved and comes with necessary certification for vessel inspections." },
              { q: "Can we pay in USD?", a: "Yes, we accept payments in major international currencies including USD, EUR, and GBP to facilitate global shipping companies." }
            ].map((faq, idx) => (
              <div key={idx} className="border-b border-slate-100 pb-6">
                <h4 className="text-lg font-bold text-navy mb-2 flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-teal-accent" />
                  {faq.q}
                </h4>
                <p className="text-slate-600 pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-teal-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8">Need Urgent Ship Supplies?</h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Don't let supply delays affect your vessel's schedule. Contact Karachi's most reliable ship chandler today.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <button onClick={() => setIsQuoteModalOpen(true)} className="bg-navy text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-navy/90 transition-all shadow-xl">
              Get a Quote Now
            </button>
            <a href="tel:+923000000000" className="bg-white text-navy px-10 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all shadow-xl flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Call +92 300 0000000
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold text-navy mb-8">Get In Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-teal-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-navy">Our Location</p>
                    <p className="text-slate-600">Karachi Port Area, Karachi, Pakistan</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-teal-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-navy">Phone / WhatsApp</p>
                    <p className="text-slate-600">+92 300 0000000 (24/7 Support)</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-teal-accent" />
                  </div>
                  <div>
                    <p className="font-bold text-navy">Email Address</p>
                    <p className="text-slate-600">info@qureshienterprises.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-12 p-8 bg-slate-50 rounded-3xl border border-slate-100">
                <h4 className="font-bold text-navy mb-4">Operational Hours</h4>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-slate-500">Monday - Sunday</span>
                  <span className="font-bold text-teal-accent">24 Hours</span>
                </div>
                <p className="text-xs text-slate-400 mt-4">
                  *We operate on all public holidays to ensure uninterrupted vessel support.
                </p>
              </div>
            </div>
            <div>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy">Name</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-teal-accent" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-navy">Company</label>
                    <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-teal-accent" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy">Email</label>
                  <input type="email" className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-teal-accent" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-navy">Message</label>
                  <textarea rows={5} className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-teal-accent"></textarea>
                </div>
                <button className="btn-primary w-full py-4 text-lg">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <Anchor className="w-8 h-8 text-teal-accent" />
                <span className="text-xl font-bold">QURESHI <span className="text-teal-accent">ENT.</span></span>
              </div>
              <p className="text-slate-400 mb-6">
                Karachi's premier ship chandling service. Fast, reliable, and professional marine supplies for global fleets.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-teal-accent transition-colors"><Mail className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-teal-accent transition-colors"><Phone className="w-5 h-5" /></a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-teal-accent transition-colors"><MessageCircle className="w-5 h-5" /></a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Quick Links</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#about" className="hover:text-teal-accent transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-teal-accent transition-colors">Our Services</a></li>
                <li><a href="#why-us" className="hover:text-teal-accent transition-colors">Why Choose Us</a></li>
                <li><a href="#process" className="hover:text-teal-accent transition-colors">Our Process</a></li>
                <li><a href="#contact" className="hover:text-teal-accent transition-colors">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Services</h4>
              <ul className="space-y-4 text-slate-400">
                <li><a href="#" className="hover:text-teal-accent transition-colors">Provisions</a></li>
                <li><a href="#" className="hover:text-teal-accent transition-colors">Deck & Engine</a></li>
                <li><a href="#" className="hover:text-teal-accent transition-colors">Safety Equipment</a></li>
                <li><a href="#" className="hover:text-teal-accent transition-colors">Cabin Stores</a></li>
                <li><a href="#" className="hover:text-teal-accent transition-colors">Bonded Stores</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-6">Newsletter</h4>
              <p className="text-slate-400 mb-4 text-sm">Subscribe for maritime industry updates and port news.</p>
              <div className="flex">
                <input type="email" placeholder="Your Email" className="bg-white/5 border border-white/10 rounded-l-xl px-4 py-2 w-full outline-none focus:border-teal-accent" />
                <button className="bg-teal-accent px-4 rounded-r-xl hover:bg-teal-700 transition-colors">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
            <p>© 2026 Qureshi Enterprises. All rights reserved.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Sticky WhatsApp Button */}
      <a 
        href="https://wa.me/923000000000" 
        target="_blank" 
        className="fixed bottom-8 right-8 z-[90] bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center gap-2 group"
      >
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap font-bold">WhatsApp Now</span>
        <MessageCircle className="w-7 h-7" />
      </a>
    </div>
  );
}
