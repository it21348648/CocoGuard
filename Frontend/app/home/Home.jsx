import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context"; // Import SafeAreaView
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation for navigation

export default function Home() {
  const router = useRouter(); // Initialize router
  return (
    <SafeAreaView style={styles.safeArea}>
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hi Wilson! 👋</Text>
        <Text style={styles.subtitle}>Enjoy our services!</Text>
        <TouchableOpacity style={styles.notification}>
          <Text>🔔</Text>
        </TouchableOpacity>
      </View>

      <TextInput
        style={styles.searchBar}
        placeholder="Search here..."
        placeholderTextColor="#888"
      />

      <View style={styles.consultation}>
        <Text style={styles.consultationText}>Free Consultation</Text>
        <Text style={styles.consultationSubtext}>
          Get free support from our customer service
        </Text>
        <TouchableOpacity style={styles.callButton}>
          <Text style={styles.callButtonText}>Call Now</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.featuredTitle}>Featured Products</Text>
      <View style={styles.products}>
        {/* Coconut Disease Card */}
        <TouchableOpacity
            style={styles.productCard}
            onPress={() => router.push("/coconutdisease/CoconutDisease")} // Navigate to Coconut Disease
          >
            <Image
              source={require("../assets/Coconutnut.jpg")}
              style={styles.productImage}
            />
            <Text style={styles.productName}>Coconut Disease</Text>
            <Text style={styles.productPrice}>Scan</Text>
          </TouchableOpacity>
        <View style={styles.productCard}>
          <Image
            source={require("../assets/Coconut Leafe.jpg")}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Leaf Disease</Text>
          <Text style={styles.productPrice}>Scan</Text>
        </View>
        <View style={styles.productCard}>
          <Image
            source={require("../assets/Soil.jpg")}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Check Soil</Text>
          <Text style={styles.productPrice}>Scan</Text>
        </View>
        <View style={styles.productCard}>
          <Image
            source={require("../assets/Maturity.jpg")}
            style={styles.productImage}
          />
          <Text style={styles.productName}>Maturity Level</Text>
          <Text style={styles.productPrice}>Scan</Text>
        </View>
        {/* Add more product cards as needed */}
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Make the SafeAreaView fill the screen
    backgroundColor: "#4CAF50", // Match the background color of your app
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
  },
  notification: {
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 20,
  },
  searchBar: {
    margin: 16,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
  },
  consultation: {
    margin: 16,
    padding: 16,
    borderRadius: 8,
    backgroundColor: "#E7F5E9",
  },
  consultationText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  consultationSubtext: {
    fontSize: 14,
    color: "#555",
    marginVertical: 8,
  },
  callButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 8,
  },
  callButtonText: {
    textAlign: "center",
    color: "#fff",
  },
  featuredTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
    marginTop: 16,
  },
  products: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    marginTop: 16,
  },
  productCard: {
    width: "45%",
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#F9F9F9",
    marginBottom: 16,
    alignItems: "center",
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  productPrice: {
    fontSize: 14,
    color: "#555",
  },
});
