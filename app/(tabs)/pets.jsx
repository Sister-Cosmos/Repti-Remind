import React from "react";
import { View, Text, StyleSheet, Button, FlatList, ScrollView, TouchableOpacity, Modal, TextInput, } from "react-native";
import { useEffect, useState } from 'react';
import { API_BASE_URL } from '../../api-config.js';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function pets() {
  const [pets, setPets] = useState([]);
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [formData, setFormData] = useState({
    petName: "",
    petSpec: "",
    petBday: "",
    petTime: "",
    petHumi: "",
    petTemp: ""
  });


  //USE ${API_BASE_URL} INSTEAD OF "http://localhost:"
  async function getPets() {
    const response = await fetch(`${API_BASE_URL}/get-Pets`);
    const data = await response.json();
    console.log("Fetched account:", data); // Add this
    setPets(data);
    return data;
  }
  useEffect(() => {
    getPets();
  }, []);

  const HandleDeletePets = async (petId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/delete-Pet/${petId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });
      if (response.ok) {
        //succesfully deleted
        const updatedPets = await getPets();
        setPets(updatedPets);
      }
    } catch (error) {
      console.error("error deleting things", error);
    }
  };

  const handleEditPet = (pet) => {
    // Set up the form data with the current pet values
    setFormData({
      petName: pet.petName,
      petSpec: pet.petSpec,
      petBday: pet.petBday,
      petTime: pet.petTime,
      petHumi: pet.petHumi,
      petTemp: pet.petTemp
    });

    // Save the pet ID that we're editing
    setEditingPet(pet.petId);

    // Show the modal
    setModalVisible(true);
  };

  const handleUpdatePet = () => {
    // Create the pet data object to send to the API
    const petData = {
      name: formData.petName,
      species: formData.petSpec,
      birthDay: formData.petBday,
      feedingTime: formData.petTime,
      humidity: formData.petHumi,
      temperature: formData.petTemp
    };

    // Send the PUT request
    fetch(`${API_BASE_URL}/put-Pet/${editingPet}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.success) {
          // Hide modal and refresh pet list
          setModalVisible(false);
          alert("Pet updated successfully!");
          getPets();
        } else {
          alert("Failed to update pet");
        }
      })
      .catch((error) => {
        console.error("Error updating pet:", error);
        alert("Error updating pet");
      });
  };

  return (
    <View style={[styles.container]}>
      <FlatList
        data={pets}
        keyExtractor={(item) => item.petId.toString()}
        renderItem={({ item }) => (
          <View style={styles.petCard}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Name:</Text>
              <Text style={styles.detailValue}>{item.petName}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Species:</Text>
              <Text style={styles.detailValue}>{item.petSpec}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Birthday:</Text>
              <Text style={styles.detailValue}>{item.petBday}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Feeding Time:</Text>
              <Text style={styles.detailValue}>{item.petTime}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Humidity:</Text>
              <Text style={styles.detailValue}>{item.petHumi}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Temperature:</Text>
              <Text style={styles.detailValue}>{item.petTemp}</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button onPress={() => handleEditPet(item)} title="Edit" color="#76eef5" />
              <Button onPress={() => HandleDeletePets(item.petId)} title="Delete" color="red" />
            </View>
          </View>

        )}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => router.navigate('(newPet)')}
      >
        <Ionicons name="add" size={24} color="#fff" />
        <Text style={styles.addButtonText}>Register a New Pet</Text>
      </TouchableOpacity>

      {/* Edit Pet Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Edit Pet</Text>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={formData.petName}
                onChangeText={(text) => setFormData({ ...formData, petName: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Species</Text>
              <TextInput
                style={styles.input}
                value={formData.petSpec}
                onChangeText={(text) => setFormData({ ...formData, petSpec: text })}
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Birthday</Text>
              <TextInput
                style={styles.input}
                value={formData.petBday}
                onChangeText={(text) => setFormData({ ...formData, petBday: text })}
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#777"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Feeding Time</Text>
              <TextInput
                style={styles.input}
                value={formData.petTime}
                onChangeText={(text) => setFormData({ ...formData, petTime: text })}
                placeholder="HH:MM:SS"
                placeholderTextColor="#777"
              />
            </View>

            <View style={styles.row}>
              <View style={styles.halfInputContainer}>
                <Text style={styles.label}>Humidity</Text>
                <TextInput
                  style={styles.input}
                  value={formData.petHumi}
                  onChangeText={(text) => setFormData({ ...formData, petHumi: text })}
                  keyboardType="numeric"
                />
              </View>
              <View style={styles.halfInputContainer}>
                <Text style={styles.label}>Temperature</Text>
                <TextInput
                  style={styles.input}
                  value={formData.petTemp}
                  onChangeText={(text) => setFormData({ ...formData, petTemp: text })}
                  keyboardType="numeric"
                />
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <Button title="Update" onPress={handleUpdatePet} color="green" />
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="gray" />
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
  petCard: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#333',
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
    backgroundColor: 'rgba(0,0,0,0.7)'
  },
  modalView: {
    width: '90%',
    backgroundColor: "#2c2c2c",
    borderRadius: 12,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 6,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#fff',
    marginBottom: 20,
    textAlign: "center",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    height: 44,
    backgroundColor: '#1a1a1a',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    color: '#fff',
    fontSize: 16,
  },
  text: {
    color: '#eee',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  halfInputContainer: {
    flex: 1,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  detailLabel: {
    color: '#aaa',
    fontSize: 15,
    fontWeight: '600',
    flex: 1,
  },

  detailValue: {
    color: '#eee',
    fontSize: 15,
    flex: 2,
    textAlign: 'right',
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

});