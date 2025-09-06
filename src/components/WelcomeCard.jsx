import React from 'react';

function WelcomeCard() {
  return (
    <div className="info-card welcome-card">
      <h3>Welcome to the Interactive Map</h3>
      <p>
        This map displays locations and areas in the Washington DC region.
      </p>
      <div className="instructions">
        <h4>How to interact:</h4>
        <ul>
          <li>
            <strong>Point Markers:</strong> Click on circular markers to view location details
          </li>
          <li>
            <strong>Area Polygons:</strong> Click on colored areas to view population data
          </li>
          <li>
            <strong>Map Clicks:</strong> Click anywhere else to see coordinates
          </li>
        </ul>
      </div>
    </div>
  );
}

export default WelcomeCard;