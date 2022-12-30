import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import {baseColor, greyColor, lightThemeColor} from '../libs/colors';
import {Icon} from './Icon';

export type CreateProps = {
  keyword?: string;
  search?: (keyword: string) => void;
  containerStyle?: StyleProp<ViewStyle>;
  testID?: string;
};

export const Create: React.FC<CreateProps> = props => {
  const {keyword, search, containerStyle} = props;

  return (
    <View style={[styles.container, containerStyle]}>
      <View style={styles.message}>
        <View style={styles.icon}>
          <Icon name="search-outline" color={greyColor} />
        </View>
        <TextInput
          onChangeText={value => search(value)}
          value={keyword}
          placeholderTextColor={greyColor}
          style={[styles.textInput, {color: baseColor}]}
          keyboardType={'default'}
          placeholder={'Search users'}
          onSubmitEditing={() => {}}
        />
        <View style={styles.close}>
          {keyword && keyword.length > 0 && (
            <TouchableOpacity onPress={() => search('')}>
              <Icon name="close-circle" color={greyColor} />
            </TouchableOpacity>
          )}
        </View>
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
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: lightThemeColor,
  },
  icon: {
    width: '7%',
  },
  close: {
    width: '7%',
  },
  textInput: {
    paddingLeft: 10,
    width: '86%',
  },
});
