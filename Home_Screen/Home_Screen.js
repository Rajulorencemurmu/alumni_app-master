import { StyleSheet, Text, View, DrawerLayoutAndroid } from "react-native";
import React, { useRef, useState } from "react";
import { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const Home_Screen = () => {
  const navigation = useNavigation();

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: "",
  //     headerLeft: () => (
  //       <View style={{ flexDirection: "row", marginLeft: 15, gap: 16 }}>
  //         <Ionicons
  //           name="menu-outline"
  //           size={26}
  //           color="black"
  //           onPress={() => {
  //             console.log('menu pressed')
  //           }}
  //         />
  //         <Text style={{ fontSize: 20, fontWeight: "bold" }}>Home</Text>
  //       </View>
  //     ),
  //   });
  // }, [])

 
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home! hello I am home</Text>
    </View>
  );
};

export default Home_Screen;

const styles = StyleSheet.create({});
