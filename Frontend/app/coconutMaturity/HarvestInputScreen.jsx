import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import { API_URLS } from "../../constants/config"; 
import { useRouter, useLocalSearchParams } from "expo-router";

export default function HarvestInputScreen() {
  const router = useRouter();
  const { prediction } = useLocalSearchParams(); 

  const [location, setLocation] = useState(""); 
  const [numTrees, setNumTrees] = useState("");
  const [harvestDates, setHarvestDates] = useState([null, null, null]);
  const [showDatePicker, setShowDatePicker] = useState([false, false, false]);
  const [coconuts, setCoconuts] = useState(["", "", ""]);
  const [loading, setLoading] = useState(false);

  // Handle Date Selection
  const handleDateChange = (event, selectedDate, index) => {
    setShowDatePicker([false, false, false]);
    if (selectedDate) {
      const updatedDates = [...harvestDates];
      updatedDates[index] = selectedDate;
      setHarvestDates(updatedDates);
    }
  };

  // Handle Form Submission
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
    };
  
    setLoading(true);
    try {
      console.log("📡 Sending request to:", API_URLS.PREDICT);
      console.log("📤 Form Data:", formData);
  
      let response = await fetch(API_URLS.PREDICT, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
      });
  
      console.log("📥 Response received:", response);
  
      let result = await response.json();
      console.log("✅ Prediction Response:", result);
  
      if (response.ok) {
        Alert.alert(
          "Success",
          `Predicted Harvest in ${result["Predicted Days Until Next Harvest"]} days.`
        );
        router.back();
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
        <Text style={styles.title}>Add New Record</Text>

        {/* Location Selection - Using TouchableOpacity */}
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
            value={numTrees}
            onChangeText={setNumTrees}
          />
        </View>

        {/* Harvest Records */}
        <Text style={styles.sectionTitle}>Past Harvest Records</Text>
        {harvestDates.map((date, index) => (
          <View key={index} style={styles.recordContainer}>
            <Text style={styles.recordTitle}>Record {index + 1}</Text>

            {/* Date Picker */}
            <TouchableOpacity
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker([index === 0, index === 1, index === 2])}
            >
              <Text style={styles.datePickerText}>
                {date ? date.toDateString() : "Select Date of Harvest"}
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
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  inputContainer: { marginBottom: 15 },
  label: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  radioContainer: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
  radioButton: {
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#007BFF",
    backgroundColor: "#fff",
    width: 100,
    alignItems: "center",
  },
  radioButtonSelected: {
    backgroundColor: "#007BFF",
  },
  radioText: { fontSize: 16, color: "#007BFF" },
  radioTextSelected: { fontSize: 16, color: "#fff", fontWeight: "bold" },
  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 20, marginBottom: 10 },
  recordContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  recordTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 5 },
  datePickerButton: {
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  datePickerText: { fontSize: 16, color: "#333" },
  submitButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
  },
  submitButtonText: { fontSize: 18, color: "#fff", fontWeight: "bold" },
});