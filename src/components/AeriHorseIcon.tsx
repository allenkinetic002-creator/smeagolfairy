import React from 'react';

export interface AeriHorseIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

/**
 * AeriHorseIcon - Stylized standing horse silhouette outline
 * Inspired by first file2.jpg:
 * Monoline continuous outline of a proud standing horse facing right,
 * featuring arched neck, alert ears, arched back, curved tail,
 * and four straight legs with rounded hooves.
 */
export const AeriHorseIcon: React.FC<AeriHorseIconProps> = ({
  size = 24,
  strokeWidth = 2.4,
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ shapeRendering: 'geometricPrecision' }}
      {...props}
    >
      <path
        d="
          M 30.5 4.5
          C 31.2 3.8 32.0 4.2 31.8 5.2
          L 30.8 7.5
          L 33.5 12.0
          C 34.0 12.8 33.5 14.0 32.2 14.5
          L 29.5 14.8
          C 28.0 14.8 26.8 13.5 27.2 12.2
          L 27.8 10.8
          C 27.5 13.5 26.5 17.5 27.0 22.0
          L 26.8 32.0
          C 26.8 33.2 25.0 33.2 25.0 32.0
          L 24.8 24.5
          L 23.2 24.5
          L 23.0 32.0
          C 23.0 33.2 21.2 33.2 21.2 32.0
          L 21.5 26.0
          C 18.0 27.2 14.0 26.8 11.8 24.8
          L 11.5 32.0
          C 11.5 33.2 9.8 33.2 9.8 32.0
          L 10.2 24.0
          L 8.5 23.5
          L 8.0 32.0
          C 8.0 33.2 6.2 33.2 6.2 32.0
          L 6.5 20.8
          C 5.8 21.8 4.2 21.8 3.8 20.5
          L 3.5 15.5
          C 3.5 14.0 4.8 13.5 6.0 13.8
          C 7.5 14.0 8.0 15.2 8.5 16.5
          C 10.0 14.5 13.5 14.0 16.5 14.5
          C 18.8 14.8 20.2 13.8 21.2 12.5
          C 22.8 10.2 24.5 5.8 28.5 3.5
          L 30.5 4.5
          Z
        "
        fill="#FFFFFF"
      />
    </svg>
  );
};

export default AeriHorseIcon;
