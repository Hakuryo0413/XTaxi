import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DriverTrip.css';

interface Location {
  address: string;
  lat: number;
  lng: number;
}

interface Trip {
  id: number;
  name: string;
  phone: string;
  location: Location; // Updated to use the Location type
  status: string; // e.g., "accepted", "completed", etc.
}

const initialTrips: Trip[] = [
  {
    id: 1,
    name: 'Nguyen Van A',
    phone: '045878415545',
    location: {
      address: 'Hà Nội',
      lat: 21.028511,
      lng: 105.804817,
    },
    status: 'requested',
  },
  {
    id: 2,
    name: 'Sevan',
    phone: '045878488885',
    location: {
      address: 'YB Airport',
      lat: 10.823099,
      lng: 106.629662,
    },
    status: 'requested',
  },
  // Add more trips as needed
];

const DriverTrip: React.FC = () => {
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const navigate = useNavigate();

  // Handle location redirection
  const handleLocation = (trip: Trip) => {
    navigate('/driver/locationTrip', { state: { location: trip.location } }); // Pass location to LocationMap
  };

  // Handle status update
  const handleAccept = (id: number) => {
    setTrips((prevTrips) =>
      prevTrips.map((trip) =>
        trip.id === id ? { ...trip, status: 'accepted' } : trip
      )
    );
  };

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
            <tr key={trip.id}>
              <td>{trip.name}</td>
              <td>{trip.phone}</td>
              <td>{trip.location.address}</td>
              <td>{trip.status}</td>
              <td>
                {trip.status === 'requested' ? (
                  <>
                    <button
                      className="accept-button"
                      onClick={() => handleAccept(trip.id)}
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
