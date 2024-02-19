import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const Internship_feature = () => {
const navigate=useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Internships!</Text>
    </View>
  )
}

export default Internship_feature