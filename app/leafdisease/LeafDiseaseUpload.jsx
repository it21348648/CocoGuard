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
import { useRouter } from "expo-router";

export default function LeafDiseaseUpload() {
  const [modalVisible, setModalVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // State to manage hover effect
  const router = useRouter();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Image
            source={require("../assets/Coconut Leafe.jpg")}
            style={styles.image}
          />
          <Text style={styles.centeredTitle}>Leaf Disease</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.description}>
            Upload an image to detect leaf diseases that may affect your coconut
            plants. Our tool uses advanced AI to provide accurate predictions
            and insights.
          </Text>

          <TouchableOpacity style={styles.uploadButton} onPress={openModal}>
            <Text style={styles.uploadButtonText}>Upload the Image</Text>
          </TouchableOpacity>

          {/* Modal for Upload Options */}
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
                  <Text style={styles.modalButtonText}>
                    Choose from Gallery
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.modalButton,
                    styles.cancelButton,
                    isHovered && styles.cancelButtonHovered,
                  ]}
                  onPressIn={() => setIsHovered(true)}
                  onPressOut={() => setIsHovered(false)}
                  onPress={closeModal}
                >
                  <Text style={[styles.modalButtonText, styles.cancelText]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          {/* Information Section */}
          <Text style={styles.descriptionTitle}>
            Why is Coconut Leaf Health Important?
          </Text>
          <Text style={styles.description}>
            Healthy leaves contribute to optimal coconut growth. Detect issues
            like gray leaf disease early to maintain high yields and a healthy
            harvest.
          </Text>

          <Text style={styles.descriptionTitle}>
            Tips for Monitoring Coconut Leaf Health:
          </Text>
          <Text style={styles.description}>
            1. Look for early signs regularly. {"\n"}
            2. Prune damaged leaves immediately. {"\n"}
            3. Use recommended treatments and fertilizers. {"\n"}
            4. Provide adequate hydration and nutrition.
          </Text>

          {/* Related Products Section */}
          <Text style={styles.relatedTitle}>Recommended Products</Text>
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

          <TouchableOpacity
            style={styles.navigationButton}
            onPress={() => router.push("/leafdisease/LeafPredict")}
          >
            <Text style={styles.navigationButtonText}>Go to Prediction</Text>
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
    transform: [{ translateX: -115 }, { translateY: -30 }], // Adjusted for better centering
    fontSize: 42, // Larger font size for a modern look
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  content: {
    padding: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 16,
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
  relatedTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 16,
  },
  relatedProducts: {
    flexDirection: "row",
  },
  relatedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
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
  cancelButtonHovered: {
    backgroundColor: "#FF6F6F",
  },
  cancelText: {
    color: "#555",
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