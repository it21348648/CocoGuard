import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function LeafPredict() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Prediction Results</Text>

          {/* Add the unhealthy leaf image */}
          <Image
            source={require("../assets/unhealthyleaf.jpg")} // Replace with your actual path
            style={styles.image}
          />

          <Text style={styles.description}>
            The uploaded image indicates signs of leaf disease. Confidence level: 87%.
          </Text>
          <Text style={styles.subTitle}>Suggested Actions:</Text>
          <Text style={styles.description}>
            1. Remove affected leaves promptly.{"\n"}
            2. Use recommended fungicides.{"\n"}
            3. Monitor other plants for early symptoms.
          </Text>

          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => router.push("/leafdisease/LeafDiseaseUpload")}
          >
            <Text style={styles.navigationButtonText}>Go Back to Upload</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#4CAF50",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
    alignItems: "center", // Center-align the content
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  image: {
    width: 200, // Set the width of the image
    height: 150, // Set the height of the image
    resizeMode: "contain", // Keep the aspect ratio
    marginBottom: 16,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
    textAlign: "center", // Center-align the text
  },
  navigationButton: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
  },
  navigationButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
