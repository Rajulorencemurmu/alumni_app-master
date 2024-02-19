import { Pressable, StyleSheet, Text, View,ScrollView } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../userContext";
import { useNavigation } from "@react-navigation/native";
import UserChat from "../Components/UserChat";

const ChatScreen = () => {
  const [acceptedFriends, setAcceptedFriends ] = useState([]);
  const { userId, setUserId } = useContext(UserType);
  const navigation = useNavigation();


  useEffect(() => {
    const acceptedFriendsList = async () => {
      try {
        const response = await fetch(
          `http://192.168.29.229:8000/acceptedFriends/${userId}`
          // `http://192.168.137.195:8000/acceptedFriends/${userId}`
        );
       
        // if (response.ok) {
        //   setAcceptedFriends(data);
        // }
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
    <View style={{ marginTop: 40 }}>
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
