import React from 'react';

interface MoreInfoIconProps {
  width: number;
  height: number;
  className?: string;
  fill: string;
}

const MoreInfoIcon: React.FC<MoreInfoIconProps> = ({ width, height, fill }) => {
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
      className='feather feather-more-vertical'
    >
      <circle cx='12' cy='12' r='1'></circle>
      <circle cx='12' cy='5' r='1'></circle>
      <circle cx='12' cy='19' r='1'></circle>
    </svg>
  );
};

export default MoreInfoIcon;
