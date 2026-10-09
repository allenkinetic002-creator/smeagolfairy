import React from 'react';

export interface AeriBellIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

/**
 * AeriBellIcon - Clean cartoon notification bell icon
 * Inspired by -=[;z png.jpg:
 * Rounded dome top, smoothly flared bell skirt with curved corners,
 * upward-arched bottom rim, and centered loop clapper.
 */
export const AeriBellIcon: React.FC<AeriBellIconProps> = ({
  size = 24,
  strokeWidth = 2.6,
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 28 32"
      width={size}
      height={typeof size === 'number' ? (size * 32) / 28 : undefined}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ shapeRendering: 'geometricPrecision' }}
      {...props}
    >
      {/* 1. Main Bell Flared Body */}
      <path
        d="
          M 9.2 8.0
          C 9.2 4.8 11.2 3.2 14.0 3.2
          C 16.8 3.2 18.8 4.8 18.8 8.0
          L 18.8 13.0
          C 18.8 16.2 20.8 18.2 23.2 19.5
          C 24.5 20.2 24.5 21.5 23.5 22.0
          C 20.5 23.5 17.5 24.2 14.0 24.2
          C 10.5 24.2 7.5 23.5 4.5 22.0
          C 3.5 21.5 3.5 20.2 4.8 19.5
          C 7.2 18.2 9.2 16.2 9.2 13.0
          Z
        "
        fill="#FFFFFF"
      />

      {/* 2. Hanging Clapper Loop */}
      <path
        d="
          M 11.2 24.4
          C 11.2 27.2 12.4 28.8 14.0 28.8
          C 15.6 28.8 16.8 27.2 16.8 24.4
        "
      />
    </svg>
  );
};

export default AeriBellIcon;
