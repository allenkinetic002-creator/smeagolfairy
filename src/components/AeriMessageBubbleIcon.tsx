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
          M 4.0 8.6
          C 4.0 4.2 7.6 2.0 12.8 2.0
          C 18.0 2.0 21.6 5.4 21.6 10.4
          C 21.6 15.2 18.2 17.4 13.5 16.2
          C 10.4 15.4 7.0 17.6 5.4 19.8
          C 4.6 20.8 4.0 20.4 4.0 19.0
          L 4.0 8.6
          Z
          M 7.3 8.3
          H 9.6
          C 10.1 8.3 10.5 8.7 10.5 9.2
          V 11.1
          C 10.5 11.6 10.1 12.0 9.6 12.0
          H 7.3
          C 6.8 12.0 6.4 11.6 6.4 11.1
          V 9.2
          C 6.4 8.7 6.8 8.3 7.3 8.3
          Z
          M 11.0 8.3
          H 13.3
          C 13.8 8.3 14.2 8.7 14.2 9.2
          V 11.1
          C 14.2 11.6 13.8 12.0 13.3 12.0
          H 11.0
          C 10.5 12.0 10.1 11.6 10.1 11.1
          V 9.2
          C 10.1 8.7 10.5 8.3 11.0 8.3
          Z
          M 14.7 8.3
          H 17.0
          C 17.5 8.3 17.9 8.7 17.9 9.2
          V 11.1
          C 17.9 11.6 17.5 12.0 17.0 12.0
          H 14.7
          C 14.2 12.0 13.8 11.6 13.8 11.1
          V 9.2
          C 13.8 8.7 14.2 8.3 14.7 8.3
          Z
        "
      />
    </svg>
  );
};

export default AeriMessageBubbleIcon;
