

import { Link } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState, useRef, useEffect } from "react";
import { useRouter } from 'expo-router';

const { width, height } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Animated.View 
          style={[
            styles.contentContainer,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.iconContainer}>
            <Ionicons name="planet-outline" size={80} color="#6C63FF" />
          </View>
          
          <Text style={styles.title}>Welcome To Repti-Remind!</Text>
          <Text style={styles.subtitle}>Your home to make your pets, feel more at home.</Text>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={() => router.navigate('(tabs)')}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>LOG IN</Text>
              <Ionicons name="arrow-forward" size={20} color="white" style={styles.buttonIcon} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.createAccountButton}
              onPress={() => router.navigate('(tabs)')}
              activeOpacity={0.8}
            >
              <Text style={styles.createAccountText}>CREATE NEW ACCOUNT (W.I.P)</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>By continuing, you agree to our </Text>
          <TouchableOpacity>
            <Text style={styles.footerLink}>Terms of Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#121212',
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    maxWidth: 350,
    flex: 1,
    justifyContent: 'center',
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#BBBBBB',
    textAlign: 'center',
    marginBottom: 60,
    lineHeight: 22,
    width: '90%',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    paddingVertical: 18,
    width: '90%',
    alignItems: 'center',
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#6C63FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1.5,
  },
  buttonIcon: {
    marginLeft: 12,
  },
  createAccountButton: {
    paddingVertical: 18,
    width: '90%',
    alignItems: 'center',
    marginTop: 8,
  },
  createAccountText: {
    color: '#6C63FF',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 0.8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
    paddingTop: 40,
    paddingBottom: 10,
  },
  footerText: {
    color: '#888',
    fontSize: 12,
  },
  footerLink: {
    color: '#6C63FF',
    fontSize: 12,
    fontWeight: '600',
  },
});












/*
import { Link } from "expo-router";
import { Pressable, safeAreaView, View, Text, StyleSheet, Button  } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { useRouter } from 'expo-router';

export default function Home() {
  const router = useRouter();


      return (
        <View style={[styles.container]}>
          <Text>Login or Create an Acc!</Text>
          <Text>
          <Button title = "Log In! "onPress={() => router.navigate('(tabs)')}/>;
          </Text>
        </View>
      );
    }
    



    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "white"
      },
    });

    */