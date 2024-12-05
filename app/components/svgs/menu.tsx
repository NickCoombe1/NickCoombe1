import React from "react";

interface IconProps {
  mode: string;
}

const Menu: React.FC<IconProps> = ({ mode }) => {
  return (
    <svg
      width="35"
      height="36"
      viewBox="0 0 37 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transform scale-150"
    >
      <path
        d="M9 13H26"
        stroke={
          mode === "light" ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)"
        }
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 18H26"
        stroke={
          mode === "light" ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)"
        }
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 23H26"
        stroke={
          mode === "light" ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)"
        }
        strokeWidth="2"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_58_784"
          x1="35"
          y1="18"
          x2="0"
          y2="18"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#CDFFFF" />
          <stop offset="1" stopColor="#FFD4D4" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Menu;
