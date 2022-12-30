import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  //useColorScheme,
} from 'react-native';
import {Message} from '../components/Message';
import {Reply} from '../components/Reply';
import {Title} from '../components/Title';
import {Icon} from '../components/Icon';
import {ChatScreenNavigationProp} from '../navigation/types';
import moment from 'moment';
import {
  greyColor,
  whiteColor,
  greenColor,
  lightThemeColor,
} from '../libs/colors';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {db} from '../services/FirebaseInit';
import {useService} from '../hooks/useService';

const ThreadScreen = ({route, navigation}: ChatScreenNavigationProp) => {
  const [threads, setThreads] = useState([]);
  const {deleteMessage, updateMessage} = useService();
  //const isDarkMode = useColorScheme() === 'dark';
  const {id, name, message, image, isNew = false, created_at} = route.params;

  useEffect(() => {
    const q = query(collection(db, 'messages'), where('thread_id', '==', id));
    const unsubscribe = onSnapshot(
      q,
      {includeMetadataChanges: true},
      async querySnapshot => {
        try {
          //const querySnapshot = await getDocs(q);
          const items = [];
          querySnapshot.forEach(itemDoc => {
            if (itemDoc.data()) {
              let date = moment(
                itemDoc.data().created_at.seconds * 1000,
              ).format('YYYY-MM-DD HH:mm');
              let item = {
                id: itemDoc.id,
                name: itemDoc.data().name,
                message: itemDoc.data().message,
                thread_id: itemDoc.data().thread_id,
                image: itemDoc.data().image,
                read: itemDoc.data().read,
                created_at: date,
              };

              items.push(item);
            }
          });
          const source = querySnapshot.metadata.fromCache
            ? 'local-cache'
            : 'server';
          console.log('Data came from ' + source);

          if (source === 'local-cache') {
            const dbCached = await AsyncStorage.getItem('dbThreadsCached');
            if (dbCached) {
              setThreads(JSON.parse(items));
            }
          } else {
            setThreads(
              items.sort(function (obj1, obj2) {
                if (obj1.created_at > obj2.created_at) {
                  return -1;
                }
                if (obj2.created_at > obj1.created_at) {
                  return 1;
                }
                return 0;
              }),
            );
          }
        } catch (e) {
          console.log('Error getting cached document:', e);
        }
      },
    );
    //Make read
    updateMessage({id, read: true});

    return () => unsubscribe();
  }, [id, updateMessage]);

  const filter = threads.filter(e => moment(e.created_at).diff(moment()));
  const today = filter ? filter[0] : [];

  const deleteButtonAlert = (message_id, message_name, isBack) => {
    Alert.alert(message_name, 'Are you sure to delete?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          deleteMessage(message_id);
          if (isBack) {
            navigation.goBack();
          }
        },
      },
    ]);
  };

  useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="chevron-back-outline" />
        </TouchableOpacity>
      ),
      headerTitle: props => (
        <View style={styles.titleContainer}>
          <Title {...props} title={name} fontSize={15} />
          <View style={styles.inRow}>
            <View style={styles.dot} />
            <Text style={styles.activeNow}>{'Active now'}</Text>
          </View>
        </View>
      ),
    });
  }, [navigation, name]);

  const renderListItems = ({item}) => {
    return (
      <TouchableHighlight
        onLongPress={() => deleteButtonAlert(item.id, item.name)}
        onPress={() => deleteButtonAlert(item.id, item.name)}
        underlayColor="white">
        <Message
          image={item.image}
          name={item.name}
          message={item.message}
          created_at={item.created_at}
          isNew={item.read === false}
          isThread={true}
        />
      </TouchableHighlight>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={100}
      style={styles.keyboardStyle}>
      <View style={styles.container}>
        <View style={styles.messages}>
          <FlatList
            data={threads}
            renderItem={renderListItems}
            ListHeaderComponent={
              <TouchableHighlight
                onLongPress={() => deleteButtonAlert(id, name, true)}
                onPress={() => deleteButtonAlert(id, name, true)}
                underlayColor="white">
                <Message
                  image={image}
                  name={name}
                  message={message}
                  created_at={created_at}
                  isNew={isNew}
                  isThread={true}
                />
              </TouchableHighlight>
            }
            ListFooterComponent={
              <>
                {today && (
                  <View>
                    <View style={styles.today}>
                      <Text style={styles.todayText}>{'TODAY'}</Text>
                    </View>
                    <Message
                      image={today.image}
                      name={today.name}
                      message={today.message}
                      created_at={today.created_at}
                      isNew={today.isNew}
                      isThread={true}
                    />
                  </View>
                )}
              </>
            }
          />
        </View>
        <View style={[styles.reply]}>
          <Reply name={name} image={image} thread_id={id} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ThreadScreen;

const styles = StyleSheet.create({
  keyboardStyle: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  container: {
    flex: 1,
    paddingTop: 12,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  reply: {
    justifyContent: 'flex-end',
  },
  titleContainer: {
    justifyContent: 'center',
  },
  activeNow: {
    fontSize: 12,
    textAlign: 'center',
    color: greyColor,
  },
  today: {
    borderBottomWidth: 1,
    borderBottomColor: lightThemeColor,
    marginHorizontal: 15,
    marginBottom: 15,
    position: 'relative',
    height: 32,
  },
  todayText: {
    width: 46,
    height: 32,
    backgroundColor: whiteColor,
    color: greyColor,
    position: 'absolute',
    top: 22,
    left: 0,
  },
  inRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: greenColor,
    borderRadius: 4,
    marginRight: 5,
  },
});
