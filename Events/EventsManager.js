import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
  });

  // Add state for date and time pickers
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const handleDateConfirm = (date) => {
    setNewEvent({ ...newEvent, date: date.toISOString().split("T")[0] });
    setDatePickerVisibility(false);
  };

  const handleTimeConfirm = (time) => {
    setNewEvent({ ...newEvent, time: time.toLocaleTimeString() });
    setTimePickerVisibility(false);
  };

  const handleAddEvent = () => {
    if (
      !newEvent.title ||
      !newEvent.date ||
      !newEvent.time ||
      !newEvent.location
    ) {
      alert("Please fill in all fields.");
      return;
    }

    setEvents([...events, { ...newEvent, id: events.length + 1 }]);
    setNewEvent({ title: "", date: "", time: "", location: "" });
    setIsModalVisible(false);
    console.log('Your details are here=',newEvent)
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
      {/* <Text style={styles.header}>Events Manager</Text> */}

      <FlatList
        data={events}
        renderItem={renderEvent}
        keyExtractor={(item) => item.id.toString()}
      />

      <TouchableOpacity
        onPress={() => setIsModalVisible(true)}
        style={styles.addButton}
      >
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
          {/* Date Picker */}
          <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
            <Text style={{ fontSize: 18,paddingBottom:8}}>
          <Fontisto name="date" size={24} color="black" />
              {newEvent.date ? newEvent.date : "Select Date"}
            </Text>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleDateConfirm}
            onCancel={() => setDatePickerVisibility(false)}
          />

          {/* Time Picker */}
          <TouchableOpacity onPress={() => setTimePickerVisibility(true)}>
            <Text style={{ fontSize: 18,paddingBottom:8}}>
            <AntDesign name="clockcircleo" size={24} color="black" />
              {newEvent.time ? newEvent.time : "Select Time"}
            </Text>
          </TouchableOpacity>
          
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleTimeConfirm}
            onCancel={() => setTimePickerVisibility(false)}
          />

          <TextInput
            style={styles.input}
            placeholder="Location"
            value={newEvent.location}
            onChangeText={(text) =>
              setNewEvent({ ...newEvent, location: text })
            }
          />

          <View style={{ flexDirection: "row", gap: 40 }}>
            <Button title="Add Event" onPress={handleAddEvent} />
            <Button
              title="Cancel"
              color="#841584"
              onPress={() => setIsModalVisible(false)}
            />
          </View>
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
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  eventItem: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderBottomWidth:1,
    borderBottomColor:'lightgray',
  },
  eventTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },
  addButton: {
    backgroundColor: "tomato",
    padding: 10,
    // marginTop: 60,
    width: 60,
    height: 60,
    borderRadius: 50,
    alignSelf: "flex-end",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
    // color:'tomato'
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    width: "80%",
  },
});

export default EventsManager;
