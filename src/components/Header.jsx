import React from 'react';

function Header({ mapLoaded, loading }) {
  return (
    <header className="app-header">
      <h1>Washington DC Interactive Map</h1>
      <div className="status-indicators">
        <div className={`status-indicator ${mapLoaded ? 'loaded' : 'loading'}`}>
          <span className="status-dot"></span>
          Map: {mapLoaded ? 'Loaded' : 'Loading...'}
        </div>
        <div className={`status-indicator ${!loading ? 'loaded' : 'loading'}`}>
          <span className="status-dot"></span>
          Data: {!loading ? 'Ready' : 'Loading...'}
        </div>
      </div>
    </header>
  );
}

export default Header;