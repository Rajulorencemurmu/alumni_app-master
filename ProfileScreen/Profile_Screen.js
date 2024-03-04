import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import avtar from "./avtar.jpeg";

const Profile_Screen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.time}>9:41</Text>
        <Text style={styles.name}>Sampathkumar Copal</Text>
      </View>
      <View style={styles.profile}>
        <Image source={avtar} style={styles.avatar} />
        <View style={styles.info}>
          <Text style={styles.title}>CMI tingg</Text>
          <Text style={styles.details}>1987-1991</Text>
          <Text style={styles.details}>8964572368</Text>
          <Text style={styles.details}>sampathgopal@gmai.com</Text>
          <Text style={styles.details}>Coimbatore</Text>
        </View>
      </View>
      {/* <View style={styles.bottomBar}>
        <Text style={styles.tabText}>HOME</Text>
        <Text style={styles.tabText}>SETTINGS</Text>
        <Text style={styles.tabText}>HISTORY</Text>
        <Text style={styles.tabText}>PROFILE</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  time: {
    fontSize: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profile: {
    flexDirection: 'row',
    padding: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  info: {
    marginLeft: 20,
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    fontSize: 14,
    marginBottom: 5,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingVertical: 10,
  },
  tabText: {
    fontSize: 14,
  },
});

export default Profile_Screen;
