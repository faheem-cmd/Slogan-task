import {scale, verticalScale, moderateScale} from 'react-native-size-matters';

export const fontSize = (size: number) => {
  return moderateScale(size);
};

export const height = (size: number) => {
  return verticalScale(size);
};

export const width = (size: number) => {
  return scale(size);
};

export const GlobalSize = (size: number) => {
  return moderateScale(size);
};
