import React from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ mapData, onCountryClick, highestSeverity }) => {
  if (!mapData || mapData.length === 0) {
    return <div>No data available for the selected country.</div>;
  }

  // Set colors based on the highest severity passed from App.js
  const getStyle = (feature) => {
    let fillColor = '#00ff99'; // Default color for low severity (tealish green)
    if (highestSeverity === 'medium') fillColor = '#f4d03f'; // Yellow for medium
    if (highestSeverity === 'high') fillColor = '#f39c12'; // Orange for high
    if (highestSeverity === 'critical') fillColor = '#e74c3c'; // Red for critical

    return {
      fillColor: fillColor,
      weight: 1,
      color: 'black',  // Border color
      fillOpacity: 0.7,  // Fill opacity
    };
  };

  return (
    <MapContainer center={[35, 100]} zoom={3} style={{ width: '100%', height: '500px' }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {mapData.map((country, idx) => (
        <GeoJSON
          key={idx}
          data={country.geoJson}  // Assuming the geoJson data is available in each country's entry
          onClick={() => onCountryClick(country.properties.name)}  // Country click handler
          style={getStyle(country)}  // Apply the style based on highest severity
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;