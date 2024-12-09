import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function LeafPredictScreen({ onNavigateBack }) {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <View style={{ padding: 20 }}>
        <Image
          source={require('../assets/images/coconut-header.jpg')} // Replace with your header image
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'cover',
            borderRadius: 10,
            marginBottom: 20,
          }}
        />
        <Text
          style={{
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#006F3B',
            marginBottom: 20,
          }}
        >
          Coconut Disease Diagnosis
        </Text>
        <Image
          source={require('../assets/images/unhealthy01.jpg')} // Replace with your disease image
          style={{
            width: '100%',
            height: 200,
            resizeMode: 'contain',
            borderRadius: 10,
            marginBottom: 20,
          }}
        />
        <TouchableOpacity
          style={{
            backgroundColor: '#FF6F6F',
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Preview</Text>
        </TouchableOpacity>
        <View
          style={{
            backgroundColor: '#F9F9F9',
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#FF6F6F', marginBottom: 10 }}>
            Disease Detected: Gray Leaf
          </Text>
          <Text style={{ color: '#4A4A4A', marginBottom: 10 }}>
            Spots detected in the highlighted region match the pattern of gray leaf disease.
          </Text>
        </View>
        <TouchableOpacity
          onPress={onNavigateBack}
          style={{
            backgroundColor: '#6FDB98',
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>
            Go Back to Upload Screen
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
