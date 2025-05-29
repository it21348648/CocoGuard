import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import moment from "moment"; // Used for date formatting and arithmetic

export default function HarvestResultsScreen() {
  const router = useRouter();
  const { imageUri, prediction, predictedDays } = useLocalSearchParams();

  // Calculate date range based on prediction
  const todayDate = moment();
  const predictedDate = todayDate.clone().add(predictedDays, "days");

  // Optimal harvest window = predicted ± 5 days
  const optimalStartDate = predictedDate.clone().subtract(5, "days");
  const optimalEndDate = predictedDate.clone().add(5, "days");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Harvest Prediction Results</Text>

        {/* Display image if available */}
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>No Image Available</Text>
        )}

        {/* Maturity prediction result */}
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Coconut Maturity</Text>
          <Text style={styles.resultText}>{prediction}</Text>
        </View>

        {/* Predicted harvest days */}
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Predicted Harvest in</Text>
          <Text style={styles.predictedText}>{predictedDays} days</Text>
        </View>

        {/* Optimal harvest window */}
        <View style={styles.resultBox}>
          <Text style={styles.resultTitle}>Optimal Harvest Period</Text>
          <Text style={styles.optimalHarvestText}>
            {optimalStartDate.format("MMMM D, YYYY")} – {optimalEndDate.format("MMMM D, YYYY")}
          </Text>
          <Text style={styles.harvestNote}>
            Harvest within this period for the best results.
          </Text>
        </View>

        {/* Back to dashboard */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.push("/coconutMaturity/DashboardScreen")}
        >
          <Text style={styles.backButtonText}>Back to Dashboard</Text>
        </TouchableOpacity>

        {/* Disclaimer */}
        <Text style={styles.noteText}>
          Prediction based on provided data. Results may vary.
        </Text>
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
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  resultTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5, color: "#555" },
  resultText: { fontSize: 20, fontWeight: "bold", color: "#007BFF" },
  predictedText: { fontSize: 22, fontWeight: "bold", color: "#28A745" },
  optimalHarvestText: { fontSize: 20, fontWeight: "bold", color: "#FF9800" },
  harvestNote: { fontSize: 14, color: "#666", marginTop: 5, textAlign: "center" },

  backButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    width: "90%",
  },
  backButtonText: { fontSize: 18, color: "#fff", fontWeight: "bold" },
  noteText: { fontSize: 14, color: "#777", marginTop: 20, textAlign: "center" },
});