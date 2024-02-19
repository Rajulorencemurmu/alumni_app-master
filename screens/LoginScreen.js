import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { UserType } from "../userContext"; 
import { useContext } from "react";
import jwtDecode from "jwt-decode";
import { decode as base64decode } from 'base-64';

 const LoginScreen = () => {
   global.atob = base64decode;
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const navigation = useNavigation();
   const { setUserId } = useContext(UserType);

   //to logged in from before
   // useEffect(() => {
   //   const checkLoginStatus=async()=>{
   //    try {
   //       const token=await AsyncStorage.getItem('authToken');
   //       if(token){
   //          navigation.replace('Home_Screen');
   //       }
   //       else{
   //          //
   //       }
   //    } catch (error) {
   //       console.log(error);
   //    }
   // }
   // checkLoginStatus();
   // }, [])
   

 // ...

const handleSubmitRequest = async () => {
   const user = {
     email: email,
     password: password,
   };
 
   try {
     const response = await axios.post("http://192.168.29.229:8000/login", user);
    // const response = await axios.post("http://192.168.137.195:8000/login", user);
 
     console.log('Server response', response);
 
     if (response.data) {
       // Log the entire response data to inspect its structure
       console.log('Response data:', response.data);
 
       // Check if 'token' is present in the response data
       if ('token' in response.data) {
         const token = response.data.token;
 
         // Decode the Base64 token to get the user ID
         const decodedToken = JSON.parse(atob(token.split('.')[1]));
 
         if (decodedToken.userId) {
           // Set the user ID in the context after successful login
           setUserId(decodedToken.userId);
           console.log('UserId set to:', decodedToken.userId);
 
           AsyncStorage.setItem("authToken", token);
           navigation.navigate("Home_Screen");
         } else {
           console.log('Error: userId not found in the decoded token');
           Alert.alert('Login Error', 'Invalid response from the server');
         }
       } else {
         console.log('Error: token not found in the response data');
         Alert.alert('Login Error', 'Invalid response from the server');
       }
     } else {
       console.log('Error: Empty response data');
       Alert.alert('Login Error', 'Invalid response from the server');
     }
   } catch (error) {
     console.log('Error during login:', error.message);
     Alert.alert('Login Error', 'An error occurred while processing your request');
   }
 };
 
    
    





 return (
   <View style={styles.container}>
   <KeyboardAvoidingView behavior="position" enabled>
     <Text style={styles.title1}>My</Text>
     <Text style={styles.title2}>ALUMNI</Text>
     <Text style={styles.title3}>NETWORK</Text>

     <Text style={styles.title4}>Let's get Started</Text>
     <TextInput
       style={styles.input}
       placeholder="Enter your email*"
       onChangeText={setEmail}
       value={email}
       autoCapitalize="none"
     />
     <TextInput
         style={styles.input}
         placeholder="Enter your password*"
         onChangeText={setPassword}
         value={password}
         secureTextEntry
         autoCapitalize="none"
       />

        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => {
            handleSubmitRequest();
          }}
        >
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>

        </KeyboardAvoidingView>    
        <TouchableOpacity
          style={styles.googleButton}
          onPress={() => {
            navigation.navigate('Register_Screen')
          }}
        >
          <Text style={styles.googleButtonText}>Create New Account</Text>
        </TouchableOpacity>
   
 </View>
);
};

export default LoginScreen;




const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
      paddingHorizontal: 30,
      paddingTop: 50,
   },
   title1: {
      fontSize: 38,
      color: '#000',
      marginTop:130,
   },
   title2: {
      fontSize: 40,
      fontWeight: '800',
      color: '#000',
   },
   title3: {
      fontSize: 38,
      color: '#000',
   },
   title4: {
      fontSize: 25,
      color: '#000',
      fontWeight:'bold',
      marginTop:60,
      marginLeft:50,
   },
   subtitle: {
      fontSize: 18,
      color: '#666',
      marginTop: 10,
   },
   input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 5,
      marginTop:20,
   },
   submitButton: {
      backgroundColor: 'tomato',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      borderRadius:30,
      // padding:10,
      marginTop: 20,
      width:200,
      height:50,
      marginLeft:50,
   },
   submitButtonText: {
      color: '#fff',
      fontSize:16,
      fontWeight:'bold',
   },
   loginwithpass:{
      backgroundColor: 'none',
      display:'flex',
      alignItems:'center',
      justifyContent:'center',
      marginTop: 20,

   },
   loginwithpass1:{
      color:'#007BFF',
      fontWeight:'bold',
      fontSize:15,
   },
   btnlogin:{
      backgroundColor:'none',

   },
   googleButton: {
      backgroundColor: '#fff',
      display:'flex',
      alignItems:'center', 
      justifyContent:'center',
      borderRadius:30,
      borderWidth:1,
      padding:15,
      marginTop: 20,
   },
   googleButtonText: {
      color: '#000',
      fontSize: 16,
      fontWeight:'bold',
   },
  });

