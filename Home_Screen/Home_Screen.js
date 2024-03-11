import {
  StyleSheet,
  Text,
  View,
  DrawerLayoutAndroid,
  TouchableOpacity,
  Alert,
  BackHandler, // Import BackHandler
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { UserType } from "../userContext";
import { useContext } from "react";


const Home_Screen = () => {
  

  const { name,userId,setUserId,logout } = useContext(UserType);
  console.log('userId in home screen.js',userId)
  console.log('userName in home screen.js',name);

  const navigation = useNavigation();
  const drawerRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    const backAction = () => {
      Alert.alert(
        "Confirm Logout",
        "Do you really want to logout?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              await handleLogout(); // Call the logout function
            },
          },
        ],
        { cancelable: false }
      );
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []); // Empty dependency array to run effect only once




  const handleLogout = async () => {
    try {
      Alert.alert(
        "Confirm Logout",
        "Do you really want to logout?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              await AsyncStorage.removeItem('authToken');
              logout();
              navigation.navigate('Login_Screen');
            },
          },
        ],
        { cancelable: false }
      );
      return true;
    } catch (error) {
      console.log('Error during logout:', error.message);
      Alert.alert('Logout Error', 'An error occurred while logging out');
    }
  };



  useFocusEffect(() => {
    navigation.setOptions({
      headerTitle: name?name:'Home',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            if (isDrawerOpen) {
              drawerRef.current.closeDrawer();
            } else {
              drawerRef.current.openDrawer();
            }
          }}
          style={{ marginLeft: 15 }}
        >
          <Ionicons name="menu-outline" size={28} color="black" />
        </TouchableOpacity>
      ),
    });
  });

  const navigationView = (
    <View style={styles.navigationContainer}>
      <View style={{ flexDirection: "row", gap: 12 ,padding:4}}>
        <Ionicons name="home-outline" size={24} color="black" />
        <Text onPress={() => navigation.navigate("Home_Screen")}>Home</Text>
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 12,padding:4 }}>
        <MaterialCommunityIcons
          name="account-circle-outline"
          size={24}
          color="black"
        />
        <Text onPress={() => navigation.navigate("MyProfile")}>My Profile</Text>
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 12,padding:4 }}>
        <MaterialIcons name="message" size={24} color="black" />
        <Text onPress={() => navigation.navigate("Chats")}>Message</Text>
      </View>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 12 ,padding:4}}>
        <MaterialIcons name="event" size={24} color="black" />
        <Text onPress={() => navigation.navigate("Events")}>Events</Text>
      </View>

      <View
        style={{
          height: 1,
          width: 180,
          backgroundColor: "#ccc",
          marginTop: 320,

        }}
      />
    <View style={{ flexDirection: "row", gap: 12,marginTop:5,padding:4 }}>
    <Ionicons name="help-circle-outline" size={24} color="black" />
    <Text onPress={() => navigation.navigate("Screen3")}>Help</Text>
    </View>
      <View style={{ flexDirection: "row", gap: 12,marginTop:5,padding:4 }}>
        <MaterialIcons name="logout" size={24} color="black" />
        <Text onPress={handleLogout}>Logout</Text>
      </View>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={200}
      drawerPosition="left"
      renderNavigationView={() => navigationView}
      onDrawerOpen={handleDrawerOpen}
      onDrawerClose={handleDrawerClose}
    >
      <View style={styles.container}>
        <Text>Home! hello I am home</Text>
      </View>
    </DrawerLayoutAndroid>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  navigationContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
});

export default Home_Screen;
