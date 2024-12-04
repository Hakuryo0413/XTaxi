import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import L from "leaflet";
import { Button } from "antd";
import { RideId, UserId, baseRideUrl } from "@src/utils/common";
import { Trip } from "../DriverTrip/DriverTrip";
import "leaflet/dist/leaflet.css";

const driver_id = localStorage.getItem(UserId);
const ride_id = localStorage.getItem(RideId);

const LocationTrip: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [rideInfo, setRideInfo] = useState<Trip | null>(null);

  // Get ride info
  const getRide = async () => {
    try {
      const response = await fetch(`${baseRideUrl}/${ride_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      await setRideInfo(data?.ride);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

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
    getRide();
  }, []);

  useEffect(() => {
    if (currentLocation && location.state) {
      // Create the map when both currentLocation and state are available
      const map = L.map("map", {
        center: [currentLocation.lat, currentLocation.lng],
        zoom: 13,
      });

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

      const currentLatLng = L.latLng(currentLocation.lat, currentLocation.lng);
      const pickupLatLng = L.latLng(
        location.state.pickup.lat,
        location.state.pickup.lng
      );
      const dropoffLatLng = L.latLng(
        location.state.dropoff.lat,
        location.state.dropoff.lng
      );

      // Thêm tính năng chỉ đường
      const routingControl = L.Routing.control({
        waypoints: [currentLatLng, pickupLatLng, pickupLatLng, dropoffLatLng],
        routeWhileDragging: true,
        geocoder: L.Control.Geocoder.nominatim(),
        serviceUrl: "https://router.project-osrm.org/route/v1/",
      }).addTo(map);
    }
  }, [currentLocation, location.state]);

  if (!currentLocation) {
    return <div>Loading...</div>; // Wait for the current location to load
  }

  const updateRideStatus = async (newStatus: string) => {
    try {
      const response = await fetch(`${baseRideUrl}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ride_id: ride_id,
          driver_id: driver_id,
          status: newStatus,
        }),
      });
      getRide();
      if (newStatus === "completed") {
        navigate("/driver/DriverTrip");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  if (!currentLocation) {
    return <div>Loading...</div>; // Wait for the current location to load
  }

  return (
    <div>
      <div id="map" style={{ height: "100vh" }}></div>
      <div className="bg-primary flex justify-center pt-2">
        {rideInfo?.status !== "requested" && (
          <Button
            type="primary"
            onClick={() =>
              updateRideStatus(
                rideInfo?.status === "accepted" ? "in_progress" : "completed"
              )
            }
          >
            {rideInfo?.status === "accepted" ? "In Progress" : "Complete"}
          </Button>
        )}
      </div>
    </div>
  );
};

export default LocationTrip;