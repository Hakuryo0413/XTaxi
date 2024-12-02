import * as React from "react";
const Card = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    viewBox="0 0 20 20"
    fill="white"
    {...props}
  >
    <path
      d="M1.5 4A1.5 1.5 0 0 0 0 5.5v10A1.5 1.5 0 0 0 1.5 17h17a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 18.5 4h-17zm-.035 1A.5.5 0 0 1 1.5 5h17a.5.5 0 0 1 .5.5V6H1v-.5a.5.5 0 0 1 .465-.5zM1 7h18v1.996H1V7zm0 3h18v5.5a.5.5 0 0 1-.5.5h-17a.5.5 0 0 1-.5-.5V10zm1 1v1h11v-1H2z"
      style={{
        // fill: "#222",
        fillOpacity: 1,
        stroke: "none",
        strokeWidth: 0,
      }}
    />
  </svg>
);
export default Card;
