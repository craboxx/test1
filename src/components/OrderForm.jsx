import React from 'react';

export default function OrderForm({ cart, onClose, onOrderPlaced }) {
  function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const customerName = form.name.value;
    const phoneNumber = form.phone.value;
    const place = form.place.value;
    const eventType = form.eventType.value;
    const eventDate = form.eventDate.value;
    const eventTime = form.eventTime.value;
    const orderNote = form.orderNote.value;

    let message = `📦 *Order Details*\n\n`;
    message += `*Name:* ${customerName}\n`;
    message += `*Phone Number:* ${phoneNumber}\n`;
    message += `*Place:* ${place}\n`;
    message += `*Event Type:* ${eventType}\n`;
    message += `*Event Date:* ${eventDate}\n`;
    message += `*Event Time:* ${eventTime}\n`;
    message += `*Order Notes:* ${orderNote}\n\n`;
    message += `🛒 *Order Items:*\n`;
    cart.forEach((product, index) => {
      message += `\n${index + 1}. *${product.productName}*`;
      if (product.imageUrl) message += `   ${product.imageUrl}`;
    });
    message += `\n\n *Please confirm the order.*`;

    const encodedMsg = encodeURIComponent(message);
    const whatsappPhoneNumber = '916238913819';
    window.open(`https://wa.me/${whatsappPhoneNumber}?text=${encodedMsg}`, '_blank');

    // Clear cart via parent after sending
    if (typeof onOrderPlaced === 'function') onOrderPlaced();
  }

  return (
    <form id="orderForm" onSubmit={handleSubmit} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'black', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: 20, boxSizing: 'border-box', zIndex: 99 }}>
      <div className="form-container" style={{ backgroundColor: '#ffffff', borderRadius: 8, boxShadow: '0 0 10px rgba(0,0,0,0.1)', width: '90%', maxWidth: 680, padding: 20 }}>
        <h3 style={{ color: '#1d3557', textAlign: 'center' }}>Order Details</h3>

        <label><b>Name:</b></label>
        <input name="name" type="text" placeholder="Enter your name" />

        <label><b>Phone Number:</b></label>
        <input name="phone" type="text" placeholder="Enter your phone number" />

        <label><b>Place:</b></label>
        <input name="place" type="text" placeholder="Enter your place" />

        <label><b>Event Type / Style:</b></label>
        <input name="eventType" type="text" placeholder="e.g. Marriage" />

        <label><b>Event Date:</b></label>
        <input name="eventDate" type="date" />

        <label><b>Event Time:</b></label>
        <input name="eventTime" type="time" />

        <label><b>Order Note:</b></label>
        <textarea name="orderNote" placeholder="Enter any suggestions or notes here"></textarea>

        <div className="form-actions" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit">Order on WhatsApp</button>
          <button type="button" id="cancelOrder" onClick={onClose} style={{ backgroundColor: '#f44336' }}>Cancel</button>
        </div>
      </div>
    </form>
  );
}
