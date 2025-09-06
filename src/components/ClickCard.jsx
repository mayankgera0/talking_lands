import React from 'react';

function ClickCard({ latlng }) {
  return (
    <div className="info-card click-card">
      <h3>Map Click Location</h3>
      <div className="coordinates">
        <div className="coordinate-item">
          <span className="coord-label">Latitude:</span>
          <span className="coord-value">{latlng.lat.toFixed(6)}</span>
        </div>
        <div className="coordinate-item">
          <span className="coord-label">Longitude:</span>
          <span className="coord-value">{latlng.lng.toFixed(6)}</span>
        </div>
      </div>
    </div>
  );
}

export default ClickCard;