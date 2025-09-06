import React, { useState, useEffect } from 'react';
import MapView from './components/MapView';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import './styles/App.css';

function App() {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [lastMapClick, setLastMapClick] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [pointsData, setPointsData] = useState(null);
  const [polygonsData, setPolygonsData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load GeoJSON data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Fetch points data
        const pointsResponse = await fetch('/data/points.geojson');
        const pointsJson = await pointsResponse.json();
        setPointsData(pointsJson);

        // Fetch polygons data  
        const polygonsResponse = await fetch('/data/polygons.geojson');
        const polygonsJson = await polygonsResponse.json();
        setPolygonsData(polygonsJson);
        
      } catch (error) {
        console.error('Error loading GeoJSON data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="app">
      <Header mapLoaded={mapLoaded} loading={loading} />
      <div className="main-content">
        <div className="map-container">
          {!loading && pointsData && polygonsData ? (
            <MapView
              pointsData={pointsData}
              polygonsData={polygonsData}
              onFeatureClick={setSelectedFeature}
              onMapClick={setLastMapClick}
              onMapLoad={() => setMapLoaded(true)}
            />
          ) : (
            <div className="map-loading">
              <div className="loading-spinner"></div>
              <p>Loading map data...</p>
            </div>
          )}
        </div>
        <Sidebar
          selectedFeature={selectedFeature}
          lastMapClick={lastMapClick}
          mapLoaded={mapLoaded}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
