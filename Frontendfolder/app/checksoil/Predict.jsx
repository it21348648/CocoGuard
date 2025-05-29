import { Ionicons } from "@expo/vector-icons"; // ✅ Import for back button
import { useRouter, useLocalSearchParams } from "expo-router"; // ✅ Import for passing parameters
import React, { useState, useEffect } from "react";
import {
    FlatList,
    Image,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PredictionScreen() {
    const router = useRouter();
    const params = useLocalSearchParams(); // ✅ Get API response parameters
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProvince, setSelectedProvince] = useState("Select the Province");

    // ✅ Extract values safely from API response
    const predictedNitrogen = params.Nitrogen || "N/A";
    const predictedPhosphorus = params.Phosphorus || "N/A";
    const predictedPotassium = params.Potassium || "N/A";

    const provinces = ["Southern Province", "Western Province", "Northwest Province"];

    const goBack = () => {
        router.back(); // ✅ Go back to the previous screen
    };

    const openModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const selectProvince = (province) => {
        setSelectedProvince(province);
        closeModal();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Image source={require("../assets/Soil_IoT.jpg")} style={styles.image} />
                <TouchableOpacity style={styles.backButton} onPress={goBack}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                </TouchableOpacity>

                <View style={styles.container}>
                    <Text style={styles.header}>Prediction</Text>
                    <Text style={styles.subHeader}>
                        This prediction provides the required N, P, and K values to be added to the soil, measured in grams.
                        The selected province and predicted N, P, and K values are displayed below.
                    </Text>

                    {/* Province Selection */}
                    {/* <TouchableOpacity style={styles.dropdown} onPress={openModal}>
            <Text style={styles.dropdownText}>{selectedProvince}</Text>
          </TouchableOpacity> */}

                    {/* Modal for Province Selection */}
                    {/* <Modal
            transparent={true}
            animationType="fade"
            visible={modalVisible}
            onRequestClose={closeModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  data={provinces}
                  keyExtractor={(item) => item}
                  renderItem={({ item }) => (
                    <TouchableOpacity style={styles.modalItem} onPress={() => selectProvince(item)}>
                      <Text style={styles.modalText}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </Modal> */}

                    {/* ✅ Prediction Box - Displays Values from API Response */}
                    <View style={styles.predictionBox}>
                        <Text style={styles.predictionText}>Predicted Nitrogen: {predictedNitrogen} mg</Text>
                        <Text style={styles.predictionText}>Predicted Phosphorus: {predictedPhosphorus} mg</Text>
                        <Text style={styles.predictionText}>Predicted Potassium: {predictedPotassium} mg</Text>
                    </View>


                    {/* Done Button */}
                    <TouchableOpacity style={styles.button} onPress={goBack}>
                        <Text style={styles.buttonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    safeArea: {
        flex: 1,
        backgroundColor: "#fff",
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },
    header: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 5,
    },
    subHeader: {
        fontSize: 14,
        color: "#555",
        marginBottom: 20,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 10,
        backgroundColor: "#f5f5f5",
    },
    dropdownText: {
        color: "#555",
    },
    image: {
        width: "100%",
        height: 350,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 10,
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
    },
    modalItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    modalText: {
        fontSize: 16,
    },
    predictionBox: {
        height: 120,
        backgroundColor: "#f5f5f5",
        borderRadius: 8,
        padding: 15,
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: 20,
    },
    predictionText: {
        fontSize: 16,
        color: "#555",
    },
    button: {
        backgroundColor: "#4CAF50",
        padding: 15,
        borderRadius: 8,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    backButton: {
        position: "absolute",
        top: 15,
        left: 15,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 10,
        borderRadius: 20,
    },
});
