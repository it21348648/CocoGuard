import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // ✅ Import for back button

export default function CoconutDisease() {
  const [modalVisible, setModalVisible] = useState(false);
  const [processingModal, setProcessingModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const router = useRouter();

  const goBack = () => {
    router.back(); // ✅ Go back to the previous screen
  };

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  // ✅ Request Permissions
  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission required", "Please grant permission to use the gallery.");
      return false;
    }
    return true;
  };

  // ✅ Open Image Picker (Camera or Gallery)
  const pickImage = async (fromCamera) => {
    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    let result;
    if (fromCamera) {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    } else {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
    }

    if (!result.canceled) {
      console.log("✅ Picked Image:", result.assets[0].uri);
      setSelectedImage(result.assets[0].uri);

      setProcessingModal(true); // ✅ Show processing modal
      setTimeout(() => sendImageToBackend(result.assets[0].uri), 500); // Small delay to ensure UI update
    }

    setModalVisible(false);
  };

  // ✅ Send Image to Backend
  const sendImageToBackend = async (imageUri) => {
    console.log("🚀 Starting API Call...");
    setProcessingModal(true); // ✅ Ensure modal stays open before API call

    try {
        // ✅ Ensure image URI exists
        if (!imageUri) {
            throw new Error("Image URI is empty. Cannot send to backend.");
        }

        // ✅ Convert local file URI to FormData format
        const formData = new FormData();
        formData.append("image", {
            uri: imageUri,
            name: `upload_${Date.now()}.jpg`,
            type: "image/jpeg",
        });

        console.log("✅ FormData Prepared:", formData);

        // ✅ Make API request
        const response = await fetch("http://172.20.10.2:6000/api/process", { 
          // Ensure correct API endpoint
            method: "POST",
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        // ✅ Parse JSON response
        const data = await response.json();
        console.log("✅ Response from backend:", data);

        if (response.ok) {
            setProcessingModal(false);
            router.push({
                pathname: "/coconutdisease/MitaAttack",
                params: { 
                    classification: data.classification.label, // ✅ Pass classification
                    uploadedImage: imageUri,  // ✅ Pass uploaded image URI to MitaAttack
                },
            });
        } else {
            throw new Error(data.error || "Failed to process image.");
        }
    } catch (error) {
        setProcessingModal(false);
        console.error("❌ Error sending image:", error);
        Alert.alert("Error", error.message);
    }
};



  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Image
          source={require("../assets/Coconutnut.jpg")}
          style={styles.image}
        />
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.title}>Coconut Disease</Text>
          <Text style={styles.description}>
            Upload an image to check if the coconut is infected or healthy.
          </Text>

          <TouchableOpacity style={styles.addToCartButton} onPress={openModal}>
            <Text style={styles.addToCartText}>Upload Image</Text>
          </TouchableOpacity>

          {/* ✅ Image Upload Modal */}
          <Modal transparent={true} animationType="fade" visible={modalVisible}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Upload Image</Text>
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

          {/* ✅ Processing Image Popup (Now Fully Working) */}
          <Modal transparent={true} animationType="fade" visible={processingModal}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <ActivityIndicator size="large" color="#4CAF50" />
                <Text style={styles.modalTitle}>Image is processing...</Text>
              </View>
            </View>
          </Modal>

          {/* ✅ Existing Code (UNCHANGED) */}
          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>
          Coconut mites damage coconuts by causing scars, deformed nuts, and early nut drop. This app helps farmers easily detect mite attacks.
          </Text>

          <Text style={styles.relatedTitle}>Other Solutions</Text>
          <ScrollView horizontal style={styles.relatedProducts}>
            <Image source={require("../assets/Coconut Leafe.jpg")} style={styles.relatedImage} />
            <Image source={require("../assets/Soil.jpg")} style={styles.relatedImage} />
            <Image source={require("../assets/Maturity.jpg")} style={styles.relatedImage} />
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#4CAF50", // Add a background color for the safe area
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
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
  relatedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  relatedProducts: {
    flexDirection: "row",
    marginBottom: 16,
  },
  relatedImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  addToCartButton: {
    padding: 16,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
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
    width: "100%",
    padding: 12,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#f5f5f5", // Different background for cancel button
  },
  cancelText: {
    color: "#555", // Different text color for cancel button
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    padding: 10,
    borderRadius: 20,
  },
});
