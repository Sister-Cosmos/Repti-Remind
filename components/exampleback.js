import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

/**
 * A standardized back button component for Expo Router
 * Used consistently throughout the app
 */
const BackButton = () => {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.container} 
      onPress={() => router.back()}
      accessibilityLabel="Go back"
    >
      <Ionicons name="chevron-back" size={24} color="#007AFF" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  }
});

export default BackButton;