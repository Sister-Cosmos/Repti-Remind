import React from "react";
import { Stack } from "expo-router";
import { Tabs } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

//newReminder, account, pets, newPet

export default function TabLayout() {
    return(
        <Tabs screenOptions={{
            tabBarActiveTintColor: '#c076f5',
            tabBarInactiveTintColor: '#ffff',
            tabBarStyle: {
                backgroundColor: '#2c3e50', // Tab bar background color
              },
              headerStyle: {
                backgroundColor: '#2c3e50', // Header background color
              },
              headerTintColor: '#ffff', // Header text color
            }}>
        <Tabs.Screen
        name="account"
        options={{title: 'Account Information',
            tabBarIcon: ({color}) => <FontAwesome size={28} name="universal-access" color={color} />
        }}
        />
        <Tabs.Screen
        name="index"
        options={{title: 'Reminders!',
            tabBarIcon: ({color}) => <AntDesign name="notification" size={24} color={color} />
        }}
        />
                <Tabs.Screen
        name="pets"
        options={{title: 'Pets!',
            tabBarIcon: ({color}) => <FontAwesome size={30} name="paw" color={color} />
        }}
        />
        </Tabs>
    );
}