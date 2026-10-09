import React from 'react';

export interface AeriMaskedEyesIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * AeriMaskedEyesIcon - Bold black mask with two expressive white eyes looking left
 * Inspired by eyes.png: Rounded mask silhouette with twin interconnected white eye apertures
 * and deep black circular pupils peering sideways.
 */
export const AeriMaskedEyesIcon: React.FC<AeriMaskedEyesIconProps> = ({
  size = 24,
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={{ shapeRendering: 'geometricPrecision' }}
      {...props}
    >
      {/* Outer black mask shape */}
      <path
        d="
          M 7.5 3.5
          H 22.5
          V 15.5
          C 22.5 18.5 20.5 20.5 17.5 20.5
          H 7.5
          C 3.5 20.5 1.5 17.0 1.5 12.0
          C 1.5 7.0 3.5 3.5 7.5 3.5
          Z
        "
        fill="currentColor"
      />

      {/* Interconnected twin white eye apertures (figure-8 / binoculars cutout) */}
      <circle cx="8.5" cy="12.0" r="4.8" fill="#FFFFFF" />
      <circle cx="15.0" cy="12.0" r="4.8" fill="#FFFFFF" />

      {/* Left black pupil looking sideways */}
      <circle cx="6.8" cy="12.0" r="2.3" fill="currentColor" />

      {/* Right black pupil looking sideways */}
      <circle cx="13.3" cy="12.0" r="2.3" fill="currentColor" />
    </svg>
  );
};

export const AeriFrogIcon = AeriMaskedEyesIcon;
export default AeriMaskedEyesIcon;
