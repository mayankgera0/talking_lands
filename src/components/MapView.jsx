import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Component to handle map events
function MapEvents({ onMapClick, onMapLoad }) {
  const map = useMapEvents({
    click: (e) => {
      // Only trigger if clicking on the map itself, not on features
      if (onMapClick) {
        onMapClick(e.latlng);
      }
    },
  });

  useEffect(() => {
    if (onMapLoad) {
      onMapLoad();
    }
  }, [map, onMapLoad]);

  return null;
}

// Component to auto-fit map bounds to polygon data
function FitBounds({ polygonsData }) {
  const map = useMap();

  useEffect(() => {
    if (map && polygonsData && polygonsData.features.length > 0) {
      try {
        // Create a temporary GeoJSON layer to calculate bounds
        const tempLayer = window.L.geoJSON(polygonsData);
        const bounds = tempLayer.getBounds();
        
        if (bounds.isValid()) {
          map.fitBounds(bounds, { padding: [20, 20] });
        }
      } catch (error) {
        console.warn('Could not fit bounds:', error);
      }
    }
  }, [map, polygonsData]);

  return null;
}

function MapView({ pointsData, polygonsData, onFeatureClick, onMapClick, onMapLoad }) {
  const polygonLayerRef = useRef(null);

  // Style function for polygon features
  const getPolygonStyle = (feature) => {
    const density = feature.properties.density || 0;
    
    // Color coding based on population density
    let fillColor = '#3b82f6'; // Default blue
    let fillOpacity = 0.3;
    
    if (density > 5000) {
      fillColor = '#ef4444'; // Red for high density
      fillOpacity = 0.5;
    } else if (density > 3000) {
      fillColor = '#f59e0b'; // Orange for medium-high density  
      fillOpacity = 0.4;
    } else if (density > 1000) {
      fillColor = '#10b981'; // Green for medium density
      fillOpacity = 0.3;
    }

    return {
      fillColor,
      fillOpacity,
      color: '#1f2937',
      weight: 2,
      opacity: 0.8,
    };
  };

  // Custom marker function for point features
  const pointToLayer = (feature, latlng) => {
    const type = feature.properties.type || 'default';
    
    // Different styles based on point type
    let radius = 8;
    let color = '#3b82f6';
    let fillColor = '#60a5fa';
    
    switch (type) {
      case 'city':
        radius = 12;
        color = '#dc2626';
        fillColor = '#f87171';
        break;
      case 'landmark':
        radius = 10;
        color = '#7c3aed';
        fillColor = '#a78bfa';
        break;
      case 'neighborhood':
        radius = 8;
        color = '#059669';
        fillColor = '#34d399';
        break;
      default:
        radius = 6;
        color = '#374151';
        fillColor = '#9ca3af';
    }

    return window.L.circleMarker(latlng, {
      radius,
      color,
      weight: 2,
      fillColor,
      fillOpacity: 0.8,
    });
  };

  // Event handler for feature interactions
  const onEachFeature = (feature, layer) => {
    // Click event
    layer.on('click', (e) => {
      // Prevent map click event from firing
      window.L.DomEvent.stopPropagation(e);
      
      if (onFeatureClick) {
        onFeatureClick(feature);
      }
    });

    // Hover events for better UX
    layer.on('mouseover', () => {
      if (layer.setStyle && feature.geometry.type !== 'Point') {
        layer.setStyle({
          weight: 3,
          opacity: 1,
        });
      }
    });

    layer.on('mouseout', () => {
      if (layer.setStyle && feature.geometry.type !== 'Point') {
        if (polygonLayerRef.current) {
          polygonLayerRef.current.resetStyle(layer);
        }
      }
    });

    // Bind popup for additional info
    if (feature.properties.name) {
      layer.bindPopup(`
        <div style="max-width: 200px;">
          <h4 style="margin: 0 0 8px 0;">${feature.properties.name}</h4>
          ${feature.properties.description ? `<p style="margin: 0; font-size: 12px; color: #666;">${feature.properties.description}</p>` : ''}
        </div>
      `);
    }
  };

  return (
    <MapContainer
      center={[38.9072, -77.0369]} // Washington DC coordinates
      zoom={11}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      {/* Base map tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* Polygon layer */}
      {polygonsData && (
        <GeoJSON
          ref={polygonLayerRef}
          data={polygonsData}
          style={getPolygonStyle}
          onEachFeature={onEachFeature}
        />
      )}

      {/* Points layer */}
      {pointsData && (
        <GeoJSON
          data={pointsData}
          pointToLayer={pointToLayer}
          onEachFeature={onEachFeature}
        />
      )}

      {/* Auto-fit bounds */}
      <FitBounds polygonsData={polygonsData} />
      
      {/* Map event handlers */}
      <MapEvents onMapClick={onMapClick} onMapLoad={onMapLoad} />
    </MapContainer>
  );
}

export default MapView;
