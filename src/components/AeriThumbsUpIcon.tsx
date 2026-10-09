import React from 'react';

export interface AeriThumbsUpIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
  filled?: boolean;
}

/**
 * AeriThumbsUpIcon - Bold cartoon thumbs-up hand icon
 * Inspired by image.png:
 * Prominent upright thumb with backward curve, horizontal wrist,
 * rounded 4-finger curled fist on the right with distinct knuckle dividers,
 * and bold graphic comic linework.
 */
export const AeriThumbsUpIcon: React.FC<AeriThumbsUpIconProps> = ({
  size = 24,
  strokeWidth = 2.2,
  filled = false,
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
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
      {/* Hand Outer Silhouette */}
      <path
        d="
          M 4.5 14.5
          C 4.5 13.5 5.5 13.0 6.5 13.0
          L 8.5 13.0
          C 9.8 12.0 11.2 9.2 12.8 5.6
          C 13.8 3.2 15.5 2.2 17.5 2.5
          C 19.5 2.8 20.5 4.5 19.8 7.5
          C 19.2 10.0 18.2 12.2 18.2 13.2
          L 23.5 13.2
          C 25.8 13.2 27.2 14.5 27.0 16.5
          C 26.8 17.5 26.2 18.0 25.5 18.2
          C 27.2 18.6 28.0 20.0 27.5 21.6
          C 27.0 22.8 26.0 23.2 25.0 23.4
          C 26.5 24.0 27.0 25.4 26.2 26.8
          C 25.2 28.4 23.5 28.6 21.0 28.5
          C 17.5 28.4 12.8 25.8 9.5 20.5
          L 6.5 20.5
          C 5.5 20.5 4.5 20.0 4.5 19.0
          Z
        "
        fill={filled ? 'currentColor' : '#FFFFFF'}
      />

      {/* Thumb-to-palm separator arc */}
      <path d="M 18.2 13.2 C 16.8 15.5 16.2 18.0 17.8 20.5" />

      {/* Curled Knuckle Divider 1 (between Index and Middle finger) */}
      <path d="M 18.0 18.2 L 25.5 18.2" />

      {/* Curled Knuckle Divider 2 (between Middle and Ring finger) */}
      <path d="M 18.2 23.4 L 25.0 23.4" />

      {/* Curled Knuckle Divider 3 (between Ring and Pinky finger) */}
      <path d="M 18.6 27.0 L 23.5 27.0" />
    </svg>
  );
};

export default AeriThumbsUpIcon;
