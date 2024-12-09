import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function LeafDiseaseUpload() {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Image
          source={require("../assets/Coconut Leafe.jpg")} // Replace with your leaf disease image
          style={styles.image}
        />
        <View style={styles.content}>
          <Text style={styles.title}>Leaf Disease</Text>
          <Text style={styles.description}>
            You can upload your image and check for leaf diseases affecting your coconut plants.
          </Text>

          <TouchableOpacity style={styles.addToCartButton} onPress={openModal}>
            <Text style={styles.addToCartText}>Upload the Image</Text>
          </TouchableOpacity>

          {/* Custom Popup Modal */}
          <Modal
            transparent={true}
            animationType="fade"
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Upload Image</Text>
                <Text style={styles.modalMessage}>
                  Choose an action to upload your image.
                </Text>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    console.log("Take Photo Pressed");
                    closeModal();
                  }}
                >
                  <Text style={styles.modalButtonText}>Take Photo</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.modalButton}
                  onPress={() => {
                    console.log("Choose from Gallery Pressed");
                    closeModal();
                  }}
                >
                  <Text style={styles.modalButtonText}>Choose from Gallery</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.modalButton, styles.cancelButton]}
                  onPress={closeModal}
                >
                  <Text style={[styles.modalButtonText, styles.cancelText]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>
            Detect common leaf diseases early and prevent significant crop losses with timely interventions.
          </Text>

          <Text style={styles.relatedTitle}>Related Products</Text>
          <ScrollView horizontal style={styles.relatedProducts}>
            <Image
              source={require("../assets/Coconutnut.jpg")}
              style={styles.relatedImage}
            />
            <Image
              source={require("../assets/Soil.jpg")}
              style={styles.relatedImage}
            />
            <Image
              source={require("../assets/Maturity.jpg")}
              style={styles.relatedImage}
            />
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
});
