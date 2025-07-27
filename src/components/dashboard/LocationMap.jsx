import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Box } from '@mui/material';
import { api } from '../../api/api';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

const LocationMap = ({ deviceId }) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const data = await api.getDeviceLocations(deviceId);
      setLocations(data);
    };
    
    if (deviceId) {
      fetchLocations();
    }
  }, [deviceId]);

  useEffect(() => {
    if (locations.length === 0 || !mapContainer.current) return;

    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [locations[0]?.lng || 0, locations[0]?.lat || 0],
        zoom: 12
      });
    }

    // Add markers
    locations.forEach(location => {
      new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`
          <h3>${new Date(location.timestamp).toLocaleString()}</h3>
          <p>Lat: ${location.lat.toFixed(6)}</p>
          <p>Lng: ${location.lng.toFixed(6)}</p>
        `))
        .addTo(map.current);
    });

    // Add line
    if (locations.length > 1) {
      const coordinates = locations.map(loc => [loc.lng, loc.lat]);
      
      map.current.on('load', () => {
        map.current.addSource('route', {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates
            }
          }
        });
        
        map.current.addLayer({
          id: 'route',
          type: 'line',
          source: 'route',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#3887be',
            'line-width': 5,
            'line-opacity': 0.75
          }
        });
      });
    }

    return () => {
      if (map.current) map.current.remove();
    };
  }, [locations]);

  return (
    <Box sx={{ height: 500, width: '100%', borderRadius: 2, overflow: 'hidden' }}>
      <div ref={mapContainer} style={{ height: '100%', width: '100%' }} />
    </Box>
  );
};

export default LocationMap;
