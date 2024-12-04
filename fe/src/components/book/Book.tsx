import React, { useCallback, useEffect, useState } from "react";
import "./Book.css";
import { useNavigate } from "react-router-dom";
import MapComponent from "./MapComponent";
import imgTaxi1 from "@src/image/sedan10.png";
import imgTaxi2 from "@src/image/van10.png";
import { Offers } from "../Payment";
import { UserId } from "@src/utils/common";

type Location = {
  address: string;
  lat: number;
  lng: number;
};

const user_id = localStorage.getItem(UserId);

const Book: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCar, setSelectedCar] = useState<string | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [bookingStatus, setBookingStatus] = useState<string | null>(null);
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null); // Lưu thông tin điểm bắt đầu
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null); // Lưu thông tin điểm kết thúc
  const [offers, setOffers] = useState(0);
  const navigate = useNavigate();

  
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setOffers(10);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Callback để nhận thông tin từ MapComponent
  const handleDistanceChange = useCallback(
    (
      newDistance: number,
      newPickupLocation: Location,
      newDropoffLocation: Location
    ) => {
      console.log("Distance:", newDistance);
      console.log("Pickup:", newPickupLocation);
      console.log("Dropoff:", newDropoffLocation);

      setDistance(newDistance);
      setPickupLocation(newPickupLocation);
      setDropoffLocation(newDropoffLocation);
    },
    [] // Không tạo lại hàm khi không cần thiết
  );

  const handleChoose = (carType: string) => {
    setSelectedCar(carType);
    setBookingStatus(null); // Reset booking status
  };

  const handleEstimate = (carType: string) => {
    handleChoose(carType);
    const rate = selectedCar === "Van" ? 15000 : 10000;
    const fare = (distance / 1000) * rate;
    setBookingStatus(
      `Booked a ${selectedCar} for ${(distance / 1000).toFixed(2)} km. Fare: ${(
        fare *
        (1 - offers / 100)
      ).toLocaleString()}đ.`
    );
  };

  useEffect(() => {
    handleEstimate(selectedCar);
  }, [offers, selectedCar]);

  // Handle ride booking
  const handleBooking = async () => {
    if (!pickupLocation || !dropoffLocation || !distance || !selectedCar) {
      alert("Please complete all fields before booking.");
      return;
    }

    const fare =
      selectedCar === "Van"
        ? (distance / 1000) * 15000 * (1 - offers / 100)
        : (distance / 1000) * 10000 * (1 - offers / 100);

    // In dữ liệu gửi đi để kiểm tra
    console.log("Sending request with data:", {
      user_id: user_id,
      pickup_location: pickupLocation,
      dropoff_location: dropoffLocation,
      distance,
      fare,
      start_time: new Date(),
    });

    try {
      const response = await fetch("http://localhost:3000/ride/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id, // Thay bằng user_id thực tế
          pickup_location: pickupLocation,
          dropoff_location: dropoffLocation,
          distance,
          fare,
          start_time: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.success) {
        setBookingStatus(
          `Ride successfully booked! Fare: ${fare.toLocaleString()}đ.`
        );
        navigate("/payment");
      } else {
        setBookingStatus(
          `Failed to book ride: ${data.message || "Please try again."}`
        );
      }
    } catch (error) {
      console.error("Error booking ride:", error);
      setBookingStatus(
        `There was an error booking the ride: ${
          error.message || "Unknown error."
        }`
      );
    }
  };

  return (
    <div className="book-container">
      <div className="book-left">
        <MapComponent onDistanceChange={handleDistanceChange} />
      </div>
      <div className="book-right">
        <div className="book-right-top">
          <div className="book-right-item">
            <img src={imgTaxi1} alt="Sedan" className="item-image" />
            <p className="item-text">10.000đ / Km</p>
            <p className="item-text">1-4 passengers</p>
            <button
              className="item-button"
              onClick={() => handleEstimate("Sedan")}
              disabled={selectedCar === "Sedan"}
            >
              {selectedCar === "Sedan" ? "CHOSEN" : "CHOOSE"}
            </button>
          </div>
          <div className="book-right-item">
            <img src={imgTaxi2} alt="Van" className="item-image" />
            <p className="item-text">15.000đ / Km</p>
            <p className="item-text">4-7 passengers</p>
            <button
              className="item-button"
              onClick={() => handleEstimate("Van")}
              disabled={selectedCar === "Van"}
            >
              {selectedCar === "Van" ? "CHOSEN" : "CHOOSE"}
            </button>
          </div>
        </div>
        <div className="book-right-bottom">
          <div className="book-right-item">
            <p className="item-text">
              {bookingStatus && <p className="item-text">{bookingStatus}</p>}
            </p>
            <div>
              <button style={{ paddingInlineEnd: 40 }} onClick={showModal}>
                Coupons
              </button>

              <button className="item-button" onClick={handleBooking}>
                BOOK
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <Offers open={isModalOpen} onOk={handleOk} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default Book;