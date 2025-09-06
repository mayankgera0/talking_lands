import React from 'react';

function StatusCard({ mapLoaded, loading }) {
  return (
    <div className="info-card status-card">
      <h3>Map Status</h3>
      <div className="status-details">
        <div className="status-item">
          <span className="label">Map:</span>
          <span className={`value ${mapLoaded ? 'success' : 'pending'}`}>
            {mapLoaded ? '✓ Loaded' : '⏳ Loading...'}
          </span>
        </div>
        <div className="status-item">
          <span className="label">Data:</span>
          <span className={`value ${!loading ? 'success' : 'pending'}`}>
            {!loading ? '✓ Ready' : '⏳ Loading...'}
          </span>
        </div>
      </div>
    </div>
  );
}

export default StatusCard;