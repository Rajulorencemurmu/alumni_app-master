// import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomeScreen from './MainScreen/HomeScreen';
import { UserContext } from './userContext';
import FriendsScreen from './Chat_feature/FriendsScreen';
import ChatScreen from './Chat_feature/ChatScreen';
import ChatMessageScreen from './Chat_feature/ChatMessageScreen';
import Profile_Screen from './ProfileScreen/Profile_Screen';
import MainDrawer from './DrawerScreens/MainDrawer';
import MyProfile from './SideBarComponents/MyProfile'
import Events from './SideBarComponents/Events';
const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();

function App() {
  return (
    <UserContext>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen
            name="Login_Screen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register_Screen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Home_Screen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Friend Requests"
            component={FriendsScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Chats"
            component={ChatScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Messages"
            component={ChatMessageScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile_Screen}
            options={{ headerShown: true }}
          />

          <Stack.Screen
            name="MyProfile"
            component={MyProfile}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="Events"
            component={Events}
            options={{ headerShown: true }}
          />
          {/* <Stack.Screen
            name="MainDrawer"
            component={MainDrawer}
            options={{ headerShown: false }}
          /> */}

        </Stack.Navigator>
      </NavigationContainer>
    </UserContext>
  );
}

export default App;