import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';

export default function LeafUploadScreen({ onNavigate }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#E8FBE8' }}>
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
            fontSize: 28,
            fontWeight: 'bold',
            textAlign: 'center',
            color: '#006F3B',
            marginBottom: 20,
          }}
        >
          Coconut Disease
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: '#4A4A4A',
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          You can upload your image and check whether the coconut is infected or not.
        </Text>
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          style={{
            backgroundColor: '#6FDB98',
            paddingVertical: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginVertical: 10,
            elevation: 3,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 18, fontWeight: 'bold' }}>
            Upload the Image
          </Text>
        </TouchableOpacity>
        <Modal transparent={true} visible={modalVisible} animationType="slide">
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}
          >
            <View
              style={{
                backgroundColor: '#fff',
                padding: 20,
                borderRadius: 10,
                width: '80%',
                alignItems: 'center',
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 20 }}>
                Upload Image
              </Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: '#6FDB98',
                  paddingVertical: 10,
                  borderRadius: 5,
                  width: '100%',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>Take Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: '#6FDB98',
                  paddingVertical: 10,
                  borderRadius: 5,
                  width: '100%',
                  alignItems: 'center',
                  marginBottom: 10,
                }}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>Choose from Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={{
                  backgroundColor: '#FF6F6F',
                  paddingVertical: 10,
                  borderRadius: 5,
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Text style={{ color: '#fff', fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
