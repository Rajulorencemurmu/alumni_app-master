import { View, Text ,Button} from 'react-native'
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";


const Settings_feature = () => {
  const handleLogout = async() => {
  
    // const handleLogout = async () => {
      const navigation = useNavigation();
      try {

        // Clear the authentication token from AsyncStorage
        await AsyncStorage.removeItem('authToken');
  
        // Navigate to the Login screen
        // navigation.replace('Login_Screen');
  
        Alert.alert('Logout', 'You have been logged out successfully');
      } catch (error) {
        console.error('Error in logout:', error);
        Alert.alert('Logout Error', 'An error occurred while logging out');
      }
    // }
  }
 
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Settings!</Text>
          <Button title="Logout" onPress={handleLogout}/>
          
        </View>
        )
}

export default Settings_feature;