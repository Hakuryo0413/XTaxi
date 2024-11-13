import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate từ React Router

const Home: React.FC = () => {
  const navigate = useNavigate();  // Khởi tạo useNavigate hook để điều hướng

  // Hàm xử lý khi người dùng click vào nút "BOOK TAXI"
  const handleBookTaxiClick = () => {
    navigate('/book-taxi');  // Chuyển hướng đến trang đặt taxi (giả sử đường dẫn là "/book-taxi")
  };

  // Hàm xử lý khi người dùng click vào nút "GET ESTIMATE"
  const handleGetEstimateClick = () => {
    navigate('/get-estimate');  // Chuyển hướng đến trang ước tính chi phí (giả sử đường dẫn là "/get-estimate")
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-primary p-2 bg-[url('/src/image/cab-blue2.png')] p-2 hover:bg-[url('/src/image/cab-blue2.png')]">
      <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
        Welcome to the Xtaxi!
      </h1>
      <p className="text-base sm:text-lg text-white mb-4 text-center sm:text-left">
        Book a ride with ease and reach your destination with comfort. <p>Start by entering your current and destination locations.</p>
      </p>
      <div className="flex flex-col sm:flex-row sm:space-x-4 mb-2">
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 mb-4 sm:mb-0 text-base sm:text-lg md:text-xl"
          onClick={handleBookTaxiClick}  // Thêm sự kiện onClick để điều hướng
        >
          BOOK TAXI
        </button>
        <button
          className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-gray-600 text-base sm:text-lg md:text-xl"
          onClick={handleGetEstimateClick}  // Thêm sự kiện onClick để điều hướng
        >
          GET ESTIMATE
        </button>
      </div>
    </div>
  );
};

export default Home;
