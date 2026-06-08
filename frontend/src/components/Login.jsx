import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { LockKeyhole, Mail } from 'lucide-react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [touched, setTouched] = useState({});

  const errors = useMemo(
    () => ({
      email: form.email && !/^\S+@\S+\.\S+$/.test(form.email) ? 'Use a valid email address.' : '',
      password: form.password && form.password.length < 6 ? 'Password must be at least 6 characters.' : '',
    }),
    [form],
  );

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <p className="eyebrow">Welcome back</p>
        <h1>Login to Vogue Plaza</h1>
        <p>Access your bag, saved edits, and premium checkout details.</p>
        <form className="auth-form">
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
                placeholder="Enter your password"
              />
            </span>
            {touched.password && errors.password && <small>{errors.password}</small>}
          </label>
          <button className="button button-dark" type="button">
            Login
          </button>
        </form>
        <div className="auth-toggle">
          New to Vogue Plaza? <Link to="/register">Create an account</Link>
        </div>
      </div>
    </section>
  );
}
