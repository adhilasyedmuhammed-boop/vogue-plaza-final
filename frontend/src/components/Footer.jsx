import React from 'react';
import { CreditCard, ShieldCheck, Truck } from 'lucide-react';

const FacebookIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>);
const TwitterIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>);
const InstagramIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>);
const YoutubeIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>);

const Footer = () => {
  return (
    <footer className="bg-theme-secondary border-t border-theme pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-12">
        
        {/* Top Feature Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 border-b border-theme mb-12">
          <div className="flex items-center gap-4">
            <Truck size={32} className="text-theme-secondary" />
            <div>
              <h4 className="font-bold text-sm tracking-wide text-theme uppercase">Free Delivery</h4>
              <p className="text-xs text-theme-secondary">On orders above $100</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ShieldCheck size={32} className="text-theme-secondary" />
            <div>
              <h4 className="font-bold text-sm tracking-wide text-theme uppercase">Secure Payment</h4>
              <p className="text-xs text-theme-secondary">100% secure checkout</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <CreditCard size={32} className="text-theme-secondary" />
            <div>
              <h4 className="font-bold text-sm tracking-wide text-theme uppercase">Easy Returns</h4>
              <p className="text-xs text-theme-secondary">30 days return policy</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="font-bold text-sm tracking-wide text-theme uppercase mb-6">About Us</h4>
            <ul className="space-y-3 text-sm text-theme-secondary">
              <li><a href="#" className="hover:text-theme">Our Story</a></li>
              <li><a href="#" className="hover:text-theme">Careers</a></li>
              <li><a href="#" className="hover:text-theme">Corporate Information</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-wide text-theme uppercase mb-6">Help</h4>
            <ul className="space-y-3 text-sm text-theme-secondary">
              <li><a href="#" className="hover:text-theme">Track Order</a></li>
              <li><a href="#" className="hover:text-theme">Returns</a></li>
              <li><a href="#" className="hover:text-theme">Shipping Info</a></li>
              <li><a href="#" className="hover:text-theme">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-wide text-theme uppercase mb-6">Shop</h4>
            <ul className="space-y-3 text-sm text-theme-secondary">
              <li><a href="#" className="hover:text-theme">Men's Fashion</a></li>
              <li><a href="#" className="hover:text-theme">Women's Fashion</a></li>
              <li><a href="#" className="hover:text-theme">Kids</a></li>
              <li><a href="#" className="hover:text-theme">Brands Directory</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm tracking-wide text-theme uppercase mb-6">Connect</h4>
            <div className="flex gap-4 mb-6 text-theme-secondary">
              <a href="#" className="hover:text-theme"><FacebookIcon /></a>
              <a href="#" className="hover:text-theme"><TwitterIcon /></a>
              <a href="#" className="hover:text-theme"><InstagramIcon /></a>
              <a href="#" className="hover:text-theme"><YoutubeIcon /></a>
            </div>
            <h4 className="font-bold text-xs tracking-wide text-theme uppercase mb-2">Newsletter</h4>
            <div className="flex">
              <input type="email" placeholder="Email Address" className="w-full bg-theme border border-theme p-2 text-sm focus:outline-none focus:border-[var(--text-primary)]" />
              <button className="bg-[var(--text-primary)] text-[var(--bg-primary)] px-4 text-xs font-bold uppercase tracking-wider">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-xs text-theme-secondary pt-8 border-t border-theme">
          <p>&copy; {new Date().getFullYear()} Vogue Plaza. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;