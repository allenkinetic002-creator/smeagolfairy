import React from 'react';

export interface AeriThumbsUpIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
  filled?: boolean;
}

/**
 * AeriThumbsUpIcon - Expressive thumbs up hand gesture icon
 * Inspired by 8f1f0335-03f8-43e9-b822-14427423bae6.png
 */
export const AeriThumbsUpIcon: React.FC<AeriThumbsUpIconProps> = ({
  size = 24,
  strokeWidth = 1.8,
  filled = false,
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {/* Wrist / palm base cuff */}
      <path d="M7 10v10" />
      <path d="M3 11.5a1 1 0 0 1 1-1h3v9H4a1 1 0 0 1-1-1v-7z" />
      
      {/* Thumb raised and fingers curled into fist */}
      <path d="M7 10.5l3.8-6.3a1.9 1.9 0 0 1 3.2 1.6L12.6 9.5H19a2.5 2.5 0 0 1 2.5 2.5c0 0.4-0.1 0.8-0.3 1.2 0.5 0.5 0.8 1.1 0.8 1.9 0 0.5-0.1 1-0.4 1.4 0.4 0.5 0.6 1.1 0.6 1.7 0 1.5-1.2 2.7-2.7 2.7l-7.5-0.4H7v-9.1z" />
      <path d="M14 12.8h4.5" />
      <path d="M14 15.6h4" />
    </svg>
  );
};
