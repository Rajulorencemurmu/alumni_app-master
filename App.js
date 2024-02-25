import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreen from "./HomeScreen/HomeScreen";
import { UserContext } from "./userContext";
import FriendsScreen from "./Chat_feature/FriendsScreen";
import ChatScreen from "./Chat_feature/ChatScreen";
import ChatMessageScreen from "./Chat_feature/ChatMessageScreen";
import Profile_Screen from "./ProfileScreen/Profile_Screen";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <UserContext>
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
    </UserContext>
  );
}

export default App;
