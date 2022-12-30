import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Image, Pressable, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {collection, onSnapshot, query, where} from 'firebase/firestore';
import {db} from '../services/FirebaseInit';
import moment from 'moment';
import {Title} from '../components/Title';
import {Avatar} from '../components/Avatar';
import {Message} from '../components/Message';

const userIcon = require('../assets/User.png');

const ChatScreen = ({navigation}: Props) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'messages'), where('thread_id', '==', null));
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
            const dbCached = await AsyncStorage.getItem('dbCached');
            if (dbCached) {
              setMessages(JSON.parse(items));
            }
          } else {
            setMessages(
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

    return () => unsubscribe();
  }, []);

  const renderListItems = ({item, index}) => {
    //const threads = messages.filter(e => e.thread_id === item.id);
    return (
      <Pressable
        onPress={() =>
          navigation.navigate('Thread', {
            id: item.id,
            name: item.name,
            message: item.message,
            created_at: item.created_at,
            image: item.image,
          })
        }>
        <Message
          image={item.image}
          name={item.name}
          message={item.message}
          created_at={item.created_at}
          isNew={item.read === false}
          isOnline={item.isOnline || index < 3}
        />
      </Pressable>
    );
  };

  React.useEffect(() => {
    // Use `setOptions` to update the button that we previously specified
    // Now the button includes an `onPress` handler to update the count
    navigation.setOptions({
      headerLeft: () => <Avatar name="C" />,
      headerTitle: props => <Title {...props} title="Messages" />,
      headerRight: () => <Image source={userIcon} />,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <FlatList
        data={messages.filter(e => !e.thread_id)}
        renderItem={renderListItems}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: 'white',
  },
});
