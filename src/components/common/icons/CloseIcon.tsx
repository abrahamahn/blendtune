import React from 'react';

interface CloseIconProps {
  width?: number;
  height?: number;
  onClick?: () => void;
}

const CloseIcon: React.FC<CloseIconProps> = ({ width, height, onClick }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={width}
    height={height}
    viewBox='0 0 24 24'
    onClick={onClick}
  >
    <path d='M18.364 6.636c-.292-.293-.768-.293-1.06 0l-5.304 5.304L6.636 6.636c-.293-.293-.768-.293-1.06 0s-.293.768 0 1.06l5.304 5.304L5.576 17.364c-.293.293-.293.768 0 1.06.146.147.338.22.53.22s.384-.073.53-.22l5.304-5.304 5.304 5.304c.146.147.338.22.53.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-5.304-5.304 5.304-5.304c.293-.293.293-.768 0-1.06z' />
  </svg>
);

export default CloseIcon;
