import React from 'react';

export interface AeriMaskedEyesIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

/**
 * AeriMaskedEyesIcon - Wide panoramic mask with twin expressive white eyes
 * Inspired by eyes.png: Stretched wide horizontal mask with ample breathing room,
 * interconnected white eye apertures, and sideways-gazing circular pupils.
 */
export const AeriMaskedEyesIcon: React.FC<AeriMaskedEyesIconProps> = ({
  size = 28,
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 20"
      width={size}
      height={typeof size === 'number' ? (size * 20) / 32 : undefined}
      className={className}
      style={{ shapeRendering: 'geometricPrecision' }}
      {...props}
    >
      {/* Wide stretched horizontal black mask shape */}
      <path
        d="
          M 9.5 1.5
          H 31.0
          V 13.5
          C 31.0 16.8 28.5 18.5 25.0 18.5
          H 9.5
          C 4.2 18.5 1.0 14.8 1.0 10.0
          C 1.0 5.2 4.2 1.5 9.5 1.5
          Z
        "
        fill="currentColor"
      />

      {/* Wide twin white eye apertures (figure-8 / goggles cutout) */}
      <circle cx="11.2" cy="10.0" r="5.6" fill="#FFFFFF" />
      <circle cx="20.5" cy="10.0" r="5.6" fill="#FFFFFF" />

      {/* Left black pupil looking sideways */}
      <circle cx="9.0" cy="10.0" r="2.8" fill="currentColor" />

      {/* Right black pupil looking sideways */}
      <circle cx="18.2" cy="10.0" r="2.8" fill="currentColor" />
    </svg>
  );
};

export const AeriFrogIcon = AeriMaskedEyesIcon;
export default AeriMaskedEyesIcon;
