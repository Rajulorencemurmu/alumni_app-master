import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import BASE_URL from "../apiConfig";
import { useContext, useState, useEffect } from "react";
// import { UserType } from "../userContext";
// import { useRoute } from "@react-navigation/native";

const Profile_Screen = ({ route }) => {
  const { name, email, image, number, occupation, batch } = route.params.user;
  // const { recipientId } = route.params;
  // const { userId, setUserId } = useContext(UserType);
  // const [recipientData, setrecipientData] = useState();
  // console.log('Recipient Id in profile screeen is=',recipientId)
  // try {
  //     const response = await fetch(`${BASE_URL}/user/${recipientId}`);
  //     console.log(response);
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch recipient details');
  //     }
  //     const data = await response.json();
  //     return data; // This will be the recipient's details
  //   } catch (error) {
  //     console.error('Error fetching recipient details:', error);
  //     return null;
  //   }

  //  console.log("image in Myprofile.js=", item.image);
  return (
    <View style={styles.container1}>
      <View style={styles.container}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
        {/* <View style={styles.card}> */}
      </View>

      <Text
        style={{
          justifyContent: "center",
          alignSelf: "center",
          fontSize: 19,
          marginTop: 10,
        }}
      >
        {name}
      </Text>
      <View style={styles.container3}>
        <Text style={styles.text}>Email: {email}</Text>
        <Text style={styles.text}>Phone Number: {number}</Text>
        <Text style={styles.text}>Occupation: {occupation}</Text>
        <Text style={styles.text}>Batch: {batch}</Text>
      </View>
      <ScrollView style={{flexDirection:'row'}} horizontal={true}>
        <View style={styles.container4}></View>
        <View style={styles.container4}></View>
        <View style={styles.container4}></View>
      </ScrollView>
    </View>
  );
};

export default Profile_Screen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#818FB4",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    // width:300,
    height: 150,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: 130,
    height: 130,
    borderRadius: 100,
    // marginTop: 20,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 28,
  },
  container3: {
    marginTop: 24,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    // width:300,
    height: 150,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  container4: {
    marginTop: 24,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    width:120,
    height: 120,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
