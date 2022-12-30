import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {baseColor, greyColor} from '../libs/colors';
import {Avatar} from './Avatar';
import {Icon} from './Icon';

export type UserListProps = {
  name?: string;
  image?: string;
  isOnline?: boolean;
  chooseUser: (user: array) => void;
  testID?: string;
};

export const UserList: React.FC<UserListProps> = props => {
  const {name, image, isOnline = false, chooseUser} = props;

  const [checked, setChecked] = useState(false);

  const handleUpdate = () => {
    chooseUser({name, image});
    setChecked(!checked);
  };

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Avatar
          image={image}
          name={name}
          size={40}
          presenceIndicator={isOnline}
        />
      </View>
      <View style={styles.message}>
        <View style={styles.row}>
          <Text style={styles.name}>{name}</Text>
          <TouchableOpacity onPress={handleUpdate}>
            {checked ? (
              <Icon name="checkbox-outline" color={greyColor} />
            ) : (
              <Icon name="square-outline" color={greyColor} />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  message: {
    flex: 1,
  },
  name: {
    color: baseColor,
    fontSize: 15,
    fontWeight: '600',
  },
  avatar: {
    width: 50,
  },
});
