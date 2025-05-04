import React from 'react';
import logo from '../assets/img/logo.svg';

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ width = 150, height = 50, className = '' }) => {
  return (
    <img
      src={logo}
      alt="Company Logo"
      width={width}
      height={height}
      className={className}
    />
  );
};

export default Logo;