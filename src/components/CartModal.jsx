import React from 'react';

export default function CartModal({ show, cart, removeFromCart, onClose }) {
  if (!show) return null;
  return (
    <div id="cartModal" style={{ display: 'block', position: 'fixed', top: 80, right: 20, background: 'white', padding: 20, border: '1px solid #ccc', boxShadow: '0 2px 10px rgba(0,0,0,0.2)', maxWidth: 300, zIndex: 999 }}>
      <h3>Your Cart</h3>
      <ul id="cartList">
        {cart.map((item, idx) => (
          <li key={item.id} style={{ padding: '8px 0', borderBottom: '1px solid #f0f0f0' }}>
            {item.productName} - {item.rate}
            <button className="remove-item-btn" data-index={idx} style={{ marginLeft: 8 }} onClick={() => removeFromCart(idx)}>🗑️</button>
          </li>
        ))}
      </ul>
      <button id="closeCartBtn" onClick={onClose}>Close</button>
    </div>
  );
}
