import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { UserType } from "../userContext";
import BASE_URL from "../apiConfig";
import { useNavigation } from "@react-navigation/native";
import Profile_Screen from "../ProfileScreen/Profile_Screen";

const Users = ({ item }) => {
  const navigation = useNavigation();

  const [requestSent, setRequestSent] = useState(false);
  const { userId, setUserId } = useContext(UserType);
  const [friendRequests, setFriendRequests] = useState([]);
  const [userFriends, setUserFriends] = useState([]);

  console.log("user id in users.js=", userId);
  console.log("image in users.js=", item.image);

  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/friend-requests/sent/${userId}`
        );
        const data = await response.json();
        if (response.ok) {
          setFriendRequests(data); // Update state with fetched friend requests
        } else {
          throw new Error("Could not get friend requests");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchFriendRequests();
  }, [userId]);

  useEffect(() => {
    const fetchUserFriends = async () => {
      try {
        const response = await fetch(`${BASE_URL}/friends/${userId}`);
        const data = await response.json();
        if (response.ok) {
          setUserFriends(data);
        } else {
          throw new Error("could not get friends");
        }
      } catch (error) {
        console.log("error", error);
      }
    };
    fetchUserFriends();
  }, [userId]);

  const sendFriendRequest = async (currentUserId, selectedUserId) => {
    try {
      const response = await fetch(`${BASE_URL}/friendRequest`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ currentUserId, selectedUserId }),
      });
      if (response.ok) {
        setRequestSent(true);
        console.log("Friend request sent successfully");
      } else {
        console.log(
          "Friend request not sent. Server response:",
          response.status
        );
      }
    } catch (error) {
      console.log("Error sending friend request:", error);
    }
  };

  const handleUserClick = () => {
    navigation.navigate("Profile", { user: item }); // Navigate to Profile_Screen with user data
  };

  return (
    <ScrollView>
      <Pressable
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: "#ccc",
          padding: 10,
        }}
        onPress={handleUserClick} // Call handleUserClick when user is pressed
      >
        <View>
          <Image
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              resizeMode: "cover",
            }}
            source={{ uri: item.image }}
          />
        </View>
        <View style={{ marginLeft: 16, flex: 1 }}>
          <Text style={{ marginTop: 4, fontWeight: "bold" }}>{item?.name}</Text>
          <Text style={{ marginTop: 4, color: "gray" }}>{item?.email}</Text>
        </View>

        {userFriends.includes(item._id) ? (
          <Pressable
            style={{
              backgroundColor: "#FB6D48",
              padding: 10,
              width: 105,
              borderRadius: 6,
            }}
          >
            <Text style={{ textAlign: "center", color: "white",fontWeight:'bold' }}>Friends</Text>
          </Pressable>
        ) : requestSent ||
          friendRequests.some((friend) => friend._id === item._id) ? (
          <Pressable
            style={{
              backgroundColor: "gray",
              padding: 10,
              width: 105,
              borderRadius: 6,
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 13,fontWeight:'bold' }}>
              Request Sent
            </Text>
          </Pressable>
        ) : (
          <Pressable
            onPress={() => sendFriendRequest(userId, item._id)}
            style={{
              backgroundColor: "#378CE7",
              padding: 10,
              borderRadius: 6,
              width: 105,
            }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 13,fontWeight:'bold' }}>
              Add Friend
            </Text>
          </Pressable>
        )}
      </Pressable>
    </ScrollView>
  );
};

export default Users;

const styles = StyleSheet.create({});
