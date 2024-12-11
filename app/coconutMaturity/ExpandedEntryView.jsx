import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const ExpandedEntryView = () => {
  const router = useRouter();

  // Retrieve parameters passed via router.push
  const params = useLocalSearchParams();

  const {
    prediction = "N/A",
    date = "N/A",
    coconuts = "N/A",
    age = "N/A",
    environment = "N/A",
  } = params;

  // Feedback state
  const [feedback, setFeedback] = useState(null);

  const handleFeedback = (response) => {
    setFeedback(response);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <ImageBackground
          source={require("../assets/prediction-background.jpg")}
          style={styles.headerBackground}
          resizeMode="cover"
        >
          <Text style={styles.title}>Prediction Details</Text>
        </ImageBackground>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Coconut Image */}
        <Image
          source={require("../assets/coconut1.png")}
          style={styles.image}
        />

        {/* Highlighted Maturity Status and Harvest Date */}
        <View style={styles.highlightedContainer}>
          <Text style={styles.highlightedDetail}>
            Maturity Status:{" "}
            <Text style={styles.highlightedText}>{prediction}</Text>
          </Text>
          <Text style={styles.highlightedDetail}>
            Harvest Date: <Text style={styles.highlightedText}>{date}</Text>
          </Text>
          <Text style={styles.dateRange}>(Range: 09/08/2024 - 15/08/2024)</Text>
        </View>

        {/* Prediction Accuracy Section */}
        <View style={styles.accuracyContainer}>
          <Text style={styles.accuracyText}>Prediction Accuracy: 85%</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: "85%" }]} />
          </View>
        </View>

        {/* Details Card */}
        <View style={styles.detailsContainer}>
          <Text style={styles.detailLabel}>
            <Text style={styles.boldText}>Coconuts Harvested:</Text> {coconuts}
          </Text>
          <Text style={styles.detailLabel}>
            <Text style={styles.boldText}>Tree Age:</Text> {age}
          </Text>
          <Text style={styles.detailLabel}>
            <Text style={styles.boldText}>Environmental Factors:</Text>{" "}
            {environment}
          </Text>
        </View>

        {/* Back Button */}
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>

        {/* Feedback Section */}
        <View style={styles.feedbackContainer}>
          <Text style={styles.feedbackTitle}>Was this helpful?</Text>
          <View style={styles.feedbackButtons}>
            <TouchableOpacity
              style={[
                styles.feedbackButton,
                feedback === "yes" ? styles.selectedButton : null,
              ]}
              onPress={() => handleFeedback("yes")}
            >
              <Text
                style={[
                  styles.feedbackButtonText,
                  feedback === "yes" ? styles.selectedButtonText : null,
                ]}
              >
                Yes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.feedbackButton,
                feedback === "no" ? styles.selectedButton : null,
              ]}
              onPress={() => handleFeedback("no")}
            >
              <Text
                style={[
                  styles.feedbackButtonText,
                  feedback === "no" ? styles.selectedButtonText : null,
                ]}
              >
                No
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
    marginTop: 150, // Offset for the fixed header
  },
  headerContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 150,
    zIndex: 10,
    backgroundColor: "rgba(0,0,0,0.3)", // Optional background overlay
  },
  headerBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    marginTop: 30,
  },
  image: {
    width: 220,
    height: 220,
    borderRadius: 10,
    marginBottom: 20,
  },
  highlightedContainer: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    alignItems: "center",
  },
  highlightedDetail: {
    fontSize: 20,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 8,
  },
  highlightedText: {
    fontSize: 20,
    color: "#4CAF50",
    fontWeight: "bold",
  },
  dateRange: {
    fontSize: 14,
    color: "#666",
    fontStyle: "italic",
    marginTop: 5,
  },
  accuracyContainer: {
    width: "100%",
    marginBottom: 20,
    alignItems: "center",
  },
  accuracyText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  progressBar: {
    width: "80%",
    height: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
  },
  detailsContainer: {
    width: "100%",
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  detailLabel: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },
  backButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  feedbackContainer: {
    marginBottom: 20,
    alignItems: "center",
  },
  feedbackTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  feedbackButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
  },
  feedbackButton: {
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
    marginHorizontal: 10,
  },
  feedbackButtonText: {
    fontSize: 14,
    color: "#555",
  },
  selectedButton: {
    backgroundColor: "#4CAF50",
  },
  selectedButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ExpandedEntryView;