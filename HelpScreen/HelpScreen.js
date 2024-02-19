import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity,Image} from 'react-native';

const HelpScreen = () => {
 return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Image
          source={{uri: 'https://yourimage.com/your_image.png'}}
          style={styles.image}
        />
        <Text style={styles.topBarText}>Settings</Text>
      </View>
      <View style={styles.middleContent}>
        <Text style={styles.middleContentText}>Help</Text>
        <Text style={styles.middleContentText}>Tell a Friend</Text>
        <Text style={styles.middleContentText}>Delete Account</Text>
      </View>
      <View style={styles.bottomBar}>
        <Text style={styles.bottomBarText}>Logout</Text>
      </View>
    </View>
 );
};

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop:50,
 },
 topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#00BFFF',
 },
 image: {
    width: 24,
    height: 24,
 },
 topBarText: {
    fontSize: 18,
    color: '#FFFFFF',
 },
 middleContent: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
 },
 middleContentText: {
    fontSize: 16,
    color: '#333333',
 },
 bottomBar: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#F5FCFF',
 },
 bottomBarText: {
    fontSize: 18,
    color: '#333333',
 },
});

export default HelpScreen;