import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Confidence Bar Component
const ConfidenceBar = ({ confidence }) => (
  <View style={styles.progressBarContainer}>
    <View
      style={[
        styles.progressBar,
        { width: `${confidence}%`, backgroundColor: confidence > 50 ? "green" : "red" },
      ]}
    />
  </View>
);

export default function MitaAttack() {
  const [confidence, setConfidence] = useState(95); // Confidence Level (default 85%)

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        {/* Header Image */}
        <Image
          source={require("../assets/Coconutnut.jpg")} // Replace with your own image
          style={styles.headerImage}
        />

        <View style={styles.content}>
          {/* Title */}
          <Text style={styles.title}>Mita Attack Detection</Text>

          {/* Confidence Level */}
          <Text style={styles.confidenceText}>Confidence Level: {confidence}%</Text>
          <ConfidenceBar confidence={confidence} />

          {/* Description */}
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>
            Mita Attack detection enables farmers to identify, mitigate, and
            prevent pests effectively. This service focuses on evaluating
            coconut trees for signs of pest infestations, ensuring healthy crop
            yield and sustainability.
          </Text>

        <Text style={styles.descriptionTitle}>Mitigation Techniques</Text>
            <View style={styles.bulletList}>
            <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>
                Using Sulphur-Palm oil mixture: Sulphur and (add the method of making the mixture) - How to make the mixture: to 800 ml of water, add and mix soap powder 12 gms and sulphur 5 gms well, then add palm oil 200 ml.
                </Text>
            </View>
            <View style={styles.bulletItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.bulletText}>Using natural enemies of pests</Text>
            </View>
        </View>

          {/* Booking Button */}
          <TouchableOpacity style={styles.bookingButton}>
            <Text style={styles.bookingButtonText}>Okay</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#4CAF50", // Match safe area background to the theme
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerImage: {
    width: "100%",
    height: 250,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
  },
  confidenceText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    color: "#333",
  },
  progressBarContainer: {
    height: 20,
    width: "100%",
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 8,
  },
  progressBar: {
    height: "100%",
    borderRadius: 10,
  },
  bookingButton: {
    padding: 16,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  bookingButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  bulletList: {
    marginTop: 8,
    marginBottom: 16,
  },
  bulletItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 8,
  },
  bullet: {
    fontSize: 18,
    color: "#333",
    marginRight: 8,
    marginTop: 2,
  },
  bulletText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
    flex: 1,
  },
  
});
