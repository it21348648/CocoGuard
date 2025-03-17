import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function HarvestResultsScreen() {
  const router = useRouter();
  // Retrieve parameters passed from HarvestInputScreen
  const { imageUri, prediction, confidence = "0", predictedDays = "N/A" } = useLocalSearchParams();
  console.log("📡 Received params in HarvestResultsScreen:", { imageUri, prediction, confidence, predictedDays });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Harvest Prediction Results</Text>

        {/* Display Uploaded Image */}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}

        {/* Prediction Result */}
        <View style={styles.resultBox}>
          <Text style={styles.resultText}>Prediction: {prediction}</Text>
          <Text style={styles.resultText}>Confidence: {confidence}%</Text>
        </View>

        {/* Predicted Harvest Days */}
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Predicted Harvest</Text>
          <Text style={styles.predictedText}>{predictedDays} days</Text>
        </View>

        {/* Back to Dashboard Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/")}>
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f9f9f9" },
  container: { flex: 1, padding: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  image: { width: 250, height: 250, borderRadius: 10, marginBottom: 20 },
  resultBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    width: "90%",
    marginBottom: 15,
  },
  resultText: { fontSize: 18, fontWeight: "bold", color: "#007BFF" },
  resultTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 5 },
  predictedText: { fontSize: 22, fontWeight: "bold", color: "#28A745" },
  backButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    width: "90%",
  },
  backButtonText: { fontSize: 18, color: "#fff", fontWeight: "bold" },
});