import { StyleSheet, Text, View,ActivityIndicator,Image } from 'react-native'
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

  const { name, email, image, number,occupation } = userData;

  return (
    <View style={styles.container}>
    <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
    <Text style={styles.text}>Name: {name}</Text>
    <Text style={styles.text}>Email: {email}</Text>
    <Text style={styles.text}>Phone Number: {number}</Text>
    <Text style={styles.text}>Occupation: {occupation}</Text>
  </View>
  )
}

export default MyProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor:'lightgrey'
    // justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginTop: 20,
  },
});