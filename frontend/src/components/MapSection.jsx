import { Clock, Mail, MapPin, Phone } from 'lucide-react';

export default function MapSection() {
  return (
    <section className="map-section page-shell" aria-label="Vogue Plaza store location and contact">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Visit us</p>
          <h2>Store Concierge</h2>
        </div>
        <p>Speak with our styling desk or visit the flagship showroom for premium fittings.</p>
      </div>

      <div className="map-layout">
        <div className="map-frame">
          <iframe
            title="Vogue Plaza flagship location map"
            src="https://www.openstreetmap.org/export/embed.html?bbox=72.8200%2C18.9300%2C72.8500%2C18.9600&layer=mapnik&marker=18.9460%2C72.8330"
            loading="lazy"
          />
        </div>
        <div className="contact-card">
          <article>
            <MapPin size={22} />
            <div>
              <span>Flagship Address</span>
              <p>Vogue Plaza, Fashion Avenue, Colaba, Mumbai</p>
            </div>
          </article>
          <article>
            <Phone size={22} />
            <div>
              <span>Concierge</span>
              <p>+91 22 4000 7788</p>
            </div>
          </article>
          <article>
            <Mail size={22} />
            <div>
              <span>Email</span>
              <p>care@vogueplaza.example</p>
            </div>
          </article>
          <article>
            <Clock size={22} />
            <div>
              <span>Hours</span>
              <p>Monday to Sunday, 10:00 AM to 9:30 PM</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
