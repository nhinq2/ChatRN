import React from 'react';
import {Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';

export type IconProps = {
  size: number;
  image?: string;
  name?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const Icon: React.FC<IconProps> = props => {
  const {size = 24, name, color, style} = props;
  return (
    <Ionicons
      name={`${Platform.OS === 'ios' ? 'ios' : 'md'}-${name}`}
      size={size}
      color={color}
      style={style}
    />
  );
};
