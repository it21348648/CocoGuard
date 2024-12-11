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
import { useRouter } from "expo-router";

export default function LeafPredict() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header with background image */}
        <View style={styles.header}>
          <Image
            source={require("../assets/Coconut Leafe.jpg")} // Use the same background image
            style={styles.headerBackground}
          />
          <Text style={styles.headerTitle}>Prediction Results</Text>
        </View>

        <View style={styles.content}>
          {/* Placeholder Images for Saliency Mapping */}
          <View style={styles.imageComparison}>
            <View style={styles.imageBox}>
              <Text style={styles.imageLabel}>Original Image</Text>
              <Image
                source={require("../assets/unhealthyleaf.jpg")} // Replace with actual path
                style={styles.image}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.imageBox}>
              <Text style={styles.imageLabel}>Saliency Map</Text>
              <Image
                source={require("../assets/saliencyunhealthyleaf.jpg")} // Replace with placeholder
                style={styles.image}
              />
            </View>
          </View>

          {/* Explanation Section */}
          <View style={styles.explanationBox}>
            <Text style={styles.diseaseDetected}>
              Disease Detected: <Text style={styles.diseaseName}>Gray Leaf</Text>
            </Text>
            <Text style={styles.description}>
              The model highlights these regions as resembling patterns of gray
              leaf disease with a confidence level of:
            </Text>
            <View style={styles.confidenceBarWrapper}>
              <View style={styles.confidenceBar}>
                <View style={[styles.confidenceFill, { width: "87%" }]} />
              </View>
              <Text style={styles.confidenceText}>87%</Text>
            </View>
          </View>

          {/* Suggested Actions */}
          <Text style={styles.subTitle}>Suggested Actions:</Text>
          <Text style={styles.description}>
            1. Remove affected leaves promptly.{"\n"}
            2. Use recommended fungicides.{"\n"}
            3. Monitor other plants for early symptoms.
          </Text>

          {/* Navigation Button */}
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
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
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
    backgroundColor: "rgba(124, 252, 0, 0.1)", // Light green background
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
    marginBottom: 10,
    color: "#FF6F6F",
    textAlign: "center",
  },
  diseaseName: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  confidenceBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
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
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4CAF50",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
    textAlign: "center",
  },
  navigationButton: {
    marginTop: 30,
    padding: 16,
    backgroundColor: "#4CAF50",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  navigationButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});