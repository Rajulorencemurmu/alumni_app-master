import { StyleSheet, Text, View,ActivityIndicator,Image,ScrollView } from 'react-native'
import React from 'react'
import { useContext,useState,useEffect } from 'react';
import { UserType } from '../userContext';
import BASE_URL from '../apiConfig';
import axios from 'axios';

const MyProfile = () => {

  const { userId, setUserId } = useContext(UserType);
  const [userData, setUserData] = useState(null);

  console.log(userId);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/user/${userId}`);
        setUserData(response.data);
        // console.log(response)
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);
  if (!userData) {
    return <ActivityIndicator size="large" color="#000" />;
  }

  const { name, email, image, number,occupation,batches } = userData;

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
        <Text style={styles.text}>Batch: {batches}</Text>
      </View>
      <ScrollView style={{flexDirection:'row'}} horizontal={true}>
        <View style={styles.container4}></View>
        <View style={styles.container4}></View>
        <View style={styles.container4}></View>
      </ScrollView>
    </View>
  );
};

export default MyProfile

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
