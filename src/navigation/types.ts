import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
export type ChatStackNavigatorParamList = {
  Message: undefined;
  Thread: {
    id?: string;
    name?: string;
    message?: string;
    image?: string;
    isNew?: boolean;
    created_at: number;
    userId: string;
    testID?: string;
  };
};

export type BottomTabNavigatorParamList = {
  Home: HomeStackNavigatorParamList;
  Space: undefined;
  Notification: undefined;
  Chat: undefined;
  Add: undefined;
};

export type ChatScreenNavigationProp = NativeStackNavigationProp<
  ChatStackNavigatorParamList,
  'Thread'
>;
