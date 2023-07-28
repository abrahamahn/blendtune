import React, { FC } from "react";

interface PlusIconProps {
  width: number;
  height: number;
  className?: string;
  onClick?: () => void;
  fill?: string;
}

const PlusIcon: React.FC<PlusIconProps> = ({ width, height, fill }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={fill}
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
};

export default PlusIcon;
