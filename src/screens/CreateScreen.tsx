import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import {Create} from '../components/Create';
import {UserList} from '../components/UserList';
import {useService} from '../hooks/useService';
//import DATA from '../libs/demo';
import USER from '../libs/user';
import moment from 'moment';
import {
  whiteColor,
  themeColor,
  lightThemeColor,
  lightColor,
  darkColor,
  secondaryColor,
  greyColor,
  darkTranColor,
} from '../libs/colors';

const CreateScreen = ({navigation}: Props) => {
  const isDarkMode = useColorScheme() === 'dark';
  const {addMessage} = useService();
  const [keywordValue, setKeywordValue] = useState('');
  const [selected, setSelected] = useState([]);

  const onClose = () => {
    navigation.goBack();
  };

  const onCreate = async () => {
    const created_at = moment().valueOf();
    const docId = await addMessage({
      name: selected.name,
      image: selected.image,
      created_at,
    });

    if (docId) {
      navigation.navigate('Thread', {
        id: docId,
        name: selected.name,
        image: selected.image,
        created_at,
      });
    }
  };

  const title = 'New Message';

  const titleContainer = (
    <View style={[styles.heading]}>
      <TouchableOpacity onPress={onClose}>
        <Text style={styles.cancel}>Cancel</Text>
      </TouchableOpacity>
      <Text
        style={[styles.title, {color: isDarkMode ? lightColor : darkColor}]}>
        {title}
      </Text>
      <TouchableOpacity onPress={onCreate}>
        <Text
          style={
            selected && selected.name ? styles.activeButton : styles.button
          }>
          Create
        </Text>
      </TouchableOpacity>
    </View>
  );

  const search = (keyword: string) => {
    setKeywordValue(keyword);
  };

  const chooseUser = (user: array) => {
    setSelected(user);
  };

  return (
    <SafeAreaView style={[styles.areaView, {backgroundColor: themeColor}]}>
      <StatusBar barStyle={'light-content'} backgroundColor={themeColor} />
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {titleContainer}
          <ScrollView
            contentContainerStyle={styles.container}
            style={styles.content}>
            <Create search={search} keyword={keywordValue} />
            {USER.map((item, key) => (
              <UserList
                key={key}
                image={item.image}
                name={item.name}
                isOnline={item.isOnline}
                chooseUser={chooseUser}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  areaView: {
    flex: 1,
  },
  container: {
    paddingBottom: 30,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  content: {
    padding: 15,
  },
  modalView: {
    marginTop: 20,
    justifyContent: 'flex-end',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '95%',
    shadowColor: darkTranColor,
    backgroundColor: whiteColor,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: lightThemeColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  heading: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  title: {
    fontWeight: '600',
    fontSize: 20,
  },
  activeButton: {
    fontSize: 15,
    color: themeColor,
  },
  button: {
    fontSize: 15,
    color: greyColor,
  },
  cancel: {
    fontSize: 15,
    color: secondaryColor,
  },
});
