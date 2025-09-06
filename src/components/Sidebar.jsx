import React from 'react';
import StatusCard from './StatusCard';
import FeatureCard from './FeatureCard';
import ClickCard from './ClickCard';
import WelcomeCard from './WelcomeCard';

function Sidebar({ selectedFeature, lastMapClick, mapLoaded, loading }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Feature Information</h2>
        <p className="sidebar-subtitle">
          Click on markers or areas to view details
        </p>
      </div>
      <div className="sidebar-content">
        <StatusCard mapLoaded={mapLoaded} loading={loading} />
        {selectedFeature && <FeatureCard feature={selectedFeature} />}
        {lastMapClick && !selectedFeature && <ClickCard latlng={lastMapClick} />}
        {!selectedFeature && !lastMapClick && <WelcomeCard />}
      </div>
    </aside>
  );
}

export default Sidebar;