import React from 'react';
import {View, Text, StyleProp, ViewStyle, StyleSheet} from 'react-native';
import {themeColor, baseColor, greyColor} from '../libs/colors';
import {Avatar} from './Avatar';
import moment from 'moment';

export type MessageProps = {
  name?: string;
  message?: string;
  image?: string;
  isNew?: boolean;
  isOnline?: boolean;
  isThread?: boolean;
  created_at: number;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
};

export const Message: React.FC<MessageProps> = props => {
  const {
    name,
    message,
    image,
    isNew = false,
    isThread = false,
    isOnline = false,
    created_at,
    containerStyle,
  } = props;

  const CreateAt = () => {
    return (
      <Text style={styles.time}>
        {isNew || isThread
          ? moment(created_at).format('HH:mm a')
          : moment(created_at).fromNow(true)}
      </Text>
    );
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.avatar}>
        <Avatar
          image={image}
          name={name}
          size={40}
          presenceIndicator={isOnline}
        />
      </View>
      <View style={styles.message}>
        <View style={isThread ? styles.inRow : styles.row}>
          <Text style={styles.name}>{name}</Text>
          {isNew && !isThread && <View style={styles.dot} />}
          {isThread && CreateAt()}
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>{message}</Text>
          {!isThread && CreateAt()}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inRow: {
    flexDirection: 'row',
  },
  message: {
    flex: 1,
  },
  name: {
    color: baseColor,
    fontSize: 15,
    fontWeight: '600',
  },
  text: {
    color: greyColor,
    fontSize: 15,
  },
  time: {
    paddingLeft: 10,
    color: greyColor,
    fontSize: 13,
  },
  avatar: {
    width: 50,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: themeColor,
    borderRadius: 4,
  },
});
