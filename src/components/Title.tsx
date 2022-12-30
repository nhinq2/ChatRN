import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {whiteColor, baseColor} from '../libs/colors';

export type IconProps = {
  fontSize: number;
  isDarkMode?: boolean;
  title?: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

export const Title: React.FC<IconProps> = props => {
  const {fontSize = 20, title, color, isDarkMode} = props;
  return (
    <View style={styles.title}>
      <Text
        style={[
          styles.text,
          {
            fontSize: fontSize,
            color: color ?? (isDarkMode ? whiteColor : baseColor),
          },
        ]}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: '600',
    paddingLeft: 10,
  },
});
