import React from 'react';
import {
  View,
  Text,
  Image,
  ImageProps,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import {
  whiteColor,
  themeColor,
  lightThemeColor,
  greenColor,
} from '../libs/colors';

export type AvatarProps = {
  size: number;
  image?: string;
  ImageComponent?: React.ComponentType<ImageProps>;
  name?: string;
  presenceIndicator?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
};

export const Avatar: React.FC<AvatarProps> = props => {
  const {
    size = 32,
    image: imageProp,
    ImageComponent = Image,
    name,
    presenceIndicator: presenceIndicatorProp,
    containerStyle,
  } = props;

  return (
    <View style={[styles.container, containerStyle]}>
      {imageProp ? (
        <ImageComponent
          source={{uri: imageProp}}
          style={[
            {
              borderRadius: size / 6,
              height: size,
              width: size,
            },
            styles.image,
          ]}
        />
      ) : (
        <View style={[styles.avatar, {width: size, height: size}]}>
          <Text style={styles.text}>{name && name[0]}</Text>
        </View>
      )}
      {presenceIndicatorProp && <View style={styles.presenceIndicator} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: themeColor,
    borderRadius: 5,
    width: 32,
    height: 32,
  },
  text: {
    color: whiteColor,
    fontSize: 22,
    fontWeight: '500',
  },
  image: {
    backgroundColor: lightThemeColor,
  },
  presenceIndicator: {
    width: 12,
    height: 12,
    backgroundColor: greenColor,
    borderWidth: 2,
    borderColor: whiteColor,
    borderRadius: 6,
    position: 'absolute',
    left: 36,
    bottom: 0,
  },
});
