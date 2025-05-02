import React from 'react';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 150, height = 50, className = '' }) => {
  return (
    <img
      src="/src/assets/img/logo.svg"
      alt="Company Logo"
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Logo;