import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import React, { useContext, useEffect, useState, useMemo } from "react";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { UserType } from "../userContext";

const UserChat = ({ item }) => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [messages, setMessages] = useState([]);

  console.log("Image in user chat=", item.image);
  console.log("Name in user chat=", item.name);
  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `http://192.168.29.229:8000/messages/${userId}/${item._id}`
      );
      if (!response.ok) {
        // Handle non-OK responses
        console.error(`Error fetching messages. Status: ${response.status}`);
        return;
      }
      const data = await response.json();
      console.log("Full response:", response);
      if (response.ok) {
        console.log("Is response OK?", response.ok);
        console.log("data=", data);
        setMessages(data);
      } else {
        console.log("error showing messags", response.status.message);
      }
    } catch (error) {
      console.log("error fetching messages", error);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const getLastMessages = () => {
    const userMessage = messages.filter(
      (message) => message.messageType === "text"
    );
    const n = userMessage.length;
    return n > 0 ? userMessage[n - 1].message : "";
  };

  const lastMessages = useMemo(() => getLastMessages(), [messages]);

  console.log("My last message in UserChat.js is", lastMessages);

  //for time function
  const formatTime = (timeStamp) => {
    if (!timeStamp) return ""; // Handle case when timeStamp is undefined or null
  
    const options = { hour: "numeric", minute: "numeric" };
    const date = new Date(timeStamp);
  
    if (isNaN(date.getTime())) return ""; // Handle invalid date format
  
    return date.toLocaleString("en-US", options);
  };
 
   // Assuming messages is an array of message objects
   const getLastMessageTimeStamp = () => {
    const lastMessage = messages[messages.length - 1]; // Get the last message object
    if (!lastMessage) return null; // Return null if there are no messages
    return lastMessage.timeStamp; // Return the timeStamp property of the last message
  };

  const lastMessageTimeStamp = getLastMessageTimeStamp();

  
  return (
    <KeyboardAvoidingView>
    {/* <View style={styles.topbar}></View> */}
    <ScrollView>
      <Pressable
        style={styles.container}
        onPress={() =>
          navigation.navigate("Messages", { recipientId: item._id })
        }
      >
        <Image style={styles.img} source={{ uri: item.image }} />

        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: 500 }}>{item?.name}</Text>
          {lastMessages &&(
            <Text style={{ color: "gray", marginTop: 4, fontWeight: 500 }}>
              {lastMessages}
            </Text>
            )}
        </View>
        <View>
          <Text style={{ fontSize: 11, fontWeight: 400, color: "#585858" }}>
          {lastMessageTimeStamp && formatTime(lastMessageTimeStamp)}
          </Text>
        </View>
      </Pressable>
    </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default UserChat;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 0.7,
    borderColor: "#D0D0D0",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    padding: 10,
  },
  img: {
    width: 50,
    height: 50,
    resizeMode: "cover",
    borderRadius: 25,
  },
  topbar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#dddddd",
  },
});
