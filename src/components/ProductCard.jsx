import React, { useState } from 'react';

export default function ProductCard({ data, addToCart, isAdded }) {
  const [showModal, setShowModal] = useState(false);
  const [rotated, setRotated] = useState(false);

  return (
    <div className="product-card">
      <img src={data.imageUrl} alt={data.productName} className="product-image" onClick={() => setShowModal(true)} />
      <div className="card-content" align="center">
        <h3>{data.productName}</h3>
        <button className="add-to-cart-btn" data-id={data.id} onClick={() => addToCart({ id: data.id, productName: data.productName, rate: data.rate, imageUrl: data.imageUrl })} disabled={isAdded}>{isAdded ? 'Added' : 'Add to Cart'}</button>
      </div>

      {showModal && (
        <div className="image-modal" onClick={() => setShowModal(false)}>
          <div className="modal-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', width: '100vw', paddingTop: '5vh' }}>
            <img src={data.imageUrl} className={`modal-image ${rotated ? 'rotated' : ''}`} style={{ maxWidth: '90vw', maxHeight: '90vh', transition: 'transform 0.3s ease', cursor: 'pointer' }} onClick={(e) => { e.stopPropagation(); if (!rotated) setRotated(true); else setShowModal(false); }} />
          </div>
        </div>
      )}
    </div>
  );
}
