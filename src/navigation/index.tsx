import * as React from 'react';
import {useColorScheme} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {Image} from 'react-native';
import ChatScreen from '../screens/ChatScreen';
import ThreadScreen from '../screens/ThreadScreen';
import CreateScreen from '../screens/CreateScreen';
import {RootStackParamList, ChatStackNavigatorParamList} from './types';
import {
  lightColor,
  darkColor,
  lightThemeColor,
  themeColor,
} from '../libs/colors';

const Tab = createBottomTabNavigator<RootStackParamList>();
const Stack = createNativeStackNavigator<ChatStackNavigatorParamList>();

const AppNavigator = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const messageIcon = require('../assets/Messages.png');
  const notificationsIcon = require('../assets/Notifications.png');
  const addIcon = require('../assets/Add.png');
  const spaceIcon = require('../assets/Space.png');
  const homeIcon = require('../assets/Home.png');

  const messageActiveIcon = require('../assets/MessagesActive.png');
  const notificationsActiveIcon = require('../assets/NotificationsActive.png');
  const addActiveIcon = require('../assets/AddActive.png');
  const spaceActiveIcon = require('../assets/SpaceActive.png');
  const homeActiveIcon = require('../assets/HomeActive.png');
  const imageSize = 24;

  const ChatStack = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Message" component={ChatScreen} />
        <Stack.Screen
          name="Thread"
          component={ThreadScreen}
          initialParams={{userId: null}}
        />
      </Stack.Navigator>
    );
  };

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused}) => {
            //let iconName;
            if (route.name === 'Home') {
              //iconName = focused ? 'home' : 'home-outline';
              iconImage = focused ? homeActiveIcon : homeIcon;
            } else if (route.name === 'Space') {
              //iconName = focused ? 'grid' : 'grid-outline';
              iconImage = focused ? spaceActiveIcon : spaceIcon;
            } else if (route.name === 'Notification') {
              //iconName = focused ? 'notifications' : 'notifications-outline';
              iconImage = focused ? notificationsActiveIcon : notificationsIcon;
            } else if (route.name === 'Add') {
              //iconName = focused ? 'add' : 'add-outline';
              iconImage = focused ? addActiveIcon : addIcon;
            } else if (route.name === 'Chat') {
              //iconName = focused ? 'chatbubble-ellipses' : 'chatbubble-ellipses-outline';
              iconImage = focused ? messageActiveIcon : messageIcon;
            }
            return (
              <Image
                source={iconImage}
                style={{height: imageSize, width: imageSize}}
              />
            );
            // You can return any component that you like here!
            //return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: themeColor,
          tabBarInactiveTintColor: darkColor,
          tabBarShowLabel: false,
          tabBarStyle: {
            borderTopWidth: 1,
            backgroundColor: isDarkMode ? darkColor : lightColor,
            height: 66,
            padding: 0,
            borderTopColor: isDarkMode ? darkColor : lightThemeColor,
          },
        })}>
        <Tab.Screen
          name="Home"
          component={ChatStack}
          options={{headerShown: false, title: 'Home'}}
        />
        <Tab.Screen
          name="Space"
          component={ChatStack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Add"
          component={CreateScreen}
          screenOptions={{presentation: 'modal'}}
          options={{headerShown: false}}
          // listeners={({ navigation }) => ({
          //   tabPress: (e) => {
          //     e.preventDefault();
          //     console.log('open');
          //   }
          // })}
        />
        <Tab.Screen
          name="Notification"
          component={ChatStack}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Chat"
          component={ChatStack}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
