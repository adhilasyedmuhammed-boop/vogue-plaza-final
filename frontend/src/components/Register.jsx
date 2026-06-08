import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LockKeyhole, Mail, UserRound } from 'lucide-react';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [touched, setTouched] = useState({});

  const errors = useMemo(
    () => ({
      name: form.name && form.name.trim().length < 2 ? 'Enter your full name.' : '',
      email: form.email && !/^\S+@\S+\.\S+$/.test(form.email) ? 'Use a valid email address.' : '',
      password: form.password && form.password.length < 8 ? 'Use at least 8 characters.' : '',
    }),
    [form],
  );

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <p className="eyebrow">Join the edit</p>
        <h1>Create your account</h1>
        <p>Save preferred sizes, review bag history, and move through checkout faster.</p>
        <form className="auth-form">
          <label className={touched.name && errors.name ? 'field-error' : ''}>
            Full Name
            <span>
              <UserRound size={18} />
              <input
                name="name"
                value={form.name}
                onBlur={() => setTouched({ ...touched, name: true })}
                onChange={updateField}
                placeholder="Your full name"
              />
            </span>
            {touched.name && errors.name && <small>{errors.name}</small>}
          </label>
          <label className={touched.email && errors.email ? 'field-error' : ''}>
            Email Address
            <span>
              <Mail size={18} />
              <input
                name="email"
                type="email"
                value={form.email}
                onBlur={() => setTouched({ ...touched, email: true })}
                onChange={updateField}
                placeholder="name@example.com"
              />
            </span>
            {touched.email && errors.email && <small>{errors.email}</small>}
          </label>
          <label className={touched.password && errors.password ? 'field-error' : ''}>
            Password
            <span>
              <LockKeyhole size={18} />
              <input
                name="password"
                type="password"
                value={form.password}
                onBlur={() => setTouched({ ...touched, password: true })}
                onChange={updateField}
                placeholder="Create a password"
              />
            </span>
            {touched.password && errors.password && <small>{errors.password}</small>}
          </label>
          <button className="button button-dark" type="button">
            Register
          </button>
        </form>
        <div className="auth-toggle">
          Already registered? <Link to="/login">Login instead</Link>
        </div>
      </div>
    </section>
  );
}
