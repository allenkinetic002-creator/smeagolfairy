import React from 'react';

export interface AeriJuiceBoxIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

/**
 * AeriJuiceBoxIcon - Stylized tilted juice box with bent drinking straw & stickers
 * Inspired by Untitled-2.png: Angled 3D drink carton with corrugated flexible straw,
 * folded gable roof, perspective edges, and playful front stickers.
 */
export const AeriJuiceBoxIcon: React.FC<AeriJuiceBoxIconProps> = ({
  size = 24,
  strokeWidth = 1.8,
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
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
      {/* Bent drinking straw protruding from top */}
      <path
        d="M 3.2 4.2 L 6.5 5.0 L 8.6 8.2"
        strokeWidth={Number(strokeWidth) * 1.15}
      />
      {/* Straw ridges at elbow bend */}
      <line x1="5.4" y1="4.0" x2="5.8" y2="5.4" strokeWidth={1.2} />
      <line x1="6.4" y1="4.4" x2="6.8" y2="5.8" strokeWidth={1.2} />

      {/* Main 3D Tilted Carton Outline */}
      {/* Top Roof Gable & Ridge */}
      <path
        d="
          M 8.6 6.6
          L 15.0 6.8
          L 17.0 7.8
          L 10.8 7.6
          Z
        "
      />

      {/* Left side panel of carton */}
      <path
        d="
          M 6.2 9.0
          L 8.6 6.6
          L 10.8 7.6
          L 8.4 10.0
          L 6.2 9.0
          L 11.2 18.6
          L 13.8 19.4
          L 8.4 10.0
        "
      />

      {/* Front main face of carton */}
      <path
        d="
          M 10.8 7.6
          L 17.0 7.8
          L 21.6 16.6
          L 13.8 19.4
          Z
        "
      />

      {/* Bottom perspective fold lines */}
      <path
        d="
          M 11.2 18.6
          L 16.8 16.4
          L 21.6 16.6
        "
        strokeWidth={Math.max(1.2, Number(strokeWidth) * 0.75)}
      />

      {/* Cute band-aid cloud sticker on front face */}
      <circle
        cx="14.8"
        cy="13.2"
        r="1.8"
        fill="#FFFFFF"
        stroke="currentColor"
        strokeWidth={1.1}
      />
      <rect
        x="13.7"
        y="12.6"
        width="2.2"
        height="1.2"
        rx="0.3"
        fill="#FDE68A"
        stroke="currentColor"
        strokeWidth={0.8}
      />

      {/* Small feather accent on top-right of front face */}
      <path
        d="M 17.2 9.4 L 18.6 11.6"
        strokeWidth={1.2}
      />
    </svg>
  );
};

// Aliases for compatibility
export const AeriManLineIcon = AeriJuiceBoxIcon;
export default AeriJuiceBoxIcon;
