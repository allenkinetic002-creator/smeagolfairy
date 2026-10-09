import React from 'react';

export interface AeriMessageBubbleIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

/**
 * AeriMessageBubbleIcon - Iconic solid chat bubble with 3 squircle cutouts
 * Inspired by Screenshot 2026-02-19 132343.png: Asymmetric chat bubble with
 * straight left tail flank, bulbous top/right curvature, and three horizontal
 * rounded-square typing indicator cutouts.
 */
export const AeriMessageBubbleIcon: React.FC<AeriMessageBubbleIconProps> = ({
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
      fill="currentColor"
      className={className}
      style={{ shapeRendering: 'geometricPrecision' }}
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="
          M 3.6 8.5
          C 3.6 4.0 7.4 1.8 13.2 1.8
          C 18.6 1.8 21.8 5.2 21.8 10.4
          C 21.8 15.2 18.2 17.5 13.4 16.4
          C 10.2 15.6 6.8 18.0 5.2 20.4
          C 4.4 21.5 3.6 21.0 3.6 19.4
          L 3.6 8.5
          Z
          M 6.0 7.2
          H 9.4
          C 10.1 7.2 10.6 7.7 10.6 8.4
          V 11.2
          C 10.6 11.9 10.1 12.4 9.4 12.4
          H 6.0
          C 5.3 12.4 4.8 11.9 4.8 11.2
          V 8.4
          C 4.8 7.7 5.3 7.2 6.0 7.2
          Z
          M 11.6 7.2
          H 15.0
          C 15.7 7.2 16.2 7.7 16.2 8.4
          V 11.2
          C 16.2 11.9 15.7 12.4 15.0 12.4
          H 11.6
          C 10.9 12.4 10.4 11.9 10.4 11.2
          V 8.4
          C 10.4 7.7 10.9 7.2 11.6 7.2
          Z
          M 17.2 7.2
          H 20.6
          C 21.3 7.2 21.8 7.7 21.8 8.4
          V 11.2
          C 21.8 11.9 21.3 12.4 20.6 12.4
          H 17.2
          C 16.5 12.4 16.0 11.9 16.0 11.2
          V 8.4
          C 16.0 7.7 16.5 7.2 17.2 7.2
          Z
        "
      />
    </svg>
  );
};

export default AeriMessageBubbleIcon;
