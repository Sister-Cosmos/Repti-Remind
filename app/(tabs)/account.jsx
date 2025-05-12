import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRouter } from 'expo-router';
import { API_BASE_URL } from '../../api-config.js';

export default function Acc() {
  const [account, setAccount] = useState([]);
  const router = useRouter();

  async function getAccInfo() {
    try {
      const response = await fetch(`${API_BASE_URL}/get-users`);
      const data = await response.json();
      console.log("Fetched account:", data);
      setAccount(data);
    } catch (error) {
      console.error("Failed to fetch account info:", error);
    }
  }

  useEffect(() => {
    getAccInfo();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.label}>Name:</Text>
      <Text style={styles.value}>{item.userName}</Text>

      <Text style={styles.label}>Email:</Text>
      <Text style={styles.value}>{item.userMail}</Text>

      <Text style={styles.label}>Password:</Text>
      <Text style={styles.value}>{item.userPass}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={account}
        keyExtractor={(item) => item.userId.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1E1E1E',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  label: {
    color: '#888',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  value: {
    color: '#EEE',
    fontSize: 16,
    marginBottom: 4,
  },
});