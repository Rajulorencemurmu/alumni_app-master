import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TextInput, Button } from 'react-native';

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', time: '', location: '' });

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time || !newEvent.location) {
      alert('Please fill in all fields.');
      return;
    }

    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    setNewEvent({ title: '', date: '', time: '', location: '' });
    setIsModalVisible(false);
  };

  const renderEvent = ({ item }) => (
    <View style={styles.eventItem}>
      <Text style={styles.eventTitle}>{item.title}</Text>
      <Text>{`Date: ${item.date}, Time: ${item.time}`}</Text>
      <Text>{`Location: ${item.location}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Events Manager</Text>
      
      {/* <TouchableOpacity> */}
      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id.toString()}
      />
      {/* </TouchableOpacity> */}

      <TouchableOpacity onPress={() => setIsModalVisible(true)} style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>

      <Modal visible={isModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Event</Text>

          <TextInput
            style={styles.input}
            placeholder="Event Title"
            value={newEvent.title}
            onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Date"
            value={newEvent.date}
            onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Time"
            value={newEvent.time}
            onChangeText={(text) => setNewEvent({ ...newEvent, time: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={newEvent.location}
            onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
          />

          <Button title="Add Event" onPress={handleAddEvent} />
          {/* <Button title="X" onPress={() => setIsModalVisible(false)} /> */}
          <TouchableOpacity  onPress={() => setIsModalVisible(false)} style={styles.addButton1}>
        <Text style={styles.addButtonText1}>x</Text>
        </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  eventItem: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  eventTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: 'tomato',
    padding: 10,
    // marginTop: 60,
    width:60,
    height:60,
    borderRadius:50,
    alignSelf:'flex-end',
  },
  addButtonText: {
    color: 'white',
    fontWeight:'bold',
    fontSize:24,
    textAlign: 'center',
    marginTop:5,
  },
  addButton1: {
    backgroundColor: 'tomato',
    padding: 10,
    marginTop: 60,
    width:60,
    height:60,
    borderRadius:50,
    alignSelf:'flex-end',
  },
  addButtonText1: {
    color: 'white',
    // fontWeight:'bold',
    fontSize:24,
    textAlign: 'center',
    marginTop:5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: '80%',
  },
});

export default EventsManager;
