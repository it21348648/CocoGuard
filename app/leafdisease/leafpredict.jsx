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
        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>Prediction Results</Text>

          {/* Placeholder Images for Saliency Mapping */}
          <View style={styles.imageComparison}>
            <View style={styles.imageBox}>
              <Text style={styles.imageLabel}>Original Image</Text>
              <Image
                source={require("../assets/unhealthyleaf.jpg")} // Replace with actual path
                style={styles.image}
              />
            </View>
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
              The model highlights these regions as resembling patterns of gray leaf disease with a confidence level of:
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
    backgroundColor: "#4CAF50",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  imageComparison: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    backgroundColor: "rgba(124, 252, 0, 0.3)", // Light green background with opacity
    padding: 10,
    borderRadius: 8,
  },
  imageBox: {
    alignItems: "center",
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "contain",
  },
  explanationBox: {
    backgroundColor: "#E8F5E9",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: "100%",
  },
  diseaseDetected: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#FF6F6F",
  },
  diseaseName: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  confidenceBarWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  confidenceBar: {
    flex: 1,
    height: 10,
    backgroundColor: "#ddd",
    borderRadius: 5,
    marginRight: 10,
    overflow: "hidden",
  },
  confidenceFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4CAF50",
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
    textAlign: "center",
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
