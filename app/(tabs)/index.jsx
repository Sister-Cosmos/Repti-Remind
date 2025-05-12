
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Modal, TextInput } from "react-native";
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../api-config.js';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ReminderPage() {
  const [reminders, setReminders] = useState([]);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [formData, setFormData] = useState({
    petId: "",
    description: "",
    dateAndTime: ""
  });

  //USE ${API_BASE_URL} INSTEAD OF "http://localhost:"
  async function getReminders() {
    const response = await fetch(`${API_BASE_URL}/get-Reminder`);
    const data = await response.json();
    console.log("Fetched reminders:", data);
    setReminders(data);
    return data;
  }
  
  useEffect(() => {
    getReminders();
  }, []);

  const HandleDeleteReminder = async (remiId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete-Reminder/${remiId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
      if (response.ok) {
        //succesfully deleted
        const updatedReminder = await getReminders();
        setReminders(updatedReminder);
      }
    } catch (error) {
      console.error("error deleting things", error);
    }
  };

  const handleEditReminder = (reminder) => {
    // Set up the form data with the current reminder values
    setFormData({
      petId: reminder.remiPetId.toString(),
      description: reminder.remiDesc,
      dateAndTime: reminder.RemiDnT
    });

    // Save the reminder ID that we're editing
    setEditingReminder(reminder.remiId);

    // Show the modal
    setModalVisible(true);
  };

  const handleUpdateReminder = () => {
    // Create the reminder data object to send to the API
    const reminderData = {
      petId: parseInt(formData.petId),
      description: formData.description,
      dateAndTime: formData.dateAndTime
    };

    // Send the PUT request
    fetch(`${API_BASE_URL}/put-Reminder/${editingReminder}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reminderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.success) {
          // Hide modal and refresh reminder list
          setModalVisible(false);
          alert("Reminder updated successfully!");
          getReminders();
        } else {
          alert("Failed to update reminder");
        }
      })
      .catch((error) => {
        console.error("Error updating reminder:", error);
        alert("Error updating reminder");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>My Reminders</Text>
      
      {reminders.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="notifications-off-outline" size={50} color="#6C63FF" />
          <Text style={styles.emptyStateText}>No reminders yet...</Text>
          <Text style={styles.emptyStateSubText}>Create a reminder to get started!</Text>
        </View>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.remiId.toString()}
          renderItem={({ item }) => (
            <View style={styles.remiCard}>
              <View style={styles.remiCardHeader}>
                <Text style={styles.remiCardPet}>{item.petName}</Text>
                <Text style={styles.remiCardDate}>{item.RemiDnT}</Text>
              </View>
              
              <Text style={styles.remiCardDesc}>{item.remiDesc}</Text>
              
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => handleEditReminder(item)}
                  style={styles.editButton}
                >
                  <Ionicons name="create-outline" size={18} color="#fff" />
                  <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  onPress={() => {
                    console.log('Delete button clicked for reminder ID:', item.remiId);
                    HandleDeleteReminder(item.remiId);
                  }}
                  style={styles.deleteButton}
                >
                  <Ionicons name="trash-outline" size={18} color="#fff" />
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}
      
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.navigate('(newReminder)')}
      >
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Set a New Reminder</Text>
      </TouchableOpacity>

      {/* Edit Reminder Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Edit Reminder</Text>

            <Text style={styles.inputLabel}>Pet ID:</Text>
            <TextInput
              style={styles.input}
              value={formData.petId}
              onChangeText={(text) => setFormData({ ...formData, petId: text })}
              keyboardType="numeric"
              placeholderTextColor="#888"
            />

            <Text style={styles.inputLabel}>Description:</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline={true}
              numberOfLines={3}
              placeholderTextColor="#888"
            />

            <Text style={styles.inputLabel}>Date and Time:</Text>
            <TextInput
              style={styles.input}
              value={formData.dateAndTime}
              onChangeText={(text) => setFormData({ ...formData, dateAndTime: text })}
              placeholder="YYYY-MM-DD HH:MM:SS"
              placeholderTextColor="#888"
            />

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={styles.updateButton}
                onPress={handleUpdateReminder}
              >
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    marginTop: 10,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -60,
  },
  emptyStateText: {
    color: '#BBBBBB',
    fontSize: 18,
    marginTop: 20,
    fontWeight: '600',
  },
  emptyStateSubText: {
    color: '#888888',
    fontSize: 14,
    marginTop: 8,
  },
  remiCard: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  remiCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  remiCardPet: {
    color: '#6C63FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  remiCardDate: {
    color: '#BBBBBB',
    fontSize: 14,
  },
  remiCardDesc: {
    color: '#FFFFFF',
    fontSize: 15,
    marginBottom: 10,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  editButton: {
    backgroundColor: '#2A2A5A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#5A2A2A',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  addButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  modalView: {
    width: '90%',
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#FFFFFF',
  },
  inputLabel: {
    color: '#BBBBBB',
    fontSize: 14,
    marginBottom: 6,
    marginLeft: 4,
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    marginBottom: 18,
    paddingHorizontal: 12,
    backgroundColor: '#252525',
    color: '#FFFFFF',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
    paddingBottom: 12,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  updateButton: {
    backgroundColor: '#445566',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#333333',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#BBBBBB',
    fontSize: 14,
    fontWeight: '600',
  },
});



/*
import React from "react";
import { View, Text, StyleSheet, Button, FlatList, ScrollView, Modal, TextInput,  } from "react-native";
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../api-config.js';
import { useRouter } from 'expo-router';

export default function ReminderPage() {
  const [reminders, setReminders] = useState([]);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingReminder, setEditingReminder] = useState(null);
  const [formData, setFormData] = useState({
    petId: "",
    description: "",
    dateAndTime: ""
  });

  //USE ${API_BASE_URL} INSTEAD OF "http://localhost:"
  async function getReminders() {
    const response = await fetch(`${API_BASE_URL}/get-Reminder`);
    const data = await response.json();
    console.log("Fetched reminders:", data); // Add this
    setReminders(data);
    return data;
  }
  useEffect(() => {
    getReminders();
  }, []);

  const HandleDeleteReminder = async (remiId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete-Reminder/${remiId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
      if (response.ok) {
        //succesfully deleted
        const updatedReminder = await getReminders();
        setReminders(updatedReminder);
      }
    } catch (error) {
      console.error("error deleting things", error);
    }
  };

  const handleEditReminder = (reminder) => {
    // Set up the form data with the current reminder values
    setFormData({
      petId: reminder.remiPetId.toString(),
      description: reminder.remiDesc,
      dateAndTime: reminder.RemiDnT
    });

    // Save the reminder ID that we're editing
    setEditingReminder(reminder.remiId);

    // Show the modal
    setModalVisible(true);
  };

  const handleUpdateReminder = () => {
    // Create the reminder data object to send to the API
    const reminderData = {
      petId: parseInt(formData.petId),
      description: formData.description,
      dateAndTime: formData.dateAndTime
    };

    // Send the PUT request
    fetch(`${API_BASE_URL}/put-Reminder/${editingReminder}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reminderData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.success) {
          // Hide modal and refresh reminder list
          setModalVisible(false);
          alert("Reminder updated successfully!");
          getReminders();
        } else {
          alert("Failed to update reminder");
        }
      })
      .catch((error) => {
        console.error("Error updating reminder:", error);
        alert("Error updating reminder");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Reminders Page</Text>
      {reminders.length === 0 ? (
        <Text>No reminders yet...</Text>
      ) : (
        <FlatList
          data={reminders}
          keyExtractor={(item) => item.remiId.toString()}
          renderItem={({ item }) => (
            <View style={styles.remiCard}>
              <Text>Pet: {item.petName}</Text>
              <Text>Description: {item.remiDesc}</Text>
              <Text>When?: {item.RemiDnT}</Text>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => handleEditReminder(item)}
                  title="Edit"
                  color="blue"
                />
                <Button
                  onPress={() => {
                    console.log('Delete button clicked for reminder ID:', item.remiId);
                    HandleDeleteReminder(item.remiId);
                  }}
                  title="Delete"
                  color="red"
                />
              </View>
            </View>
          )}
        />
      )}
      <Button
        title="Set a New Reminder!"
        onPress={() => router.navigate('(newReminder)')}
      />

      { Edit Reminder Modal }
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Edit Reminder</Text>

            <Text>Pet ID:</Text>
            <TextInput
              style={styles.input}
              value={formData.petId}
              onChangeText={(text) => setFormData({ ...formData, petId: text })}
              keyboardType="numeric"
            />

            <Text>Description:</Text>
            <TextInput
              style={styles.input}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
              multiline={true}
              numberOfLines={3}
            />

            <Text>Date and Time:</Text>
            <TextInput
              style={styles.input}
              value={formData.dateAndTime}
              onChangeText={(text) => setFormData({ ...formData, dateAndTime: text })}
              placeholder="YYYY-MM-DD HH:MM:SS"
            />

            <View style={styles.buttonContainer}>
              <Button
                title="Update"
                onPress={handleUpdateReminder}
                color="green"
              />
              <Button
                title="Cancel"
                onPress={() => setModalVisible(false)}
                color="gray"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
    alignContent: 'center',
  },
  remiCard: {
    backgroundColor: '#0f001a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#ffffff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalView: {
    width: '80%',
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center"
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  }
});

*/