import * as React from "react";
const Cash = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={28}
    height={28}
    fill="white"
    viewBox="0 0 24 24"
    {...props}
  >
    <g
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.25}
      clipPath="url(#a)"
    >
      <path d="M2 6h20v12H2z" />
      <path d="M22 10a4 4 0 0 1-4-4h4v4ZM18 18a4 4 0 0 1 4-4v4h-4ZM2 14a4 4 0 0 1 4 4H2v-4ZM6 6a4 4 0 0 1-4 4V6h4ZM14.074 9.5h-2.74c-.737 0-1.334.56-1.334 1.25S10.597 12 11.333 12h1.778c.736 0 1.333.56 1.333 1.25s-.597 1.25-1.333 1.25H10M12 9.517V8.5M12 15.517V14.5" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default Cash;
