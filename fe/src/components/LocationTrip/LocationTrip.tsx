import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
  address: string;
  lat: number;
  lng: number;
}

const LocationTrip: React.FC = () => {
  const location = useLocation(); // Get location passed via state
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  useEffect(() => {
    // Get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error fetching current location:', error);
      }
    );
  }, []);

  useEffect(() => {
    if (currentLocation && location.state) {
      // Create the map when both currentLocation and state are available
      const map = L.map('map', {
        center: [currentLocation.lat, currentLocation.lng],
        zoom: 13,
      });

      // Thiết lập Tile Layer
      L.tileLayer('https://tmdt.fimo.edu.vn/hot/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 21,
        maxNativeZoom: 20,
      }).addTo(map);

      // Thêm tính năng hash để chia sẻ URL
      new L.Hash(map);

      // Thêm Geocoder để tìm kiếm địa điểm
      const geocoder = L.Control.geocoder({
        defaultMarkGeocode: true,
      }).addTo(map);

      // Tọa độ pickup và dropoff
      const pickupLatLng = L.latLng(currentLocation.lat, currentLocation.lng); // Current location
      const dropoffLatLng = L.latLng(location.state.location.lat, location.state.location.lng); // Destination from LocationDriver

      // Thêm tính năng chỉ đường
      const routingControl = L.Routing.control({
        waypoints: [pickupLatLng, dropoffLatLng],
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.nominatim(),
        serviceUrl: 'https://router.project-osrm.org/route/v1/',
      }).addTo(map);
    }
  }, [currentLocation, location.state]);

  if (!currentLocation) {
    return <div>Loading...</div>; // Wait for the current location to load
  }

  return (
    <div id="map" style={{ height: '100vh' }}>
      {/* The map will be rendered inside this div */}
    </div>
  );
};

export default LocationTrip;
