import React from 'react';

interface PauseIconProps {
  width: number;
  height: number;
  className?: string;
  onClick?: () => void;
  fill?: string;
}

const PauseIcon: React.FC<PauseIconProps> = ({ width, height, fill }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 26 26'
      fill={fill}
      stroke={fill}
      strokeWidth='1.5'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='feather feather-pause'
    >
      <rect x='6' y='4' width='4' height='16'></rect>
      <rect x='14' y='4' width='4' height='16'></rect>
    </svg>
  );
};

export default PauseIcon;
