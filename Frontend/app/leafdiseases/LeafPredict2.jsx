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
  const { confidence, explanation, gradcamPath, limePath } = useLocalSearchParams();

  // ✅ Convert confidence to percentage
  const confidencePercentage = confidence ? (parseFloat(confidence) * 100).toFixed(2) : "0.00";

  // ✅ Determine the disease label from explanation text - given in xai2
  let diseaseLabel;
  if (explanation.includes("healthy leaf")) {
    diseaseLabel = "Healthy";
  } else if (explanation.includes("disease")) {
    diseaseLabel = "Grey Leaf";
  } else if (explanation.includes("not match coconut leaf")) {
    diseaseLabel = "Not a Coconut Leaf";
  } else {
    diseaseLabel = "Healthy";
  }

  // ✅ Ensure Grad-CAM and LIME image paths are correct
  const gradcamImageUrl = gradcamPath?.startsWith("http") ? gradcamPath : `${API_BASE_URL}/results/${gradcamPath}`;
  const limeImageUrl = limePath?.startsWith("http") ? limePath : `${API_BASE_URL}/results/${limePath}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header with background image */}
        <View style={styles.header}>
          <Image source={require("../assets/Coconut Leafe.jpg")} style={styles.headerBackground} />
          <Text style={styles.headerTitle}>Prediction Results</Text>
        </View>

        <View style={styles.content}>
          {/* Image Comparison Section */}
          <View style={styles.imageComparison}>
            <View style={styles.imageBox}>
              <Text style={styles.imageLabel}>Grad-Cam++ Image</Text>
              {gradcamPath ? (
                <Image source={{ uri: gradcamImageUrl }} style={styles.image} />
              ) : (
                <Text style={styles.imagePlaceholder}>No Image Available</Text>
              )}
            </View>
            <View style={styles.divider} />
            <View style={styles.imageBox}>
              <Text style={styles.imageLabel}>LIME Image</Text>
              {limePath ? (
                <Image source={{ uri: limeImageUrl }} style={styles.image} />
              ) : (
                <Text style={styles.imagePlaceholder}>No Image Available</Text>
              )}
            </View>
          </View>

          {/* Detected Disease Section */}
          <View style={styles.explanationBox}>
            <Text style={[styles.diseaseDetected, 
              { color: diseaseLabel === "Not a Coconut Leaf" ? "#FF6F6F" : "#4CAF50" }
            ]}>
              Detected: <Text style={styles.diseaseName}>{diseaseLabel}</Text>
            </Text>

            {/* Confidence Score */}
            <View style={styles.confidenceWrapper}>
              <Text style={styles.confidenceText}>{confidencePercentage}% Confidence</Text>
              <View style={styles.confidenceBarWrapper}>
              <View style={styles.confidenceBar}>
                <View style={[styles.confidenceBar, { width: `${confidencePercentage}%` }]} />
                </View>
              </View>
            </View>

            {/* Explanation */}
            {explanation && (
              <View style={styles.explanationSection}>
                <Text style={styles.subTitle}>Model Explanation:</Text>
                <Text style={styles.description}>{explanation}</Text>
              </View>
            )}
          </View>

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

// ✅ Styles
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
  },
  header: {
    position: "relative",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  headerBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover",
  },
  headerTitle: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    padding: 16,
    alignItems: "center",
  },
  imageComparison: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    backgroundColor: "rgba(124, 252, 0, 0.1)",
    padding: 15,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  imageBox: {
    alignItems: "center",
  },
  divider: {
    width: 1,
    height: "100%",
    backgroundColor: "#ddd",
    marginHorizontal: 10,
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: "cover",
    backgroundColor: "#eee",
  },
  imagePlaceholder: {
    fontSize: 14,
    color: "#888",
    textAlign: "center",
    paddingVertical: 20,
  },
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
  diseaseDetected: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  diseaseName: {
    fontWeight: "bold",
  },
  confidenceWrapper: {
    width: "100%",
    marginTop: 15,
  },
  confidenceBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  confidenceBar: {
    flex: 1,
    height: 12,
    backgroundColor: "#ddd",
    borderRadius: 6,
    marginRight: 10,
    overflow: "hidden",
  },
  confidenceFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 6,
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
  },
  explanationSection: {
    marginTop: 15,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  navigationButton: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    alignItems: "center",
  },
  navigationButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});