import React from 'react';
import { AeriDiggingDogIcon, AeriDiggingDogIconProps } from './AeriDiggingDogIcon';

export type AeriHorseIconProps = AeriDiggingDogIconProps;

/**
 * Replaced horse icon with digging puppy icon inspired by baaaedf1-1133-4bbf-9fe6-512d4d136a33.jpg.png
 */
export const AeriHorseIcon: React.FC<AeriHorseIconProps> = (props) => {
  return <AeriDiggingDogIcon {...props} />;
};

export default AeriHorseIcon;
