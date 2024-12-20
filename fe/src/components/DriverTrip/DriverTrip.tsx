import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DriverTrip.css";
import { RideId, baseRideUrl } from "@src/utils/common";
import axios from 'axios';

const driver_id = localStorage.getItem("user_id");

interface Location {
  address: string;
  lat: number;
  lng: number;
}

interface User {
  location: {
    type: string;
    coordinates: [number, number];
  };
  _id: string;
  username: string;
  password: string;
  role: string;
  name: string;
  phone_number: string;
  email: string;
  rating: number;
  income: number;
  created_at: string;
  updated_at: string;
  __v: number;
}

export interface Trip {
  pickup_location: Location;
  dropoff_location: Location;
  _id: string;
  user_id: User;
  status: string;
  fare: number;
  start_time: string;
  distance: number;
  created_at: string;
  updated_at: string;
  __v: number;
}

const DriverTrip: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const navigate = useNavigate();

  // Fetch trips data
  const fetchData = async () => {
    try {
      const response = await fetch(`${baseRideUrl}/requested`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const result = await response.json();
      console.log(result.rides);
      setTrips(result.rides);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Handle location redirection
  const handleLocation = (trip: Trip) => {
    localStorage.setItem(RideId, trip._id);
    navigate("/driver/locationTrip", {
      state: { pickup: trip.pickup_location, dropoff: trip.dropoff_location },
    });
  };

  // Update status of the trip (accept the ride)
  const handleStatus = async (trip: Trip) => {
    try {
      const response = await fetch(`${baseRideUrl}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ride_id: trip._id,
          driver_id: driver_id,
          status: "accepted",
        }),
      });
      console.log(response);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // Handle status update
  const handleAccept = async (id: string) => {
    localStorage.setItem(RideId, id);
    await handleStatus(trips.find((trip) => trip._id === id)!);
  };

  // Handle accept trip and create chat
  const handleChat = async (id: string) => {
    const trip = trips.find((trip) => trip._id === id);
    if (!trip) return;

    // Update ride status to accepted

    // Save RideId to localStorage

    // Create chat between driver and user
    try {
      const response = await axios.post('http://localhost:3000/chat/', {
        user_id: trip.user_id._id,
        driver_id: driver_id,
      });

      if (response.data.success) {
        // Save chatId to localStorage if chat is created successfully
        const chat = response.data.chat;
        localStorage.setItem('chatId', chat._id);

        // Navigate to chat page
        navigate(`/chat/${chat._id}`);
      } else {
        console.error('Failed to create chat');
      }
    } catch (error) {
      console.error('Error creating chat:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="history-trip-container">
      <table className="trip-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip._id}>
              <td>{trip.user_id?.name}</td>
              <td>{trip.user_id?.phone_number}</td>
              <td>{trip.pickup_location.address}</td>
              <td>{trip.status}</td>
              <td>
              <div class="button-container">
                {trip.status === "requested" ? (
                  <>
                    <button
                      className="accept-button"
                      onClick={() => {
                        handleAccept(trip._id);
                        handleLocation(trip);
                      }}
                      >
                      Accept
                    </button>
                  </>
                ) : (
                  <span></span>
                )}
                <button
                  className="pay-button"
                  onClick={() => handleLocation(trip)}
                >
                  Location
                </button>
                <button
                  className="pay-button1"
                  onClick={() => handleChat(trip._id)}
                >
                  Chat
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverTrip;
