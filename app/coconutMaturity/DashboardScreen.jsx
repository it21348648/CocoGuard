import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function DashboardScreen() {
  const router = useRouter();

  const data = [
    {
      id: "1",
      date: "12/08/2024",
      prediction: "Mature",
      coconuts: 50,
      range: 0.8,
      image: require("../assets/coconut1.png"),
    },
    {
      id: "2",
      date: "11/28/2024",
      prediction: "Young",
      coconuts: 30,
      range: 0.6,
      image: require("../assets/coconut2.png"),
    },
  ];

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.thumbnail} />
      <View style={styles.cardContent}>
        <Text style={styles.harvestDate}>Harvest Date: {item.date}</Text>
        <Text style={styles.prediction}>
          <Text style={styles.label}>Prediction: </Text>
          {item.prediction}
        </Text>
        <Text style={styles.coconuts}>
          <Text style={styles.label}>Coconuts: </Text>
          {item.coconuts}
        </Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => router.push("/coconutMaturity/ExpandedEntryView")}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <Image
          source={require("../assets/dashboard-background1.jpg")}
          style={styles.headerBackground}
        />
        <Text style={styles.title}>Dashboard</Text>
      </View>
      <TouchableOpacity
        style={styles.addRecordButton}
        onPress={() => router.push("/coconutMaturity/CombinedScreen")}
      >
        <Text style={styles.addRecordButtonText}>Add New Record</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  headerBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    resizeMode: "cover", // Removed opacity for a vivid image
  },
  title: {
    fontSize: 60, // Increased font size
    fontWeight: "bold", // Made it bold
    color: "#fff",
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  addRecordButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginHorizontal: 16,
    marginVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  addRecordButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  thumbnail: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  harvestDate: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
    color: "#333",
  },
  label: {
    fontWeight: "600",
    color: "#4CAF50",
  },
  prediction: {
    fontSize: 16,
    color: "#555",
    marginBottom: 4,
  },
  coconuts: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  detailsButton: {
    backgroundColor: "#4CAF50",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    marginTop: 6,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});