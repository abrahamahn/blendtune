import React from 'react';

interface PlayIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const PlayIcon: React.FC<PlayIconProps> = ({ width, height, fill }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      fill={fill}
      stroke={fill}
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polygon points='5 3 19 12 5 21 5 3' />
    </svg>
  );
};

export default PlayIcon;
