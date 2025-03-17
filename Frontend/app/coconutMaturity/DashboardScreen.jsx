import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { API_URLS } from "../../constants/config"; // Ensure API URL is imported

export default function DashboardScreen() {
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  // Function to pick an image from the gallery
  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled && result.assets?.length > 0) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        classifyImage(imageUri);
      }
    } catch (error) {
      console.error("Image Picker Error:", error);
      Alert.alert("Error", "Failed to open image picker.");
    }
  };

  // Function to send image to backend and get a prediction
  const classifyImage = async (imageUri) => {
    setLoading(true);
    let filename = imageUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image/jpeg`; // Default to jpeg if unknown

    let formData = new FormData();
    formData.append("file", {
      uri: imageUri,
      name: filename,
      type,
    });

    try {
      console.log("Uploading to API:", API_URLS.CLASSIFY);
      
      let response = await fetch(API_URLS.CLASSIFY, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      let result = await response.json();
      console.log("Prediction Result:", result);

      if (response.ok) {
        setPrediction(result);
      } else {
        throw new Error(result.error || "Unknown error occurred.");
      }
    } catch (error) {
      Alert.alert("Error", `Failed to classify image: ${error.message}`);
      console.error("Image Upload Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image source={require("../assets/dashboard-background1.jpg")} style={styles.headerBackground} />
        <Text style={styles.title}>Dashboard</Text>
      </View>

      {/* Upload Image Button */}
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Text style={styles.uploadButtonText}>Upload Image from Gallery</Text>
      </TouchableOpacity>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />}

      {/* Display Selected Image */}
      {selectedImage && <Image source={{ uri: selectedImage }} style={styles.previewImage} />}

      {/* Display Prediction Results */}
      {prediction && (
        <View style={styles.predictionContainer}>
          <Text style={styles.predictionText}>Prediction: {prediction.prediction}</Text>
          {prediction.confidence && (
            <Text style={styles.predictionText}>
              Confidence: {(prediction.confidence * 100).toFixed(2)}%
            </Text>
          )}
          {prediction.message && <Text style={styles.predictionMessage}>{prediction.message}</Text>}

          {/* Show Form Button When Prediction is "Young" or "Mature" */}
          {["Young", "Mature"].includes(prediction.prediction) && (
          <TouchableOpacity
            style={styles.formButton}
            onPress={() => {
              console.log("📡 Navigating to HarvestInputScreen with:", {
                imageUri: selectedImage,
                prediction: prediction.prediction,
                confidence: prediction.confidence ? (prediction.confidence * 100).toFixed(2) : "N/A",
              });

              router.push({
                pathname: "/coconutMaturity/HarvestInputScreen",
                params: {
                  imageUri: selectedImage,
                  prediction: prediction.prediction,
                  confidence: prediction.confidence ? (prediction.confidence * 100).toFixed(2) : "0", // Default to "0"
                },
              });
            }}
          >
            <Text style={styles.formButtonText}>Provide Harvest Details</Text>
          </TouchableOpacity>
        )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f9f9f9" },
  header: { height: 250, justifyContent: "center", alignItems: "center", position: "relative" },
  headerBackground: { width: "100%", height: "100%", position: "absolute", resizeMode: "cover" },
  title: { fontSize: 50, fontWeight: "bold", color: "#fff", textAlign: "center" },
  uploadButton: { backgroundColor: "#4CAF50", padding: 15, borderRadius: 12, margin: 16, alignItems: "center" },
  uploadButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  previewImage: { width: 200, height: 200, alignSelf: "center", marginTop: 20, borderRadius: 10 },
  predictionContainer: { alignItems: "center", marginTop: 20 },
  predictionText: { fontSize: 18, fontWeight: "bold", color: "#4CAF50" },
  predictionMessage: { fontSize: 16, color: "#555", marginTop: 10 },
  formButton: { backgroundColor: "#007BFF", padding: 12, borderRadius: 10, marginTop: 20 },
  formButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold", textAlign: "center" },
});