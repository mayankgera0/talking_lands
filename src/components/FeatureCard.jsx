import React from 'react';

function FeatureCard({ feature }) {
  const { properties, geometry } = feature;
  return (
    <div className="info-card feature-card">
      <div className="card-header">
        <h3>{properties.name || 'Unnamed Feature'}</h3>
        <span className="feature-type">{geometry.type}</span>
      </div>
      <div className="card-content">
        {properties.type && (
          <div className="property-item">
            <span className="property-label">Type:</span>
            <span className="property-value">{properties.type}</span>
          </div>
        )}
        {properties.description && (
          <div className="property-item">
            <span className="property-label">Description:</span>
            <span className="property-value">{properties.description}</span>
          </div>
        )}
        {properties.population && (
          <div className="property-item">
            <span className="property-label">Population:</span>
            <span className="property-value">
              {properties.population.toLocaleString()}
            </span>
          </div>
        )}
        {properties.density && (
          <div className="property-item">
            <span className="property-label">Density:</span>
            <span className="property-value">
              {properties.density} people/sq mi
            </span>
          </div>
        )}
        {properties.area_sq_miles && (
          <div className="property-item">
            <span className="property-label">Area:</span>
            <span className="property-value">
              {properties.area_sq_miles} sq mi
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default FeatureCard;