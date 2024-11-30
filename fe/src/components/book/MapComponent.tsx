import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-hash";

const MapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null); // Sử dụng useRef để tham chiếu div chứa bản đồ

  useEffect(() => {
    if (mapRef.current) {
      // Tạo bản đồ với vị trí mặc định
      const map = L.map(mapRef.current).setView([21.036985, 105.782062], 18);

      // Thiết lập Tile Layer
      L.tileLayer("https://tmdt.fimo.edu.vn/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 21,
        maxNativeZoom: 20,
      }).addTo(map);

      // Thêm tính năng hash để chia sẻ URL
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const hash = new L.Hash(map);

      // Cleanup map khi component bị unmount
      return () => {
        map.remove();
      };
    }
  }, []);

  return (
    <div ref={mapRef} style={{ height: "100%", width: "100%", zIndex: 1 }}>
      {/* Div này sẽ chứa bản đồ */}
    </div>
  );
};

export default MapComponent;
