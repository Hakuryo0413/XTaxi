import React from "react";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();  
  const handleBookTaxiClick = () => {
    navigate('/book-taxi');  
  };

  const handleGetEstimateClick = () => {
    navigate('/get-estimate');  
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-primary p-2 ">
      <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
        Welcome to the Xtaxi!
      </h1>
      <p className="text-base sm:text-lg text-white mb-4 text-center sm:text-left">
        Book a ride with ease and reach your destination with comfort. <p>Start by entering your current and destination locations.</p>
      </p>
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-2">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 mb-4 sm:mb-0 text-base sm:text-lg md:text-xl"
          onClick={handleBookTaxiClick}  
        >
          BOOK TAXI
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-600 text-base sm:text-lg md:text-xl"
          onClick={handleGetEstimateClick}  
        >
          GET ESTIMATE
        </button>
      </div>
    </div>
  );
};

export default Home;
