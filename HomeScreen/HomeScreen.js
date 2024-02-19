import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Ionicons } from '@expo/vector-icons';
import Chat_feature from '../Chat_feature/Chat_feature';
import Internship_feature from '../Internship_feature/Internship_feature';
import Settings_feature from '../Settings_feature/Settings_feature';
import Maps_feature from '../Maps_feature/Maps_feature';
import { View,Text } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FriendRequest from '../Components/FriendRequests';
// import { Icon } from '@ant-design/react-native';

function HomeScreenComponent({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
    </View>
  );
}

function MapsScreen({ navigation }) {
  return (
    <Maps_feature/>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <Settings_feature/>
  );
}

function InternshipsScreen({ navigation }) {
  return (
    <Internship_feature/>
  );
}

const Tab = createBottomTabNavigator();

function ChatScreen({ navigation }) {
    return (
     <Chat_feature/>
    );
  }

export default function HomeScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'setting' : 'setting'; // Corrected name
          } else if (route.name === 'Maps') {
            iconName = focused ? 'enviromento' : 'enviromento';
          } else if (route.name === 'Internships') {
            iconName = focused ? 'database' : 'database';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'message1' : 'message1';
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreenComponent} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Maps" component={MapsScreen} />
      <Tab.Screen name="Internships" component={InternshipsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      {/* <Tab.Screen name="FriendRequest" component={FriendRequest} /> */}
    </Tab.Navigator>
  );
}

HomeScreen.navigationOptions = {
  headerRight: () => <CustomChatIcon />,
};

