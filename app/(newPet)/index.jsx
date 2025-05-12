import React, { useState } from "react";
import { SafeAreaView, View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../../components/exampleback';
import { API_BASE_URL } from '../../api-config.js';

export default function NewPet() {
  const [newPet, setNewPet] = useState({
    petName: "",
    petSpec: "",
    petBday: "",
    petTime: "",
    petHumi: "",
    petTemp: "",
  });

  const handleAddPet = () => {
    const petData = {
      name: newPet.petName,
      species: newPet.petSpec,
      birthDay: newPet.petBday,
      feedingTime: newPet.petTime,
      humidity: newPet.petHumi,
      temperature: newPet.petTemp
    };

    fetch(`${API_BASE_URL}/add-Pet`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(petData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.success) {
          Alert.alert("Success", "Pet added successfully!");
          setNewPet({
            petName: "",
            petSpec: "",
            petBday: "",
            petTime: "",
            petHumi: "",
            petTemp: "",
          });
        } else {
          Alert.alert("Error", "Failed to add pet.");
        }
      })
      .catch(error => {
        console.error("Add pet error:", error);
        Alert.alert("Error", "An error occurred.");
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButton />
      <View style={styles.container}>
        <Text style={styles.pageTitle}>Register a New Pet</Text>

        <TextInput
          style={styles.input}
          placeholder="Pet Name"
          placeholderTextColor="#888"
          value={newPet.petName}
          onChangeText={(text) => setNewPet({ ...newPet, petName: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Species"
          placeholderTextColor="#888"
          value={newPet.petSpec}
          onChangeText={(text) => setNewPet({ ...newPet, petSpec: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Birthday"
          placeholderTextColor="#888"
          value={newPet.petBday}
          onChangeText={(text) => setNewPet({ ...newPet, petBday: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Feeding Time"
          placeholderTextColor="#888"
          value={newPet.petTime}
          onChangeText={(text) => setNewPet({ ...newPet, petTime: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Cage Humidity"
          placeholderTextColor="#888"
          value={newPet.petHumi}
          onChangeText={(text) => setNewPet({ ...newPet, petHumi: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Cage Temp"
          placeholderTextColor="#888"
          value={newPet.petTemp}
          onChangeText={(text) => setNewPet({ ...newPet, petTemp: text })}
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddPet}>
          <Ionicons name="paw" size={22} color="#fff" />
          <Text style={styles.addButtonText}>Add Pet</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 12,
    backgroundColor: "#252525",
    color: "#fff",
  },
  addButton: {
    backgroundColor: "#6C63FF",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    shadowColor: "#6C63FF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
});
