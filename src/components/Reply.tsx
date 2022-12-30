import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import {
  baseColor,
  greyColor,
  themeColor,
  lightThemeColor,
} from '../libs/colors';
import {Icon} from './Icon';
import {useService} from '../hooks/useService';
import moment from 'moment';

export type ReplyProps = {
  name?: string;
  image?: string;
  thread_id?: string;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
};

export const Reply: React.FC<ReplyProps> = props => {
  const {name, image, thread_id, containerStyle} = props;
  const ref = useRef(null);
  const [message, setMessage] = useState('');
  const {addMessage} = useService();

  useEffect(() => {
    ref.current?.focus();
  }, []);

  const onCreate = async () => {
    if (!!message && message.length >= 2 && name) {
      const created_at = moment().valueOf();
      await addMessage({
        name,
        image,
        message,
        thread_id,
        created_at,
      });
      setMessage('');
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.message}>
        <TextInput
          multiline
          numberOfLines={4}
          onChangeText={value => setMessage(value)}
          value={message}
          placeholderTextColor={greyColor}
          style={[styles.textInput, {color: baseColor}]}
          keyboardType={'default'}
          placeholder={'Type a message'}
          onSubmitEditing={() => {
            if (message.length >= 2) {
              onCreate();
            }
          }}
          ref={ref}
        />
        <TouchableOpacity onPress={onCreate}>
          <Icon
            name="send"
            color={
              message && message.length >= 2 ? themeColor : lightThemeColor
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-end',
  },
  message: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: lightThemeColor,
  },
});
