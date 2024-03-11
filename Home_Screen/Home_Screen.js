import { StyleSheet, Text, View, DrawerLayoutAndroid, TouchableOpacity } from "react-native";
import React, { useRef,useState } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Home_Screen = () => {
  const navigation = useNavigation();
  const drawerRef = useRef(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useFocusEffect(() => {
    navigation.setOptions({
      headerTitle: "Home",
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            if (isDrawerOpen) {
              drawerRef.current.closeDrawer();
            } else {
              drawerRef.current.openDrawer();
            }
            setIsDrawerOpen(!isDrawerOpen);
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
      <Text onPress={() => navigation.navigate("MyProfile")}>My Profile</Text>
      <Text onPress={() => navigation.navigate("Screen2")}>Screen 2</Text>
      <Text onPress={() => navigation.navigate("Screen3")}>Screen 3</Text>
    </View>
  );

  return (
    <DrawerLayoutAndroid
      ref={drawerRef}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={() => navigationView}
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
