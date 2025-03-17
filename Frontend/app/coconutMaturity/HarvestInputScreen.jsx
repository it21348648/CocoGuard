import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URLS } from "../../constants/config"; 
import { useRouter, useLocalSearchParams } from "expo-router";

export default function HarvestInputScreen() {
  const router = useRouter();
  const { imageUri, prediction } = useLocalSearchParams(); 
  console.log("📡 Received params in HarvestInputScreen:", { imageUri, prediction });

  const [location, setLocation] = useState(""); 
  const [numTrees, setNumTrees] = useState("");
  const [harvestDates, setHarvestDates] = useState([null, null, null]);
  const [showDatePicker, setShowDatePicker] = useState([false, false, false]);
  const [coconuts, setCoconuts] = useState(["", "", ""]);
  const [loading, setLoading] = useState(false);

  const getLabel = (index) => {
    if (index === 0) return "Oldest Harvest Date";
    if (index === 1) return "Second Oldest Harvest Date";
    return "Latest Harvest Date";
  };

  const handleDateChange = (event, selectedDate, index) => {
    setShowDatePicker([false, false, false]);
    if (selectedDate) {
      const updatedDates = [...harvestDates];
      updatedDates[index] = selectedDate;
      setHarvestDates(updatedDates);
    }
  };

  const submitData = async () => {
    if (!location || !numTrees || harvestDates.some(date => date === null) || coconuts.some(c => !c)) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
  
    const formattedDates = harvestDates.map(date => date.toISOString().split("T")[0]);
    const formData = {
      Location: location,
      "No. of Trees": parseInt(numTrees),
      "Harvest Date 1": formattedDates[0],
      "Harvest Date 2": formattedDates[1],
      "Harvest Date 3": formattedDates[2],
      "Coconuts Plucked 1": parseInt(coconuts[0]),
      "Coconuts Plucked 2": parseInt(coconuts[1]),
      "Coconuts Plucked 3": parseInt(coconuts[2]),
      "prediction": prediction
    };
  
    setLoading(true);
    try {
      let response = await fetch(API_URLS.PREDICT, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });
  
      let result = await response.json();
      console.log("✅ Prediction Response:", result);
  
      if (response.ok) {
        router.push({
            pathname: "/coconutMaturity/HarvestResultsScreen",
            params: {
              imageUri: imageUri || "", 
              prediction: prediction || "Unknown",
              predictedDays: result["Predicted Days Until Next Harvest"] || "N/A",
            },
          });
      } else {
        throw new Error(result.error || "Failed to predict harvest.");
      }
    } catch (error) {
      console.error("❌ Fetch Error:", error);
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Background Image with Title */}
        <View style={styles.header}>
          <Image source={require("../assets/dashboard-background1.jpg")} style={styles.headerBackground} />
          <Text style={styles.title}>Add Record</Text>
        </View>

        {/* Location Selection - FIXED */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Select Location</Text>
          <View style={styles.radioContainer}>
            {["Matara", "Kurunegala", "Gampaha"].map((item) => (
              <TouchableOpacity
                key={item}
                style={[
                  styles.radioButton,
                  location === item ? styles.radioButtonSelected : null,
                ]}
                onPress={() => setLocation(item)}
              >
                <Text style={location === item ? styles.radioTextSelected : styles.radioText}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Number of Trees Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Number of Trees</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholder="Enter number of trees"
            placeholderTextColor="#777"
            value={numTrees}
            onChangeText={setNumTrees}
          />
        </View>

        {/* Instructional Text */}
        <Text style={styles.instructionText}>
          To get an accurate prediction, enter the last three harvest dates in order.
        </Text>

        {/* Harvest Records */}
        <Text style={styles.sectionTitle}>Past Harvest Records</Text>
        {harvestDates.map((date, index) => (
          <View key={index} style={styles.recordContainer}>
            <Text style={styles.recordTitle}>{getLabel(index)}</Text>

            {/* Date Picker */}
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker([index === 0, index === 1, index === 2])}
            >
              <Text style={styles.datePickerText}>
                {date ? date.toDateString() : "📅 Select Harvest Date"}
              </Text>
            </TouchableOpacity>

            {showDatePicker[index] && (
              <DateTimePicker
                value={date || new Date()}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => handleDateChange(event, selectedDate, index)}
              />
            )}

            {/* Coconuts Plucked Input */}
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              placeholder="Number of Coconuts"
              placeholderTextColor="#777"
              value={coconuts[index]}
              onChangeText={(value) => {
                const updatedCoconuts = [...coconuts];
                updatedCoconuts[index] = value;
                setCoconuts(updatedCoconuts);
              }}
            />
          </View>
        ))}

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={submitData} disabled={loading}>
          <Text style={styles.submitButtonText}>
            {loading ? "Submitting..." : "Predict Next Harvest"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f9f9f9" },
  scrollContainer: { padding: 20 },
  header: { height: 200, justifyContent: "center", alignItems: "center", position: "relative" },
  headerBackground: { width: "100%", height: "100%", position: "absolute", resizeMode: "cover" },
  title: { fontSize: 28, fontWeight: "bold", color: "#fff", textAlign: "center" },
  instructionText: { fontSize: 16, color: "#555", textAlign: "center", marginVertical: 10, paddingHorizontal: 15 },
  radioContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 15 },
  radioButton: { padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#007BFF", width: 110, alignItems: "center" },
  radioButtonSelected: { backgroundColor: "#007BFF" },
  radioText: { fontSize: 16, color: "#007BFF" },
  radioTextSelected: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  input: { height: 50, backgroundColor: "#fff", borderRadius: 10, paddingHorizontal: 12, fontSize: 18, borderWidth: 1, borderColor: "#ddd", color: "#333" },
  datePickerButton: { backgroundColor: "#ffffff", borderWidth: 1, borderColor: "#007BFF", padding: 12, borderRadius: 10, alignItems: "center" },
  datePickerText: { fontSize: 16, color: "#007BFF", fontWeight: "bold" },
  submitButton: { backgroundColor: "#007BFF", padding: 15, borderRadius: 10, marginTop: 20, alignItems: "center" },
  submitButtonText: { fontSize: 18, color: "#fff", fontWeight: "bold" },
});