import React from 'react';

type HomeIconProps = {
  width?: number;
  height?: number;
  fill?: string;
};

const HomeIcon: React.FC<HomeIconProps> = ({ width, height, fill }) => {
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
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" rx="20" ry="20"></path>
      <polyline points="9 22 9 12 15 12 15 22" rx="8" ry="8"></polyline>
    </svg>
  );
};

export default HomeIcon;
