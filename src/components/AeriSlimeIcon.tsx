import React from 'react';

export interface AeriSlimeIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

/**
 * AeriSlimeIcon - Stylized cute slime creature icon
 * Replaces the walking man icon
 */
export function AeriSlimeIcon({
  size = 24,
  strokeWidth = 1.8,
  className = '',
  ...props
}: AeriSlimeIconProps) {
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
      {...props}
    >
      {/* Slime body silhouette */}
      <path
        d="M 12 3.2 C 12.6 3.2 13.9 5.2 15.8 7.8 C 18.2 10.8 20.5 13.6 20.5 16.6 C 20.5 19.6 17.5 21.5 12 21.5 C 6.5 21.5 3.5 19.6 3.5 16.6 C 3.5 13.6 5.8 10.8 8.2 7.8 C 10.1 5.2 11.4 3.2 12 3.2 Z"
        fill="currentColor"
        fillOpacity="0.22"
      />
      {/* Gloss shine reflection on upper curve */}
      <path
        d="M 8.2 7.8 C 9.5 6.2 11 5.2 12 5"
        strokeWidth={1.5}
      />
      {/* Left eye */}
      <circle cx="9" cy="14.2" r="1.3" fill="currentColor" stroke="none" />
      {/* Right eye */}
      <circle cx="15" cy="14.2" r="1.3" fill="currentColor" stroke="none" />
      {/* Eye catchlight sparkles */}
      <circle cx="8.6" cy="13.8" r="0.45" fill="#FFFFFF" stroke="none" />
      <circle cx="14.6" cy="13.8" r="0.45" fill="#FFFFFF" stroke="none" />
      {/* Sweet smile */}
      <path
        d="M 11 16.5 C 11.4 17.2 12.6 17.2 13 16.5"
        strokeWidth={1.5}
      />
      {/* Cheeks */}
      <circle cx="6.8" cy="15.5" r="0.7" fill="currentColor" fillOpacity="0.4" stroke="none" />
      <circle cx="17.2" cy="15.5" r="0.7" fill="currentColor" fillOpacity="0.4" stroke="none" />
    </svg>
  );
}

export default AeriSlimeIcon;
