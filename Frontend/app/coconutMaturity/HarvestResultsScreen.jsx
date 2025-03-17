import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function HarvestResultsScreen() {
  const router = useRouter();
  const { imageUri, prediction, predictedDays } = useLocalSearchParams(); // CONFIDENCE REMOVED
  console.log("📡 Received params in HarvestResultsScreen:", { imageUri, prediction, predictedDays });

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Harvest Prediction Results</Text>

        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No Image Available</Text>
        )}

        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Coconut Maturity</Text>
          <Text style={styles.resultText}>{prediction}</Text>
        </View>

        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Predicted Harvest in</Text>
          <Text style={styles.predictedText}>{predictedDays} days</Text>
        </View>

        <TouchableOpacity style={styles.backButton} onPress={() => router.push("/coconutMaturity/DashboardScreen")}>
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f9f9f9" },
  container: { flex: 1, padding: 20, alignItems: "center" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, color: "#333" },
  image: { width: 250, height: 250, borderRadius: 10, marginBottom: 20 },
  placeholderText: { fontSize: 16, color: "#888", marginBottom: 20 },
  resultBox: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    alignItems: "center",
    width: "90%",
    marginBottom: 15,
    elevation: 2, // Shadow effect for Android
    shadowColor: "#000", // Shadow effect for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resultTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5, color: "#555" },
  resultText: { fontSize: 20, fontWeight: "bold", color: "#007BFF" },
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