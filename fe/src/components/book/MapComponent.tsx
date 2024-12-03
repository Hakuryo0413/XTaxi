import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-hash";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-easybutton/src/easy-button.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";
import "leaflet-routing-machine/dist/leaflet-routing-machine.js";
import "leaflet-easybutton/src/easy-button.js";

type MapComponentProps = {
  onDistanceChange: (
    distance: number,
    pickupLocation: Location,
    dropoffLocation: Location
  ) => void; // Callback to send distance and locations to parent component
};

type Location = {
  address: string;
  lat: number;
  lng: number;
};

const MapComponent: React.FC<MapComponentProps> = React.memo(
  ({ onDistanceChange }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<L.Map | null>(null);
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
          console.error("Error fetching current location:", error);
        }
      );
    }, []);

    useEffect(() => {
      if (mapRef.current && !mapInstanceRef.current) {
        // Tạo bản đồ với vị trí mặc định
        const map = L.map(mapRef.current).setView([21.036985, 105.782062], 18);
        mapInstanceRef.current = map;

        // Thiết lập Tile Layer
        L.tileLayer("https://tmdt.fimo.edu.vn/hot/{z}/{x}/{y}.png", {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
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
        const routingControl = L.Routing.control({
          waypoints: [
            L.latLng(currentLocation.lat, currentLocation.lng),
            L.latLng(21.036985, 105.782062),
          ],
          routeWhileDragging: true,
          geocoder: L.Control.Geocoder.nominatim(),
          serviceUrl: "https://router.project-osrm.org/route/v1/",
        });
    
        routingControl.on("routesfound", async (e) => {
          const route = e.routes[0];
          const totalDistance = route.summary.totalDistance;
    
          const pickupLatLng = routingControl.getWaypoints()[0].latLng;
          const dropoffLatLng = routingControl.getWaypoints()[1].latLng;
    
          const pickupAddress = await reverseGeocode(pickupLatLng);
          const dropoffAddress = await reverseGeocode(dropoffLatLng);
    
          const pickupLocation: Location = {
            address: pickupAddress,
            lat: pickupLatLng.lat,
            lng: pickupLatLng.lng,
          };
    
          const dropoffLocation: Location = {
            address: dropoffAddress,
            lat: dropoffLatLng.lat,
            lng: dropoffLatLng.lng,
          };
    
          onDistanceChange(totalDistance, pickupLocation, dropoffLocation);
        });

        routingControl.addTo(mapInstanceRef.current);
        // Nút dễ dàng điều chỉnh điểm bắt đầu
        L.easyButton(
          "fa-car",
          (btn, map) => {
            routingControl.spliceWaypoints(0, 1, map.getCenter());
          },
          "Chỉ đường từ đây"
        ).addTo(map);

        // Cleanup khi component bị unmount
        return () => {
          map.remove();
          mapInstanceRef.current = null;
        };
      }
    }, [currentLocation, onDistanceChange]);

    if (!currentLocation) {
      return <div>Loading...</div>; // Wait for the current location to load
    }

    // Hàm reverse geocoding để lấy địa chỉ từ tọa độ
    const reverseGeocode = async (latLng: L.LatLng): Promise<string> => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latLng.lat}&lon=${latLng.lng}&format=json`
        //'https://api.tomtom.com/search/2/reverseGeocode/${latLng.lat},${latLng.lng}.json?key=${7f3JGEevFUfR7Og8SvonyvJym2HAzhFF}'
        //'https://tmdt.fimo.edu.vn/nominatim/reverse?lat=${latLng.lat}&lon=${latLng.lng}&format=json'
      );
      const data = await response.json();
      return data.display_name || "Unknown address";
    };

    return <div ref={mapRef} style={{ height: "100%", width: "100%" }}></div>;
  }
);

export default MapComponent;
