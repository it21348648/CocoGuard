import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import API_BASE_URL from "../../constants/config"; // Ensure API URL is imported

export default function DashboardScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // Request Camera and Gallery Permissions
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: galleryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (cameraStatus !== "granted" || galleryStatus !== "granted") {
      Alert.alert("Permissions Required", "Please grant camera and gallery permissions.");
      return false;
    }
    return true;
  };

  // Handle Image Selection
  const pickImage = async (fromCamera) => {
    setModalVisible(false); // Close modal
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      let result = fromCamera
        ? await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          })
        : await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
          });

      console.log("Image Picker Result:", result);

      if (!result.canceled && result.assets?.length > 0) {
        const imageUri = result.assets[0].uri;
        setSelectedImage(imageUri);
        classifyImage(imageUri);
      } else {
        console.log("Image selection was canceled.");
      }
    } catch (error) {
      console.error("Image Picker Error:", error);
      Alert.alert("Error", "Failed to open image picker.");
    }
  };

  // Send Image to Backend for Classification
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
      console.log("Uploading to API:", `${API_BASE_URL}/coconut/classify-coconut`);
      
      let response = await fetch(`${API_BASE_URL}/coconut/classify-coconut`, {
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
      <TouchableOpacity style={styles.uploadButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.uploadButtonText}>Upload Image</Text>
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
        </View>
      )}

      {/* Image Picker Modal */}
      <Modal transparent={true} animationType="fade" visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Upload Image</Text>
            <Text style={styles.modalMessage}>Choose an action to upload your image.</Text>

            <TouchableOpacity style={styles.modalButton} onPress={() => pickImage(true)}>
              <Text style={styles.modalButtonText}>Take Photo</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalButton} onPress={() => pickImage(false)}>
              <Text style={styles.modalButtonText}>Choose from Gallery</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setModalVisible(false)}>
              <Text style={[styles.modalButtonText, styles.cancelText]}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalOverlay: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0, 0, 0, 0.5)" },
  modalContent: { width: "80%", padding: 20, backgroundColor: "#fff", borderRadius: 10, alignItems: "center" },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
  modalMessage: { fontSize: 14, textAlign: "center", marginBottom: 20, color: "#555" },
  modalButton: { padding: 12, width: "100%", backgroundColor: "#4CAF50", borderRadius: 8, alignItems: "center", marginBottom: 10 },
  modalButtonText: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  cancelButton: { backgroundColor: "#e0e0e0" },
  cancelText: { color: "#555" },
});