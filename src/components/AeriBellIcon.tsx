import React from 'react';

export interface AeriBellIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  strokeWidth?: number | string;
}

/**
 * AeriBellIcon (Notification Icon)
 * Faithfully matches the uploaded flame illustration (hon.png):
 * - Stylized multi-tongued fire flame silhouette
 * - Tall central flame tongue cresting smoothly at the top
 * - Sharp dynamic left and right flame spurs
 * - Bulbous base with open lower-center flame core cutout
 * - Inner flame silhouette with secondary left spur and central inner tongue
 * - Solid fill in currentColor (black when active, slate when inactive)
 */
export const AeriBellIcon: React.FC<AeriBellIconProps> = ({
  size = 24,
  className = '',
  fill = 'currentColor',
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill={fill}
      className={className}
      style={{ shapeRendering: 'geometricPrecision' }}
      {...props}
    >
      <path
        d="
          M 57.0 92.0
          C 70.0 92.0 85.0 85.0 91.5 73.0
          C 96.0 64.0 94.0 52.0 88.0 44.0
          C 84.5 39.5 80.5 37.0 77.0 38.5
          C 74.0 44.0 73.5 50.0 73.0 56.0
          C 72.0 46.0 67.0 30.0 62.0 19.0
          C 60.5 15.0 59.0 11.5 58.0 10.0
          C 54.0 14.0 44.0 23.0 38.5 33.0
          C 35.0 39.5 33.0 46.5 31.0 52.0
          C 28.0 46.0 23.0 38.0 15.0 32.0
          C 17.0 42.0 15.0 54.0 10.0 63.0
          C 6.5 70.0 7.0 79.0 11.5 86.0
          C 16.0 92.0 28.0 93.0 38.0 91.5
          C 33.0 86.0 29.5 79.0 30.0 72.0
          C 32.0 75.0 35.0 78.0 37.5 78.0
          C 36.5 70.0 40.0 60.0 45.0 54.0
          C 49.0 49.5 52.0 48.0 53.0 50.0
          C 52.5 55.0 53.0 63.0 58.0 72.0
          C 63.5 81.0 66.5 87.0 57.0 92.0
          Z
        "
      />
    </svg>
  );
};

export const AeriNotificationIcon = AeriBellIcon;
export default AeriBellIcon;
