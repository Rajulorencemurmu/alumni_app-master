import { Pressable, StyleSheet, Text, View,ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../userContext";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../Components/UserChat";
import BASE_URL from "../apiConfig";
const ChatScreen = () => {
  const [acceptedFriends, setAcceptedFriends ] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();


  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/acceptedFriends/${userId}`
          // `http://192.168.137.195:8000/acceptedFriends/${userId}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }  
          const data = await response.json();
          console.log("data", data);
          setAcceptedFriends(data);
      } catch (error) {
        console.log("error showing accepted friends", error);
      }
    };
    acceptedFriendsList();
  }, [userId]);
console.log('friends list',acceptedFriends);

  return (
    <View style={{ }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Pressable>
            {acceptedFriends.map((item,index)=>(<UserChat key={index} item={item}/>))}
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({});
