
import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  Mail, 
  ChevronRight, 
  Menu, 
  X, 
  ShieldCheck, 
  Banknote, 
  Bike,
  MessageCircle,
  Calendar,
  ExternalLink,
  CheckCircle2
} from 'lucide-react';
import { FAQItem, CourseData, FormData } from './types';

// Components defined outside main App for performance/cleanliness
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Courses', href: '#courses' },
    { name: 'Enroll', href: '#enroll' },
    { name: 'Location', href: '#location' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-brandBlue shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0 flex flex-col">
            <span className="text-white font-heading font-bold text-xl leading-tight">EZ AUTO</span>
            <span className="text-brandOrange text-[10px] uppercase tracking-widest font-bold">Motorcycle Driving School</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <span className="text-white/70 text-xs bg-white/10 px-2 py-1 rounded hidden lg:inline-block">Page · Traffic School</span>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-white hover:text-brandOrange transition-colors text-sm font-semibold"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#enroll" 
              className="bg-brandOrange hover:bg-orange-600 text-white px-5 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105"
            >
              Enroll Now
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden bg-brandBlue absolute w-full transition-all duration-300 ${isOpen ? 'top-full opacity-100' : '-top-[500px] opacity-0'}`}>
        <div className="px-4 pt-2 pb-6 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsOpen(false)}
              className="text-white block px-3 py-4 text-base font-medium border-b border-white/10 hover:bg-white/5"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4">
            <a 
              href="#enroll" 
              onClick={() => setIsOpen(false)}
              className="block w-full bg-brandOrange text-center text-white font-bold py-3 rounded-md"
            >
              Enroll Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Fix: Use React.FC to ensure proper typing for the 'key' prop when the component is used in a map
const CourseCard: React.FC<{ course: CourseData }> = ({ course }) => (
  <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full group">
    <div className="h-12 w-12 bg-brandGray rounded-xl flex items-center justify-center mb-6 group-hover:bg-brandOrange/10 transition-colors">
      {course.title.includes('Theoretical') ? (
        <ShieldCheck className="text-brandBlue group-hover:text-brandOrange" size={28} />
      ) : (
        <Bike className="text-brandBlue group-hover:text-brandOrange" size={28} />
      )}
    </div>
    <h3 className="text-2xl font-heading font-bold text-brandBlue mb-4">{course.title}</h3>
    <p className="text-slate-600 mb-6 leading-relaxed flex-grow">
      {course.description}
    </p>
    <ul className="space-y-3 mb-8">
      {course.points.map((point, idx) => (
        <li key={idx} className="flex items-start gap-3 text-sm text-slate-700 font-medium">
          <CheckCircle2 className="text-green-500 mt-0.5 flex-shrink-0" size={18} />
          {point}
        </li>
      ))}
    </ul>
    <a 
      href="#enroll" 
      className="w-full text-center border-2 border-brandBlue text-brandBlue font-bold py-3 rounded-xl hover:bg-brandBlue hover:text-white transition-all"
    >
      {course.cta}
    </a>
  </div>
);

// Fix: Use React.FC to ensure proper typing for the 'key' prop when the component is used in a map
const FAQItemComp: React.FC<{ faq: FAQItem }> = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left focus:outline-none"
      >
        <span className="text-lg font-semibold text-brandBlue">{faq.question}</span>
        <ChevronRight className={`transition-transform text-brandOrange ${isOpen ? 'rotate-90' : ''}`} />
      </button>
      {isOpen && (
        <div className="mt-3 text-slate-600 leading-relaxed pr-8">
          {faq.answer}
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    course: '',
    schedule: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', mobile: '', course: '', schedule: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  const courses: CourseData[] = [
    {
      title: "🔹 Theoretical Driving Course (TDC)",
      description: "Classroom-style foundational road safety and regulations. Ideal for beginners starting their driving journey.",
      points: [
        "LTO-aligned modules (15-hour session)",
        "Flexible morning & afternoon schedules",
        "Official Certificate upon completion",
        "Comprehensive road sign training"
      ],
      cta: "Inquire about TDC"
    },
    {
      title: "🔹 Practical Driving Course (PDC)",
      description: "Hands-on motorcycle riding skills focused on technical proficiency and safe maneuvering on the road.",
      points: [
        "Direct skill assessment by experts",
        "Multiple practice session options",
        "Safety equipment guidance included",
        "One-on-one professional coaching"
      ],
      cta: "Inquire about PDC"
    }
  ];

  const faqs: FAQItem[] = [
    { 
      question: "Do I need prior riding experience?", 
      answer: "Not required for TDC; our instructors provide classroom safety knowledge first. For PDC, we offer guided instruction suitable for various skill levels." 
    },
    { 
      question: "Are certificates provided?", 
      answer: "Yes, we provide the required certificates upon successful completion of your courses, which are valid for LTO licensing requirements." 
    },
    { 
      question: "How do I schedule my sessions?", 
      answer: "Scheduling is easy! You can use the enrollment form below, message us via SMS, or call us at 0912 937 4825 to secure your preferred slot." 
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-brandBlue">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-3/5">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-white text-xs font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-brandOrange animate-pulse"></span>
                Now Enrolling for Batch 2024
              </div>
              <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-white mb-6 leading-[1.1]">
                EZ Auto Motorcycle Driving School — <span className="text-brandOrange">East Ave, QC</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl font-medium">
                Offers the most affordable Theoretical Driving Course (TDC) and Practical Driving Course (PDC) in Quezon City.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-10 justify-center md:justify-start">
                <div className="flex items-center gap-2 bg-white/5 border border-white/20 px-4 py-2 rounded-lg text-white font-medium">
                  <Banknote className="text-brandOrange" size={20} />
                  Affordable Rates
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/20 px-4 py-2 rounded-lg text-white font-medium">
                  <ShieldCheck className="text-brandOrange" size={20} />
                  DTI/LTO-aligned
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/20 px-4 py-2 rounded-lg text-white font-medium">
                  <Bike className="text-brandOrange" size={20} />
                  Motorcycle Focus
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a href="#enroll" className="bg-brandOrange text-white text-lg font-bold px-8 py-4 rounded-xl shadow-lg shadow-brandOrange/30 hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
                  Enroll Now <ChevronRight size={20} />
                </a>
                <a href="tel:09129374825" className="bg-white text-brandBlue text-lg font-bold px-8 py-4 rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2">
                  <Phone size={20} /> Call 0912 937 4825
                </a>
              </div>
            </div>
            
            <div className="md:w-2/5 hidden md:block">
              <div className="relative">
                <div className="absolute -inset-4 bg-brandOrange/20 blur-3xl rounded-full"></div>
                <img 
                  src="https://picsum.photos/seed/moto/600/800" 
                  alt="Motorcycle Training" 
                  className="relative z-10 rounded-3xl shadow-2xl border-4 border-white/10"
                />
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl z-20">
                  <div className="text-brandBlue font-heading font-extrabold text-3xl">100%</div>
                  <div className="text-slate-500 text-xs font-bold uppercase tracking-wider">Pass Rate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-brandOrange font-bold tracking-widest uppercase text-sm mb-4">Quality Education</h2>
            <h3 className="text-4xl font-heading font-extrabold text-brandBlue mb-6">Courses Offered</h3>
            <p className="text-lg text-slate-600">
              We provide comprehensive training modules designed to make you a safer, more responsible rider on the road.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {courses.map((course, idx) => (
              <CourseCard key={idx} course={course} />
            ))}
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brandGray rounded-full"></div>
      </section>

      {/* Enrollment Section */}
      <section id="enroll" className="py-24 bg-brandGray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-brandBlue rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row">
            <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 text-white">
              <h2 className="text-3xl md:text-5xl font-heading font-extrabold mb-8">ENROLL NOW‼️📣</h2>
              <p className="text-lg text-white/70 mb-10 leading-relaxed">
                Start your journey to becoming a licensed rider today. Our enrollment process is quick, simple, and affordable.
              </p>
              
              <div className="space-y-6">
                <a href="tel:09129374825" className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                  <div className="h-12 w-12 bg-brandOrange/20 rounded-xl flex items-center justify-center text-brandOrange">
                    <Phone size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 font-bold uppercase tracking-wider">Call or SMS</div>
                    <div className="text-xl font-bold">0912 937 4825</div>
                  </div>
                </a>
                
                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer">
                  <div className="h-12 w-12 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
                    <MessageCircle size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 font-bold uppercase tracking-wider">Message via SMS</div>
                    <div className="text-xl font-bold">Fast Response</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors">
                  <div className="h-12 w-12 bg-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <div className="text-xs text-white/50 font-bold uppercase tracking-wider">Weekly Batches</div>
                    <div className="text-xl font-bold">Request Schedule</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 bg-white p-8 md:p-12 lg:p-16">
              {isSuccess ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-4">
                    <CheckCircle2 size={48} />
                  </div>
                  <h3 className="text-3xl font-heading font-extrabold text-brandBlue">Enrollment Sent!</h3>
                  <p className="text-slate-600">We've received your inquiry. Our coordinator will contact you at 0912 937 4825 shortly.</p>
                  <button 
                    onClick={() => setIsSuccess(false)}
                    className="text-brandOrange font-bold hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Juana Dela Cruz"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brandOrange focus:border-brandOrange outline-none transition-all"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number</label>
                      <input 
                        type="tel" 
                        required
                        placeholder="0912 345 6789"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brandOrange focus:border-brandOrange outline-none transition-all"
                        value={formData.mobile}
                        onChange={e => setFormData({...formData, mobile: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Select Course</label>
                    <select 
                      required
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brandOrange focus:border-brandOrange outline-none transition-all"
                      value={formData.course}
                      onChange={e => setFormData({...formData, course: e.target.value as any})}
                    >
                      <option value="">-- Choose Course --</option>
                      <option value="TDC">Theoretical Driving Course (TDC)</option>
                      <option value="PDC">Practical Driving Course (PDC)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Schedule</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Weekends, Morning batch"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brandOrange focus:border-brandOrange outline-none transition-all"
                      value={formData.schedule}
                      onChange={e => setFormData({...formData, schedule: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Message (Optional)</label>
                    <textarea 
                      rows={3}
                      placeholder="Any specific questions?"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-brandOrange focus:border-brandOrange outline-none transition-all"
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                    ></textarea>
                  </div>

                  <p className="text-[10px] text-slate-400 leading-tight">
                    Privacy Note: We respect your privacy and only use your details to confirm your enrollment.
                  </p>

                  <button 
                    disabled={isSubmitting}
                    className={`w-full bg-brandBlue text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Processing...' : 'Submit Enrollment Request'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-brandOrange font-bold tracking-widest uppercase text-sm mb-4">Visit Us</h2>
              <h3 className="text-4xl font-heading font-extrabold text-brandBlue mb-8">Our Location</h3>
              
              <div className="space-y-8 mb-10">
                <div className="flex gap-4">
                  <div className="mt-1 h-10 w-10 bg-brandGray rounded-lg flex items-center justify-center flex-shrink-0 text-brandBlue">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-brandBlue mb-2">ADDRESS: 2ND FLOOR PMHA BLDG. EAST AVE. QUEZON CITY.</p>
                    <p className="text-slate-600">PMHA Bldg. 2, Unit 209A, East Avenue, Diliman, Quezon City, Philippines</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="mt-1 h-10 w-10 bg-brandGray rounded-lg flex items-center justify-center flex-shrink-0 text-brandBlue">
                    <Clock size={24} />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-brandBlue mb-2">Mon–Sat: 9:00 AM – 6:00 PM</p>
                    <p className="text-slate-600">Closed on Sundays and Public Holidays.</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=PMHA+Building+2+East+Avenue+Diliman+Quezon+City" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-brandBlue text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 transition-all"
                >
                  <ExternalLink size={18} /> Open in Google Maps
                </a>
                <a 
                  href="https://www.google.com/maps/dir/?api=1&destination=PMHA+Building+2+East+Avenue+Diliman+Quezon+City"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="border-2 border-brandBlue text-brandBlue px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-brandGray transition-all"
                >
                  Get Directions
                </a>
              </div>
            </div>

            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 h-[400px] bg-slate-100">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.31298877549!2d121.04781707510103!3d14.638118085854743!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b7a951c73f33%3A0xe67145781604a8b!2sPhilippine%20Mental%20Health%20Association%2C%20Inc.%20(PMHA)!5e0!3m2!1sen!2sph!4v1709400000000!5m2!1sen!2sph" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="EZ Auto Driving School Map"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & FAQ Section */}
      <section className="py-24 bg-brandGray border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-16">
            <div className="lg:col-span-1">
              <div className="bg-brandBlue rounded-2xl p-8 text-white relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 bg-brandOrange/20 text-brandOrange px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-6">
                    Page · Traffic School
                  </div>
                  <h4 className="text-2xl font-heading font-bold mb-4">Trusted Training Facility</h4>
                  <p className="text-white/70 mb-8 leading-relaxed">
                    We are a recognized motorcycle training school dedicated to improving road safety across Quezon City and beyond.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 bg-brandOrange rounded flex items-center justify-center">
                        <CheckCircle2 size={16} className="text-white" />
                      </div>
                      <span className="text-sm font-semibold">Accredited Curriculum</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-6 w-6 bg-brandOrange rounded flex items-center justify-center">
                        <CheckCircle2 size={16} className="text-white" />
                      </div>
                      <span className="text-sm font-semibold">Modern Equipment</span>
                    </div>
                  </div>
                </div>
                <Bike size={120} className="absolute -bottom-8 -right-8 text-white/5 group-hover:scale-110 transition-transform duration-500" />
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="text-3xl font-heading font-extrabold text-brandBlue mb-8">Frequently Asked Questions</h3>
              <div className="bg-white rounded-3xl p-8 shadow-sm">
                {faqs.map((faq, idx) => (
                  <FAQItemComp key={idx} faq={faq} />
                ))}
              </div>
              
              <div className="mt-12 p-8 border-2 border-dashed border-slate-300 rounded-3xl text-center">
                <p className="text-slate-600 mb-4">Still have questions? We're here to help.</p>
                <a href="tel:09129374825" className="text-xl font-bold text-brandBlue hover:text-brandOrange transition-colors">
                  0912 937 4825
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-brandBlue text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="flex flex-col mb-6">
                <span className="text-white font-heading font-bold text-2xl leading-tight uppercase tracking-tight">EZ AUTO</span>
                <span className="text-brandOrange text-xs uppercase tracking-[0.2em] font-bold">Motorcycle Driving School</span>
              </div>
              <p className="text-white/60 text-sm leading-relaxed mb-6">
                Affordable TDC & PDC in East Ave, QC. Your trusted partner in road safety and motorcycle driving excellence.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brandOrange transition-all cursor-pointer">
                  <Phone size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brandOrange transition-all cursor-pointer">
                  <Mail size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-brandOrange transition-all cursor-pointer">
                  <MapPin size={18} />
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-brandOrange rounded-full"></span>
                Quick Links
              </h4>
              <ul className="space-y-4 text-white/60 text-sm font-medium">
                <li><a href="#home" className="hover:text-brandOrange transition-colors">Home</a></li>
                <li><a href="#courses" className="hover:text-brandOrange transition-colors">Courses Offered</a></li>
                <li><a href="#enroll" className="hover:text-brandOrange transition-colors">Enroll Today</a></li>
                <li><a href="#location" className="hover:text-brandOrange transition-colors">Find Our Office</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-brandOrange rounded-full"></span>
                Contact Info
              </h4>
              <ul className="space-y-4 text-white/60 text-sm font-medium">
                <li className="flex items-start gap-3">
                  <Phone size={18} className="text-brandOrange mt-0.5" />
                  <span>0912 937 4825</span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail size={18} className="text-brandOrange mt-0.5" />
                  <span>info@ezautomoto.example</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin size={18} className="text-brandOrange mt-0.5" />
                  <span>PMHA Bldg. 2, East Avenue, QC</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="w-2 h-2 bg-brandOrange rounded-full"></span>
                Office Hours
              </h4>
              <div className="bg-white/5 p-4 rounded-xl border border-white/10">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-white/60">Mon–Sat</span>
                  <span className="font-bold">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Sun / Holidays</span>
                  <span className="text-red-400 font-bold uppercase text-[10px] mt-1">Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase tracking-widest text-white/40 font-bold">
            <p>© {new Date().getFullYear()} EZ AUTO MOTORCYCLE DRIVING SCHOOL. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
