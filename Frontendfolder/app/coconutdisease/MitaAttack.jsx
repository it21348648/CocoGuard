import React, { useState } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Modal 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router"; // ✅ Get data from navigation
import { Ionicons } from "@expo/vector-icons"; // ✅ Import for back button

export default function MitaAttack() {
  const { classification, uploadedImage } = useLocalSearchParams(); // ✅ Get classification result & uploaded image path
  const router = useRouter();
  console.log("✅ Classification received:", classification);
  console.log("✅ Uploaded Image URL:", uploadedImage); // Debugging

  const [modalVisible, setModalVisible] = useState(false); // ✅ State to handle image popup

  const goBack = () => {
    router.back(); // ✅ Go back to the previous screen
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <Image
          source={require("../assets/Coconutnut.jpg")} // ✅ Ensure correct image is displayed
          style={styles.headerImage}
        />
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Ionicons name="arrow-back" size={30} color="#fff" />
          </TouchableOpacity>
        <View style={styles.content}>
          {/* ✅ Dynamically update the title based on classification */}
          <Text style={styles.title}>
            {classification === "coconut mita"
              ? "Mite Attack Detected"
              : classification === "Healthy Coconut"
              ? "Healthy Coconut"
              : classification === "Non Coconut"
              ? "This is not a coconut"
              : classification}
          </Text>


          {/* ✅ New "View Uploaded Image" button */}
          {uploadedImage && (
            <TouchableOpacity style={styles.viewImageButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.viewImageText}>View Uploaded Image</Text>
            </TouchableOpacity>
          )}

          {/* ✅ New Modal to Show Uploaded Image */}
          <Modal transparent={true} visible={modalVisible} animationType="slide">
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Image source={{ uri: uploadedImage }} style={styles.modalImage} />
                <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <Text style={styles.descriptionTitle}>Description</Text>
          <Text style={styles.description}>
            Coconut mites damage coconuts by causing scars, deforming nuts, and making them drop early. This affects coconut quality and reduces yield. Identifying mite attacks early helps farmers take necessary steps to protect their crops and maintain healthy coconut production.
          </Text>

          {/* ✅ Show mitigation techniques ONLY if Mite Attack */}
          {classification && classification.trim() === "coconut mita" && (
            <>
              <Text style={styles.descriptionTitle}>Mitigation Techniques</Text>
              <View style={styles.bulletList}>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>
                    Using Sulphur-Palm oil mixture: Mix soap powder (12g), sulphur (5g), and palm oil (200ml) in 800ml of water.
                  </Text>
                </View>
                <View style={styles.bulletItem}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.bulletText}>Using natural enemies of pests.</Text>
                </View>
              </View>
            </>
          )}
          
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
  backButton: {
    position: "absolute",
    top: 15,
    left: 15,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 10,
    borderRadius: 20,
  },
  viewImageButton: {
    padding: 12,
    backgroundColor: "#FFA500", // Orange color
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  viewImageText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 300,
    borderRadius: 8,
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#FF3333", // Red color
    borderRadius: 8,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
