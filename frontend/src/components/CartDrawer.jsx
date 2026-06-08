import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, CreditCard, Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  postalCode: '',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: '',
};

function CheckoutPanel({ items, total, onBack, onSuccess }) {
  const [step, setStep] = useState('billing');
  const [form, setForm] = useState(initialForm);
  const tax = total * 0.08;
  const grandTotal = total + tax;

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const submitBilling = (event) => {
    event.preventDefault();
    setStep('payment');
  };

  const submitPayment = (event) => {
    event.preventDefault();
    setStep('success');
  };

  if (step === 'success') {
    return (
      <div className="checkout-success">
        <div className="success-icon">
          <Check size={34} />
        </div>
        <p className="eyebrow">Order successful</p>
        <h2>Your Vogue Plaza order is confirmed.</h2>
        <p>
          A polished receipt has been prepared for {form.email}. Your order reference is
          VP-{Math.floor(100000 + Math.random() * 900000)}.
        </p>
        <div className="receipt-card">
          <span>Paid amount</span>
          <strong>${grandTotal.toFixed(2)}</strong>
          <small>Card ending {form.cardNumber.slice(-4) || '0000'}</small>
        </div>
        <button className="button button-dark" onClick={onSuccess}>
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-panel">
      <div className="drawer-heading">
        <button className="icon-button" onClick={step === 'billing' ? onBack : () => setStep('billing')} aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
        <div>
          <p className="eyebrow">{step === 'billing' ? 'Checkout' : 'Secure payment'}</p>
          <h2>{step === 'billing' ? 'Billing Details' : 'Payment Details'}</h2>
        </div>
      </div>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={step === 'billing' ? submitBilling : submitPayment}>
          {step === 'billing' ? (
            <>
              <label>
                Full Name
                <input required name="fullName" value={form.fullName} onChange={updateField} placeholder="Enter your full name" />
              </label>
              <label>
                Email Address
                <input required type="email" name="email" value={form.email} onChange={updateField} placeholder="name@example.com" />
              </label>
              <label>
                Phone Number
                <input required name="phone" value={form.phone} onChange={updateField} placeholder="+1 555 0134" />
              </label>
              <label className="span-two">
                Billing Address
                <input required name="address" value={form.address} onChange={updateField} placeholder="Street address and apartment" />
              </label>
              <label>
                City
                <input required name="city" value={form.city} onChange={updateField} placeholder="City" />
              </label>
              <label>
                Postal Code
                <input required name="postalCode" value={form.postalCode} onChange={updateField} placeholder="Postal code" />
              </label>
              <button className="button button-dark span-two" type="submit">
                Proceed to Payment
              </button>
            </>
          ) : (
            <>
              <label className="span-two">
                Name on Card
                <input required name="cardName" value={form.cardName} onChange={updateField} placeholder="Name printed on card" />
              </label>
              <label className="span-two input-with-icon">
                Card Number
                <CreditCard size={18} />
                <input required name="cardNumber" value={form.cardNumber} onChange={updateField} placeholder="4242 4242 4242 4242" maxLength="19" />
              </label>
              <label>
                Expiry
                <input required name="expiry" value={form.expiry} onChange={updateField} placeholder="MM/YY" maxLength="5" />
              </label>
              <label>
                CVV
                <input required name="cvv" value={form.cvv} onChange={updateField} placeholder="123" maxLength="4" />
              </label>
              <button className="button button-dark span-two" type="submit">
                Pay ${grandTotal.toFixed(2)}
              </button>
            </>
          )}
        </form>

        <aside className="receipt-card">
          <h3>Receipt Breakdown</h3>
          {items.map((item) => (
            <div className="receipt-line" key={item.cartKey}>
              <span>{item.name} x {item.quantity}</span>
              <strong>${(item.price * item.quantity).toFixed(2)}</strong>
            </div>
          ))}
          <div className="receipt-line">
            <span>Subtotal</span>
            <strong>${total.toFixed(2)}</strong>
          </div>
          <div className="receipt-line">
            <span>Estimated tax</span>
            <strong>${tax.toFixed(2)}</strong>
          </div>
          <div className="receipt-line">
            <span>Delivery</span>
            <strong>Free</strong>
          </div>
          <div className="receipt-total">
            <span>Total</span>
            <strong>${grandTotal.toFixed(2)}</strong>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default function CartDrawer({ isOpen, onClose, items, total, updateQuantity, removeItem, clearCart }) {
  const navigate = useNavigate();
  const location = useLocation();
  const inCheckout = location.pathname === '/checkout';

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  const closeDrawer = () => {
    if (inCheckout) {
      navigate('/');
    }
    onClose();
  };

  const completeOrder = () => {
    clearCart();
    navigate('/');
    onClose();
  };

  return (
    <>
      <div className={isOpen ? 'drawer-backdrop show' : 'drawer-backdrop'} onClick={closeDrawer} />
      <aside className={isOpen ? 'cart-drawer open' : 'cart-drawer'} aria-hidden={!isOpen}>
        <div className="drawer-content">
          {inCheckout ? (
            <CheckoutPanel items={items} total={total} onBack={() => navigate('/')} onSuccess={completeOrder} />
          ) : (
            <>
              <div className="drawer-heading">
                <div>
                  <p className="eyebrow">Shopping bag</p>
                  <h2>{itemCount} {itemCount === 1 ? 'item' : 'items'}</h2>
                </div>
                <button className="icon-button" onClick={closeDrawer} aria-label="Close bag">
                  <X size={22} />
                </button>
              </div>

              <div className="bag-items">
                {items.length === 0 ? (
                  <div className="empty-bag">
                    <ShoppingBag size={42} />
                    <h3>Your bag is empty</h3>
                    <p>Open a product detail view and add your preferred size to begin checkout.</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <article className="bag-line" key={item.cartKey}>
                      <img src={item.image} alt={item.name} />
                      <div>
                        <span>{item.brand}</span>
                        <h3>{item.name}</h3>
                        <p>{item.selectedColor} / {item.selectedSize}</p>
                        <div className="quantity-row">
                          <button onClick={() => updateQuantity(item.cartKey, item.quantity - 1)} aria-label="Decrease quantity">
                            <Minus size={14} />
                          </button>
                          <strong>{item.quantity}</strong>
                          <button onClick={() => updateQuantity(item.cartKey, item.quantity + 1)} aria-label="Increase quantity">
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                      <div className="line-actions">
                        <button onClick={() => removeItem(item.cartKey)} aria-label="Remove item">
                          <Trash2 size={17} />
                        </button>
                        <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                      </div>
                    </article>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="bag-summary">
                  <div>
                    <span>Subtotal</span>
                    <strong>${total.toFixed(2)}</strong>
                  </div>
                  <div>
                    <span>Delivery</span>
                    <strong>Free</strong>
                  </div>
                  <button className="button button-dark" onClick={() => navigate('/checkout')}>
                    Proceed to Checkout
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </aside>
    </>
  );
}
