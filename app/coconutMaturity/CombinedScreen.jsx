import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

const CombinedScreen = () => {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const [pastRecords, setPastRecords] = useState([
    { id: 1, date: "", coconuts: "" },
    { id: 2, date: "", coconuts: "" },
    { id: 3, date: "", coconuts: "" },
    { id: 4, date: "", coconuts: "" },
    { id: 5, date: "", coconuts: "" },
  ]);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const openCalendar = () => setCalendarVisible(true);
  const closeCalendar = () => setCalendarVisible(false);

  const handlePastRecordChange = (id, field, value) => {
    setPastRecords((prevRecords) =>
      prevRecords.map((record) =>
        record.id === id ? { ...record, [field]: value } : record
      )
    );
  };

  const handleSave = () => {
    router.push({
      pathname: "/coconutMaturity/ExpandedEntryView",
      params: {
        prediction: "Mature",
        date: "12/08/2024",
        coconuts: 50,
        age: "10 years",
        environment: "Rainy",
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.headerContainer}>
        <Image
          source={require("../assets/MaturityBg.jpg")}
          style={styles.headerBackground}
          resizeMode="cover"
        />
        <Text style={styles.title}>Add New Record</Text>
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Instructions Section */}
        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsText}>
            To get an accurate harvest prediction date, please enter at least 3
            past harvest records.
          </Text>
        </View>

        {/* Coconut Tree Information Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Coconut Tree Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Number of Coconut Trees"
            placeholderTextColor="#666"
          />
          <TextInput
            style={styles.input}
            placeholder="Tree Age (Average)"
            placeholderTextColor="#666"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Environmental Factors"
            placeholderTextColor="#666"
          />

          {/* Image Upload Section */}
          <TouchableOpacity style={styles.photoUpload} onPress={openModal}>
            <Text style={styles.photoText}>Tap to Upload Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Modal for Image Upload */}
        <Modal
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Upload Image</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={closeModal}
              >
                <Text style={styles.modalButtonText}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={closeModal}
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

        {/* Past Records Section */}
        <Text style={styles.sectionTitle}>Past Harvest Records</Text>
        {pastRecords.map((record) => (
          <View key={record.id} style={styles.recordCard}>
            <Text style={styles.recordTitle}>Record {record.id}</Text>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={openCalendar}
            >
              <Text style={styles.dateInputText}>
                {record.date || "Date of Harvest"}
              </Text>
            </TouchableOpacity>
            <TextInput
              style={styles.input}
              placeholder="Number of Coconuts"
              placeholderTextColor="#666"
              keyboardType="numeric"
              value={record.coconuts}
              onChangeText={(text) =>
                handlePastRecordChange(record.id, "coconuts", text)
              }
            />
          </View>
        ))}

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save All Data</Text>
        </TouchableOpacity>

        {/* Calendar Modal */}
        <Modal
          transparent={true}
          animationType="slide"
          visible={calendarVisible}
          onRequestClose={closeCalendar}
        >
          <View style={styles.calendarOverlay}>
            <View style={styles.calendarContent}>
              <Text style={styles.calendarText}>Calendar Placeholder</Text>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={closeCalendar}
              >
                <Text style={styles.modalButtonText}>Close Calendar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: "#fff" },
    headerContainer: {
      position: "absolute",
      top: 0,
      width: "100%",
      height: 200,
      zIndex: 10,
    },
    headerBackground: {
      width: "100%",
      height: "100%",
    },
    title: {
      position: "absolute",
      bottom: 20,
      fontSize: 40,
      fontWeight: "bold",
      color: "#fff",
      textShadowColor: "rgba(0, 0, 0, 0.5)",
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 4,
      alignSelf: "center",
      marginBottom: 40,
    },
    container: { flexGrow: 1, paddingTop: 220, paddingHorizontal: 16 },
    instructionsCard: {
      backgroundColor: "#f9f9f9",
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
      borderColor: "#ddd",
      borderWidth: 1,
    },
    instructionsText: {
      fontSize: 16,
      color: "#555",
      textAlign: "center",
    },
    photoUpload: {
      height: 150,
      borderWidth: 1,
      borderColor: "#ddd",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f9f9f9",
      borderRadius: 10,
      marginBottom: 20,
    },
    photoText: {
      fontSize: 16,
      color: "#555",
    },
    card: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 15,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    sectionTitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
    input: {
      height: 45,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 12,
      marginBottom: 10,
      backgroundColor: "#f9f9f9",
      color: "#333",
      fontSize: 16,
    },
    recordCard: {
      backgroundColor: "#fff",
      borderRadius: 10,
      padding: 15,
      marginBottom: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    recordTitle: { fontSize: 16, fontWeight: "bold", marginBottom: 8 },
    dateInput: {
      height: 45,
      borderColor: "#ccc",
      borderWidth: 1,
      borderRadius: 8,
      justifyContent: "center",
      paddingHorizontal: 12,
      marginBottom: 10,
      backgroundColor: "#f9f9f9",
    },
    dateInputText: {
      fontSize: 16,
      color: "#555",
    },
    saveButton: {
      backgroundColor: "#4CAF50",
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: "center",
      marginTop: 20,
    },
    saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    modalOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
      width: "80%",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    calendarOverlay: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    calendarContent: {
      width: "80%",
      backgroundColor: "#fff",
      padding: 20,
      borderRadius: 10,
      alignItems: "center",
    },
    calendarText: {
      fontSize: 18,
      marginBottom: 20,
    },
    modalButton: {
      padding: 12,
      backgroundColor: "#4CAF50",
      borderRadius: 8,
      width: "100%",
      alignItems: "center",
      marginBottom: 10,
    },
    modalButtonText: { color: "#fff", fontWeight: "bold" },
    cancelButton: { backgroundColor: "#f9f9f9" },
    cancelText: { color: "#555" },
  });

export default CombinedScreen;