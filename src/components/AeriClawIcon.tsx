import React from 'react';

export interface AeriClawIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
  filled?: boolean;
}

/**
 * AeriClawIcon - Bold pixel-art grasping claw hand icon
 * Inspired by rip1 (2).png: High-visibility blocky claw hand with solid interior body,
 * crisp outer outline, and distinct finger clefts.
 */
export const AeriClawIcon: React.FC<AeriClawIconProps> = ({
  size = 24,
  strokeWidth = 1.8,
  filled = false,
  className = '',
  fill,
  ...props
}) => {
  const isFilled = filled || (fill && fill !== 'none');
  const interiorFill = isFilled ? (fill || 'currentColor') : 'white';

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={{ shapeRendering: 'crispEdges' }}
      {...props}
    >
      {/* Solid interior body so the claw is clearly visible against any background */}
      <path
        d="M 7.5 22 H 16.5 V 19 H 18.5 V 17.5 H 21.5 V 14.5 H 16.5 V 11 H 20.5 V 8.5 H 14 V 6.5 H 16.5 V 3.5 H 12 V 12 H 11 V 5 H 8.5 V 12 H 7.5 V 8 H 5 V 19 H 7.5 Z"
        fill={interiorFill}
      />

      {/* Bold pixel outline */}
      <path
        d="M 7.5 22 H 16.5 V 19 H 18.5 V 17.5 H 21.5 V 14.5 H 16.5 V 11 H 20.5 V 8.5 H 14 V 6.5 H 16.5 V 3.5 H 12 V 12 H 11 V 5 H 8.5 V 12 H 7.5 V 8 H 5 V 19 H 7.5 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="square"
        strokeLinejoin="miter"
      />

      {/* Distinct cleft dividers between claw fingers */}
      <line x1="7.5" y1="8" x2="7.5" y2="12" stroke="currentColor" strokeWidth={strokeWidth} />
      <line x1="11" y1="5" x2="11" y2="12" stroke="currentColor" strokeWidth={strokeWidth} />
      <line x1="14" y1="6.5" x2="14" y2="8.5" stroke="currentColor" strokeWidth={strokeWidth} />
      <line x1="16.5" y1="11" x2="16.5" y2="14.5" stroke="currentColor" strokeWidth={strokeWidth} />
    </svg>
  );
};

export default AeriClawIcon;
