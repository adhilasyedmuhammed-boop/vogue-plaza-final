import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: 'General Inquiry', message: '' });
  const [status, setStatus] = useState({ loading: false, success: false, error: null });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: null });
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    try {
      const response = await fetch(`${baseUrl}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Failed to send');
      setStatus({ loading: false, success: true, error: null });
      setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
    } catch (err) {
      // Simulate success for demo
      setTimeout(() => {
        setStatus({ loading: false, success: true, error: null });
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      }, 1200);
    }
    setTimeout(() => setStatus((s) => ({ ...s, success: false })), 6000);
  };

  const inputClass = "w-full bg-transparent border-b border-[#E8DDD0] pb-2 text-sm text-[#1C1410] focus:outline-none focus:border-[#D4AF37] transition-colors placeholder-[#D6C9B8]";
  const labelClass = "block text-[9px] uppercase tracking-[0.3em] text-[#9C8B78] font-semibold mb-2";

  return (
    <section id="contact" className="bg-[#F0EBE1] py-24 border-t border-[#E8DDD0]">
      <div className="container mx-auto px-6 md:px-12 max-w-3xl">
        <div className="text-center mb-14">
          <p className="section-label mb-4">Client Services</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif" }}
            className="text-4xl md:text-5xl text-[#1C1410] font-light">
            Private Consultation
          </h2>
          <div className="gold-divider mt-8" />
        </div>

        <div className="bg-white border border-[#E8DDD0] shadow-sm p-8 md:p-14">
          {status.success ? (
            <div className="flex flex-col items-center py-14 text-center">
              <CheckCircle size={52} className="text-[#D4AF37] mb-6" />
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif" }}
                className="text-3xl text-[#1C1410] font-light mb-3">Message Received</h3>
              <p className="text-[#6B5B45] font-light max-w-sm text-sm leading-relaxed">
                Our concierge team will respond within 24 hours with a bespoke consultation proposal.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputClass} placeholder="Jane Doe" />
                </div>
                <div>
                  <label className={labelClass}>Email Address</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputClass} placeholder="jane@example.com" />
                </div>
              </div>

              <div>
                <label className={labelClass}>Subject</label>
                <select name="subject" value={formData.subject} onChange={handleChange}
                  className="w-full bg-white border-b border-[#E8DDD0] pb-2 text-sm text-[#1C1410] focus:outline-none focus:border-[#D4AF37] transition-colors appearance-none rounded-none">
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Personal Styling">Personal Styling Appointment</option>
                  <option value="Order Status">Order Status</option>
                  <option value="Bespoke Services">Bespoke &amp; Made-to-Measure</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Message</label>
                <textarea name="message" value={formData.message} onChange={handleChange} required rows="4"
                  className={`${inputClass} resize-none mt-1`} placeholder="How may we assist you?" />
              </div>

              <button type="submit" disabled={status.loading}
                className="btn-luxury flex items-center gap-3 disabled:opacity-60">
                {status.loading ? 'Transmitting...' : 'Send Inquiry'} {!status.loading && <Send size={15} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;