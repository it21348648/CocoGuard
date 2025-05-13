// ✅ Modified LeafPredict2.jsx with separate tip cards for Grey Leaf and Not a Coconut Leaf

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";
import { API_BASE_URL } from "../../constants/config"; // Import API Base URL

export default function LeafPredict2() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const gradcamImageUrl = params.gradcamPath?.startsWith("http") ? params.gradcamPath : `${API_BASE_URL}/results/${params.gradcamPath}`;
  const limeImageUrl = params.limePath?.startsWith("http") ? params.limePath : `${API_BASE_URL}/results/${params.limePath}`;

  const prediction = params.prediction || "Unknown";
  const explanationData = params.explanation ? JSON.parse(params.explanation) : {};
  const detectedRegions = explanationData.regions || [];
  const explanationMessage = explanationData.message || "No explanation available.";

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Image source={require("../assets/Coconut Leafe.jpg")} style={styles.headerBackground} />
          <Text style={styles.headerTitle}>Prediction Results</Text>
        </View>

        <View style={styles.content}>
          {/* Grad-CAM++ */}
          <View style={styles.imageBox}>
            <Text style={styles.imageLabel}>Grad-CAM++ Image</Text>
            {params.gradcamPath ? (
              <Image source={{ uri: gradcamImageUrl }} style={styles.imageLarge} />
            ) : (
              <Text style={styles.imagePlaceholder}>No Image Available</Text>
            )}
          </View>

          {/* LIME */}
          <View style={styles.imageBox}>
            <Text style={styles.imageLabel}>LIME Image</Text>
            {params.limePath ? (
              <Image source={{ uri: limeImageUrl }} style={styles.imageLarge} />
            ) : (
              <Text style={styles.imagePlaceholder}>No Image Available</Text>
            )}
          </View>

          {/* Prediction Summary */}
          <View style={styles.explanationBox}>
            <Text style={[styles.diseaseDetected, 
              { color: prediction === "Not a Coconut Leaf" ? "#FF6F6F" : "#4CAF50" }
            ]}>
              Detected: <Text style={styles.diseaseName}>{prediction}</Text>
            </Text>

            <View style={styles.explanationSection}>
              <Text style={styles.subTitle}>Model Explanation:</Text>
              <Text style={styles.description}>{explanationMessage}</Text>
              {detectedRegions.length > 0 ? (
                <Text style={styles.detectedRegions}>
                  Highlighted Regions: {detectedRegions.join(", ")}
                </Text>
              ) : (
                <Text style={styles.noRegionsText}>No significant regions detected.</Text>
              )}
            </View>
          </View>

          {/* ✅ Additional Card: Grey Leaf Tips */}
          {prediction === "Grey Leaf" && (
            <View style={[styles.tipCard, { backgroundColor: "#FFFDE7" }]}>  
              <Text style={styles.tipTitle}>Recommended Actions for Grey Leaf Disease:</Text>
              <Text style={styles.tipItem}>• Apply recommended fungicide treatments promptly.</Text>
              <Text style={styles.tipItem}>• Remove and destroy infected leaves to prevent spread.</Text>
              <Text style={styles.tipItem}>• Monitor nearby trees regularly for similar symptoms.</Text>
              <Text style={styles.tipItem}>• Ensure adequate potassium fertilization and reduce water stress.</Text>
            </View>
          )}

          {/* ✅ Additional Card: Not a Coconut Leaf */}
          {prediction === "Not a Coconut Leaf" && (
            <View style={[styles.tipCard, { backgroundColor: "#FFEBEE" }]}>  
              <Text style={[styles.tipTitle, { color: "#C62828" }]}>This doesn't look like a coconut leaf.</Text>
              <Text style={styles.tipItem}>Please try again by uploading a clear photo of a coconut leaf.</Text>
              <Text style={styles.tipItem}>Avoid background distractions.</Text>
            </View>
          )}

          {/* Navigation Button */}
          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => router.push("/leafdiseases/LeafDiseaseUpload2")}
          >
            <Text style={styles.navigationButtonText}>Go Back to Upload</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f5f5f5" },
  container: { flex: 1 },
  header: { position: "relative", height: 200, justifyContent: "center", alignItems: "center" },
  headerBackground: { width: "100%", height: "100%", position: "absolute", resizeMode: "cover" },
  headerTitle: { fontSize: 35, fontWeight: "bold", color: "#fff", textAlign: "center" },
  content: { padding: 16, alignItems: "center" },
  imageBox: { marginBottom: 20, alignItems: "center" },
  imageLabel: { fontSize: 16, fontWeight: "600", marginBottom: 10 },
  imageLarge: { width: 280, height: 280, borderRadius: 10, resizeMode: "contain", backgroundColor: "#eee" },
  imagePlaceholder: { fontSize: 14, color: "#888", textAlign: "center", paddingVertical: 20 },
  explanationBox: {
    backgroundColor: "#E8F5E9",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  diseaseDetected: { fontSize: 18, fontWeight: "bold", textAlign: "center" },
  diseaseName: { fontWeight: "bold" },
  explanationSection: { marginTop: 15 },
  subTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  description: { fontSize: 14, color: "#555", marginBottom: 5, textAlign: "center" },
  detectedRegions: { fontSize: 14, fontWeight: "600", color: "#333", textAlign: "center", marginTop: 5 },
  noRegionsText: { fontSize: 14, color: "#888", textAlign: "center", marginTop: 5 },
  navigationButton: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    alignItems: "center",
    width: "80%",
  },
  navigationButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  tipCard: {
    width: "100%",
    padding: 16,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    borderLeftWidth: 6,
    borderLeftColor: "#4CAF50",
  },
  tipTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
  tipItem: { fontSize: 14, color: "#444", marginBottom: 4 },
});
