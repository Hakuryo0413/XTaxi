import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DriverTrip.css";
import { baseRideUrl } from "@src/utils/common";

const driver_id = localStorage.getItem("user_id");

interface Location {
  address: string;
  lat: number;
  lng: number;
}

// interface Trip {
//   id: number;
//   name: string;
//   phone: string;
//   location: Location; // Updated to use the Location type
//   status: string; // e.g., "accepted", "completed", etc.
// }

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

interface Trip {
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
// const initialTrips: Trip[] = [
//   {
//     id: 1,
//     name: "Nguyen Van A",
//     phone: "045878415545",
//     location: {
//       address: "Hà Nội",
//       lat: 21.028511,
//       lng: 105.804817,
//     },
//     status: "requested",
//   },
//   {
//     id: 2,
//     name: "Sevan",
//     phone: "045878488885",
//     location: {
//       address: "YB Airport",
//       lat: 10.823099,
//       lng: 106.629662,
//     },
//     status: "requested",
//   },
//   // Add more trips as needed
// ];
const DriverTrip: React.FC = () => {
  // const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [trips, setTrips] = useState<Trip[]>([]);
  const navigate = useNavigate();

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
    navigate("/driver/locationTrip", {
      state: { location: trip.pickup_location },
    }); // Pass location to LocationMap
  };

  // const handleStatus = async (trip: Trip) => {
  //   try {
  //     const response = await fetch(`${baseRideUrl}/status`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         ride_id: trip._id,
  //         driver_id: driver_id,
  //         status: "accepted",
  //       }),
  //     });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // Handle status update
  const handleAccept = (id: string) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip._id === id ? { ...trip, status: "accepted" } : trip
      )
    );
  };

  useEffect(() => {
    fetchData();
    console.log(trips);
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
                {trip.status === "requested" ? (
                  <>
                    <button
                      className="accept-button"
                      onClick={() => handleAccept(trip._id)}
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
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DriverTrip;
