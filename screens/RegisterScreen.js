import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Image,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import BASE_URL from '../apiConfig'

// import {Picker} from '@react-native-picker/picker';

// let Picker;
// if (Platform.OS === 'android' || Platform.OS === 'ios') {
//   Picker = require('@react-native-picker/picker').Picker;
// } else {
//   Picker = require('react-native').Picker;
// }

const occupations = ["Student", "Professor", "Alumni"];

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState(null);
  // const [occupation, setOccupation] = useState("Student");
  // const [workingPlace, setWorkingPlace] = useState("");

  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Sorry, we need camera roll permissions to make this work!"
          );
        }
      }
    })();
  }, []);

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
      number: number,
      image: image,
      // occupation: occupation,
      // workingPlace: occupation === "Alumni" ? workingPlace : null,
    };
    console.log("Image=", image);
    console.log("User object:", user);

    // send a POST request to the backend API to register the user
    axios
      .post(`${BASE_URL}/register`, user)
      // .post("http://192.168.137.195:8000/register",user)
      .then((response) => {
        console.log("Server response", response);

        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
        setNumber("");
        setImage(null);

        navigation.navigate("Login_Screen");
      })
      .catch((error) => {
        console.log("Axios Error", error);
        console.log("Axios Error Response", error.response); // Log the full error response
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
      });
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      console.log("Image picked is=", result);

      if (!result.canceled) {
        const pickedImageUri = result.assets[0].uri;
        setImage(pickedImageUri);
        console.log("Final image=",pickedImageUri);
      }
    } catch (error) {
      console.error("Error picking image:", error);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="position" enabled>
        <Text style={styles.title4}>Register Here</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Name*"
          onChangeText={setName}
          value={name}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your email*"
          onChangeText={setEmail}
          value={email}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter your Password*"
          onChangeText={setPassword}
          value={password}
          autoCapitalize="none"
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          onChangeText={setNumber}
          value={number}
          placeholder="Your Phone number"
          keyboardType="numeric"
        />
        {/* <Text style={styles.subtitle}>Select Occupation:</Text>
        <Picker
          selectedValue={occupation}
          style={{ height: 50, width: "100%", marginTop: 10 }}
          onValueChange={(itemValue) => setOccupation(itemValue)}
        >
          {occupations.map((occ) => (
            <Picker.Item key={occ} label={occ} value={occ} />
          ))}
        </Picker>

        {occupation === "Alumni" && (
          <TextInput
            style={styles.input}
            onChangeText={setWorkingPlace}
            value={workingPlace}
            placeholder="Enter Working Place or Company"
            autoCapitalize="none"
          />
        )} */}

        <TouchableOpacity style={styles.pickimgbtn} onPress={pickImage}>
          <Text style={styles.Pickimg}>Pick Image</Text>
        </TouchableOpacity>
        {image && (
          <Image
            source={{ uri: image }}
            style={{ width: 100, height: 100, marginTop: 10 }}
          />
        )}
        <TouchableOpacity
          style={styles.loginwithpass}
          onPress={() => {
            handleRegister();
          }}
        >
          <Text style={styles.otpButton}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <TouchableOpacity
        style={styles.googleButton}
        onPress={() => navigation.navigate("Login_Screen")}
      >
        <Text style={styles.googleButtonText}>Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  title1: {
    fontSize: 38,
    color: "#000",
    marginTop: 130,
  },
  title2: {
    fontSize: 40,
    fontWeight: "800",
    color: "#000",
  },
  title3: {
    fontSize: 38,
    color: "#000",
  },
  title4: {
    fontSize: 25,
    color: "#000",
    fontWeight: "bold",
    marginTop: 60,
    marginLeft: 60,
    paddingBottom: 40,
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
  pickimgbtn: {
    width: 100,
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 12,
    backgroundColor: "tomato",
    padding: 7,
    marginTop: 8,
  },
  Pickimg: {
    color: "white",
    fontWeight: "bold",
  },
  otpButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  otpButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginwithpass: {
    backgroundColor: "tomato",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    // padding:10,
    marginTop: 20,
    width: 200,
    height: 50,
    marginLeft: 50,
  },
  loginwithpass1: {
    color: "#007BFF",
    fontWeight: "bold",
    fontSize: 15,
  },
  btnlogin: {
    backgroundColor: "none",
  },
  googleButton: {
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
    borderWidth: 1,
    padding: 15,
    marginTop: 20,
  },
  googleButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
});
