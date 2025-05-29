import { Ionicons } from "@expo/vector-icons"; // ✅ Import for back button
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SoilDetails() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState("Select the Province");
  const [nitrogen, setNitrogen] = useState("");
  const [phosphorus, setPhosphorus] = useState("");
  const [potassium, setPotassium] = useState("");
  const [ph, setPh] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState(""); // ✅ New input field
  const router = useRouter();

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

  const handlePredict = async () => {
    if (!nitrogen || !phosphorus || !potassium || !ph || !temperature || !humidity) {
      Alert.alert("Error", "Please fill all fields!");
      return;
    }

    const inputData = {
      nitrogen: parseFloat(nitrogen),
      phosphorus: parseFloat(phosphorus),
      potassium: parseFloat(potassium),
      ph: parseFloat(ph),
      temperature: parseFloat(temperature),
      humidity: parseFloat(humidity)
    };

    try {
      const response = await fetch("http://172.20.10.2:6000/predict/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputData),
      });

      const result = await response.json();
      if (response.ok) {
        router.push({ pathname: "/checksoil/Predict", params: result });
      } else {
        Alert.alert("Prediction Error", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Network Error", "Failed to connect to the server.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Image source={require("../assets/Soil_IoT.jpg")} style={styles.image} />
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.header}>Soil Details</Text>

          <Text style={styles.subHeader}>
            IoT data will be used to analyze and respond to nitrogen (N), phosphorus (P), potassium (K), pH, and temperature levels.
            This predictive model will be developed for selected districts
            in the future, allowing for targeted improvements in agricultural decision-making.
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Nitrogen Value"
            keyboardType="numeric"
            placeholderTextColor="#999" 
            value={nitrogen !== "" ? String(nitrogen) : ""}
            onChangeText={setNitrogen}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Phosphorus Value"
            keyboardType="numeric"
            placeholderTextColor="#999" 
            value={phosphorus !== "" ? String(phosphorus) : ""}
            onChangeText={setPhosphorus}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Potassium Value"
            keyboardType="numeric"
            placeholderTextColor="#999" 
            value={potassium !== "" ? String(potassium) : ""}
            onChangeText={setPotassium}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter pH Level"
            keyboardType="numeric"
            placeholderTextColor="#999" 
            value={ph !== "" ? String(ph) : ""}
            onChangeText={setPh}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Temperature"
            keyboardType="numeric"
            placeholderTextColor="#999" 
            value={temperature !== "" ? String(temperature) : ""}
            onChangeText={setTemperature}
          />

          <TextInput
            style={styles.input}
            placeholder="Enter Humidity"
            keyboardType="numeric"
            placeholderTextColor="#999" 
            value={humidity !== "" ? String(humidity) : ""}
            onChangeText={setHumidity}
          />


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
                /> */}
          {/* Close Button */}
          {/* <TouchableOpacity style={[styles.button, { marginTop: 10 }]} onPress={closeModal}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handlePredict}>
            <Text style={styles.buttonText}>Get Prediction</Text>
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
  input: {
    borderWidth: 1,
    borderColor: "#4CAF50",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f5f5f5",
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
