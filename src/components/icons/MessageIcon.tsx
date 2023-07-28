import React from 'react';

interface MessageIconProps {
  width?: number;
  height?: number;
  className?: string;
};

const MessageIcon: React.FC<MessageIconProps> = ({ width, height }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="22" y1="2" x2="11" y2="13" rx="20" ry="20"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2" rx="5" ry="5"></polygon>
    </svg>
  );
};

export default MessageIcon;