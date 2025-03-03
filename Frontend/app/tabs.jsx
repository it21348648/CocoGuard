import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import Home from "./home/Home"; // Home screen
import AboutUs from "./aboutus/AboutUs"; // About Us screen
import ContactUs from "./contactus/ContactUs"; // Contact Us screen
import CoconutDisease from "./coconutdisease/CoconutDisease"; // Coconut Disease screen

const Tab = createBottomTabNavigator();


export default function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false, // Hide header for all tabs
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "ContactUs") {
            iconName = "call";
          } else if (route.name === "AboutUs") {
            iconName = "information-circle";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "green",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="ContactUs" component={ContactUs} />
      <Tab.Screen name="AboutUs" component={AboutUs} />
      
      
    </Tab.Navigator>
  );
}
