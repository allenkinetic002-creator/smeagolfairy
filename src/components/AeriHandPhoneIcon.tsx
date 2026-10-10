import React from 'react';

export interface AeriHandPhoneIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

/**
 * AeriHandPhoneIcon
 * Faithfully matches the uploaded illustration (what.png):
 * - Smartphone tilted ~15° with black bezel and white screen
 * - Top speaker earpiece and power button accent
 * - Three light-blue text/search preview lines at top-left of the display
 * - Bold magnifying glass search icon in the center of the screen
 * - Bottom circular home button
 * - Left hand with three curved fingers gripping the phone's left edge
 * - Right hand with index finger tapping the screen and tilted palm/grip capsule
 */
export const AeriHandPhoneIcon: React.FC<AeriHandPhoneIconProps> = ({
  size = 24,
  strokeWidth = 2.0,
  className = '',
  ...props
}) => {
  const numericStroke = typeof strokeWidth === 'number' ? strokeWidth : parseFloat(String(strokeWidth)) || 2.0;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 36 36"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ shapeRendering: 'geometricPrecision' }}
      {...props}
    >
      {/* 1. Left Hand: Three curved gripping fingers behind phone */}
      <path
        d="
          M 9.5 11.2
          C 6.4 10.2 4.6 11.8 4.6 13.8
          C 4.6 15.6 6.4 16.6 8.8 17.0
          C 5.8 17.4 4.5 18.8 4.5 20.6
          C 4.5 22.2 6.2 23.4 8.2 23.8
          C 5.4 24.2 4.4 25.8 4.4 27.5
          C 4.4 29.5 6.8 30.6 10.2 30.2
        "
        fill="#FFFFFF"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* 2. Tilted Smartphone (~15° clockwise) */}
      <g transform="rotate(15 17 18)">
        {/* Top power / sleep button accent */}
        <path
          d="M 14.6 3.0 L 17.2 3.0"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Outer Phone Casing (Solid Black) */}
        <rect
          x="9.2"
          y="3.8"
          width="16.2"
          height="27.4"
          rx="3.6"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1.2"
        />

        {/* Top Earpiece / Speaker Slit */}
        <rect
          x="14.5"
          y="5.3"
          width="4.8"
          height="1.1"
          rx="0.55"
          fill="#FFFFFF"
          stroke="none"
        />

        {/* Inner Phone Display (White) */}
        <rect
          x="10.8"
          y="7.6"
          width="13.0"
          height="18.0"
          rx="1.8"
          fill="#FFFFFF"
          stroke="none"
        />

        {/* Bottom Circular Home Button */}
        <circle
          cx="17.3"
          cy="28.4"
          r="1.35"
          fill="#FFFFFF"
          stroke="none"
        />

        {/* Three Blue Query / Search Text Lines on Display */}
        <line
          x1="12.2"
          y1="9.8"
          x2="16.5"
          y2="9.8"
          stroke="#38BDF8"
          strokeWidth="0.95"
          strokeLinecap="round"
        />
        <line
          x1="12.2"
          y1="11.4"
          x2="17.8"
          y2="11.4"
          stroke="#38BDF8"
          strokeWidth="0.95"
          strokeLinecap="round"
        />
        <line
          x1="12.2"
          y1="13.0"
          x2="15.8"
          y2="13.0"
          stroke="#38BDF8"
          strokeWidth="0.95"
          strokeLinecap="round"
        />

        {/* Magnifying Glass Search Graphic */}
        <circle
          cx="16.0"
          cy="18.0"
          r="3.2"
          fill="#FFFFFF"
          stroke="currentColor"
          strokeWidth={strokeWidth}
        />
        <line
          x1="18.3"
          y1="20.3"
          x2="22.2"
          y2="24.2"
          stroke="currentColor"
          strokeWidth={numericStroke * 1.25}
          strokeLinecap="round"
        />
      </g>

      {/* 3. Right Hand: Index Finger reaching across & tapping the screen */}
      <path
        d="
          M 29.8 16.5
          L 26.5 10.4
          C 25.5 8.4 22.0 8.4 17.5 9.4
          C 15.8 9.8 15.8 12.8 17.6 13.2
          L 24.5 13.8
        "
        fill="#FFFFFF"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />

      {/* 4. Right Hand: Palm / Grip Capsule Bar */}
      <rect
        x="25.2"
        y="16.2"
        width="5.0"
        height="14.2"
        rx="2.5"
        transform="rotate(25 27.7 23.3)"
        fill="#FFFFFF"
        stroke="currentColor"
        strokeWidth={strokeWidth}
      />
    </svg>
  );
};

// Compatibility aliases
export const AeriSmartphoneIcon = AeriHandPhoneIcon;
export default AeriHandPhoneIcon;
