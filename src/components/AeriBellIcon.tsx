import React from 'react';

export interface AeriBellIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

/**
 * AeriBellIcon (Notification Icon)
 * Faithfully matches the uploaded headset profile illustration (rip3 (2).png):
 * - Stylized profile silhouette of a human head with prominent nose, chin, and angled neck collar
 * - Concentric outer halo arc curving behind the skull
 * - Inner headset band running up along the neck and arching over the cranium
 * - Solid circular ear-piece pad node
 * - Smooth swooping microphone boom terminating in a solid circular microphone node
 */
export const AeriBellIcon: React.FC<AeriBellIconProps> = ({
  size = 24,
  strokeWidth = 2.6,
  className = '',
  fill = '#FFFFFF',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 34 34"
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
      {/* 1. Outer Concentric Arc behind head */}
      <path
        d="
          M 22.5 3.8
          C 16.2 1.2 9.0 3.2 5.5 9.0
          C 2.2 14.5 3.6 21.2 9.2 24.5
        "
      />

      {/* 2. Head Silhouette: Cranium, Forehead, Nose, Chin, Jawline, and Angled Collar */}
      <path
        d="
          M 21.2 7.2
          C 23.8 10.5 25.2 14.2 25.2 17.5
          L 28.5 21.0
          L 25.0 21.2
          C 25.0 22.8 26.4 24.2 26.4 25.6
          C 26.4 27.8 23.2 28.6 21.4 29.5
          L 20.6 33.0
          L 10.6 27.2
          L 12.2 22.0
          C 12.0 15.2 16.0 8.0 21.2 7.2
          Z
        "
        fill={fill}
      />

      {/* 3. Inner Headset Arc */}
      <path
        d="
          M 12.6 26.0
          L 13.8 20.0
          C 13.8 13.8 16.5 10.5 20.0 10.5
          C 22.8 10.5 23.8 13.8 23.8 16.5
        "
      />

      {/* 4. Microphone Boom */}
      <path
        d="
          M 23.8 16.5
          C 23.8 21.0 20.8 23.8 16.8 23.5
        "
      />

      {/* 5. Ear Pad Node */}
      <circle cx="23.8" cy="16.5" r="2.2" fill="currentColor" stroke="none" />

      {/* 6. Microphone Tip Node */}
      <circle cx="16.8" cy="23.5" r="1.8" fill="currentColor" stroke="none" />
    </svg>
  );
};

export const AeriNotificationIcon = AeriBellIcon;
export default AeriBellIcon;
