import React, { useState } from "react";
import { API_URLS } from "../../constants/config"; // Import API URLs
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

export default function LeafDiseaseUpload2() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  // Function to handle image selection
  const pickImage = async (fromCamera) => {
    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.Images,
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.Images,
        quality: 1,
      });
    }

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
    closeModal();
  };

  // Function to upload image to backend
  const submitForAnalysis = async () => {
    if (!selectedImage) {
      Alert.alert("No Image Selected", "Please upload an image first.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", {
      uri: selectedImage,
      name: "testleaf.jpg",
      type: "image/jpeg",
    });

    try {
      console.log("Submitting to:", API_URLS.EXPLAIN2);
      console.log("FormData:", formData);

      const response = await fetch(API_URLS.EXPLAIN2, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response Status:", response.status);
      const data = await response.json();
      console.log("Upload Success:", data);
      setLoading(false);

      if (response.ok) {
        router.push({
          pathname: "/leafdiseases/LeafPredict2",
          params: {
            prediction: data.prediction,
            explanation: JSON.stringify(data.explanation), // 🔍 Ensure JSON object is converted to string
            gradcamPath: data.gradcam_path,
            limePath: data.lime_path,
          },
        });
      } else {
        throw new Error(data.message || "Analysis failed");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Upload Failed", `Error: ${error.message}`);
      console.error("Upload Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image source={require("../assets/Coconut Leafe.jpg")} style={styles.image} />
          <Text style={styles.centeredTitle}>Leaf Disease</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            Upload an image to detect leaf diseases that may affect your coconut plants. 
            Our tool uses advanced AI to provide accurate predictions and insights.
          </Text>

          <TouchableOpacity style={styles.uploadButton} onPress={openModal}>
            <Text style={styles.uploadButtonText}>Upload the Image</Text>
          </TouchableOpacity>

          {selectedImage && (
            <View style={styles.imageContainer}>
              <Image source={{ uri: selectedImage }} style={styles.previewImage} />
            </View>
          )}

          <TouchableOpacity
            style={[styles.submitButton, !selectedImage && styles.disabledButton]}
            onPress={submitForAnalysis}
            disabled={!selectedImage || loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.submitButtonText}>Submit for Analysis</Text>}
          </TouchableOpacity>

          {/* Modal for Upload Options */}
          <Modal transparent={true} animationType="fade" visible={modalVisible} onRequestClose={closeModal}>
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

                <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={closeModal}>
                  <Text style={[styles.modalButtonText, styles.cancelText]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ✅ Updated Styles
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
    backgroundColor: "#4CAF50",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  centeredTitle: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -100 }, { translateY: -30 }],
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  content: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
    textAlign: "center",
  },
  uploadButton: {
    padding: 15,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 20,
  },
  uploadButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  imageContainer: {
    borderWidth: 2,
    borderColor: "#4CAF50",
    borderRadius: 10,
    padding: 5,
    marginBottom: 16,
    alignItems: "center",
  },
  previewImage: {
    width: 250,
    height: 250,
    borderRadius: 8,
  },
  submitButton: {
    padding: 12,
    backgroundColor: "#007BFF", // Blue color
    borderRadius: 8,
    alignItems: "center",
    width: "70%", // Reduced width
    alignSelf: "center", // Centered on the screen
  },
  submitButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#555",
  },
  modalButton: {
    padding: 12,
    width: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#e0e0e0",
  },
  cancelText: {
    color: "#555",
  },
});

