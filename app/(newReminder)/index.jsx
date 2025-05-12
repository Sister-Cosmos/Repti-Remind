import React, { useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';  // For adding icons
import BackButton from '../../components/exampleback';
import { API_BASE_URL } from '../../api-config.js';

export default function NewReminder() {
  const [newRemi, setNewRemi] = useState({
    remiPetId: "",
    remiDesc: "",
    remiDnT: ""
  });

  const handleAddRemi = () => {
    const remiData = {
      petsId: newRemi.remiPetId,
      description: newRemi.remiDesc,
      dateAndTime: newRemi.remiDnT
    };
    fetch(`${API_BASE_URL}/add-Reminder`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(remiData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data);
        if (data.success) {
          alert("Reminder added successfully!");
          setNewRemi({
            remiPetId: "",
            remiDesc: "",
            remiDnT: ""
          });
        } else {
          alert("Failed to add Reminder");
        }
      });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButton />
      <View style={styles.contentContainer}>
        <TextInput
          style={styles.input}
          placeholder="Pet Id (1-3)"
          placeholderTextColor="#B0B0B0"
          value={newRemi.remiPetId}
          onChangeText={(text) => setNewRemi({ ...newRemi, remiPetId: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="Reminder Description"
          placeholderTextColor="#B0B0B0"
          value={newRemi.remiDesc}
          onChangeText={(text) => setNewRemi({ ...newRemi, remiDesc: text })}
        />
        <TextInput
          style={styles.input}
          placeholder="When to remind you?"
          placeholderTextColor="#B0B0B0"
          value={newRemi.remiDnT}
          onChangeText={(text) => setNewRemi({ ...newRemi, remiDnT: text })}
        />

        {/* Add Reminder Button styled like Add Pet button */}
        <TouchableOpacity style={styles.addButton} onPress={handleAddRemi}>
          <Ionicons name="alarm" size={22} color="#fff" />
          <Text style={styles.addButtonText}>Add Reminder</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212", // Dark background for the whole page
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20, // Add padding for better spacing
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: "#444", // Dark border for input fields
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    color: "#fff", // White text color for input
    backgroundColor: "#222", // Dark background for input fields
  },
  addButton: {
    backgroundColor: "#6C63FF", // Same purple as the Add Pet button
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
