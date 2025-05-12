import React from "react";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          title: "New Pet",
          headerShown: true,
          headerStyle: {
            backgroundColor: "#2c3e50", // Dark background for the header
          },
          headerTitleStyle: {
            color: "#fff", // White title text
            fontWeight: "bold",
          },
          headerTintColor: "#fff", // White color for the back button and other icon elements
        }}
      />
    </Stack>
  );
}
