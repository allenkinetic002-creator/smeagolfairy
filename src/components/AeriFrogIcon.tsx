import React from 'react';

export interface AeriFrogIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

/**
 * AeriFrogIcon - Stylized frog face & goggle silhouette icon
 * Inspired by aeri5.png with iconic frog eye goggles, curved cheeks, and friendly expression.
 */
export function AeriFrogIcon({
  size = 24,
  strokeWidth = 1.8,
  className = '',
  ...props
}: AeriFrogIconProps) {
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
      {/* Frog face / goggle silhouette outer contour */}
      <path
        d="
          M 12 7.6
          C 12.7 7.6 13.4 7.1 14 6.3
          C 15.1 5 17 4.6 18.5 5.6
          C 20.2 6.8 20.5 9 19.8 10.8
          C 21.2 13 20.5 16.5 17.5 18.4
          C 14.5 20 9.5 20 6.5 18.4
          C 3.5 16.5 2.8 13 4.2 10.8
          C 3.5 9 3.8 6.8 5.5 5.6
          C 7 4.6 8.9 5 10 6.3
          C 10.6 7.1 11.3 7.6 12 7.6
          Z
        "
      />

      {/* Goggle / Eye lens frames */}
      <circle cx="7.6" cy="8.4" r="2.5" strokeWidth={Math.max(1.2, Number(strokeWidth) * 0.8)} />
      <circle cx="16.4" cy="8.4" r="2.5" strokeWidth={Math.max(1.2, Number(strokeWidth) * 0.8)} />

      {/* Expressive pupils */}
      <circle cx="7.6" cy="8.4" r="1.3" fill="currentColor" stroke="none" />
      <circle cx="16.4" cy="8.4" r="1.3" fill="currentColor" stroke="none" />

      {/* Nostril accents */}
      <circle cx="10.8" cy="12.3" r="0.5" fill="currentColor" stroke="none" />
      <circle cx="13.2" cy="12.3" r="0.5" fill="currentColor" stroke="none" />

      {/* Cheerful frog smile */}
      <path d="M 8.2 15 Q 12 18 15.8 15" />
    </svg>
  );
}

// Alias export for versatility
export const AeriIcon = AeriFrogIcon;
