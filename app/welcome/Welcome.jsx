import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from "react-native";
import { useRouter } from "expo-router";

export default function Welcome() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../assets/welcome.jpeg")} // Replace with the correct path to your image
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to CocoGuard!</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/tabs")} // Navigate to bottom tab navigator
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // Ensure the image covers the entire background
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add a semi-transparent overlay
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff", // Ensure text is visible on the background
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50", // Green background for the button
    paddingVertical: 12, // Vertical padding
    paddingHorizontal: 24, // Horizontal padding
    borderRadius: 8, // Rounded corners
    shadowColor: "#000", // Shadow color
    shadowOffset: { width: 0, height: 2 }, // Shadow offset
    shadowOpacity: 0.25, // Shadow opacity
    shadowRadius: 3.84, // Shadow radius
    elevation: 5, // For Android shadow
  },
  buttonText: {
    color: "#fff", // Text color
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
});
