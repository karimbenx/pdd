import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // Initially no profile picture

  // Request permission to access gallery
  const requestGalleryPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE);
    if (result === RESULTS.GRANTED) {
      openGallery();
    } else {
      Alert.alert('Permission Denied', 'You need to grant permission to access the gallery.');
    }
  };

  // Request permission to access camera
  const requestCameraPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.CAMERA);
    if (result === RESULTS.GRANTED) {
      openCamera();
    } else {
      Alert.alert('Permission Denied', 'You need to grant permission to use the camera.');
    }
  };

  // Open the gallery to select an image
  const openGallery = () => {
    launchImageLibrary({ mediaType: 'photo', includeBase64: false }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const imageUri = response.assets[0].uri;
        setProfilePicture(imageUri);
        saveProfileData(imageUri);
      }
    });
  };

  // Open the camera to capture a new image
  const openCamera = () => {
    launchCamera({ mediaType: 'photo', includeBase64: false }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.errorCode) {
        console.log('Camera Error: ', response.errorMessage);
      } else {
        const imageUri = response.assets[0].uri;
        setProfilePicture(imageUri);
        saveProfileData(imageUri);
      }
    });
  };

  // Function to save the profile data
  const saveProfileData = async (imageUri) => {
    try {
      await AsyncStorage.setItem('userName', name);
      await AsyncStorage.setItem('userProfilePicture', imageUri || 'defaultProfilePic'); // Save URI or default
      alert('Profile saved successfully!');
      navigation.goBack(); // Go back to the previous screen (SettingsScreen)
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  // Fetch profile data from AsyncStorage on screen load
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const savedName = await AsyncStorage.getItem('userName');
        const savedProfilePicture = await AsyncStorage.getItem('userProfilePicture');
        if (savedName) setName(savedName);
        if (savedProfilePicture && savedProfilePicture !== 'defaultProfilePic') {
          setProfilePicture(savedProfilePicture);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      {/* Profile Image */}
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={requestGalleryPermission}>
          <Image
            source={profilePicture ? { uri: profilePicture } : require('./assets/default-profile.png')} // Default image
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
      />

      {/* Save Button */}
      <Button title="Save Profile" onPress={() => saveProfileData(profilePicture)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#ADD8E6',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    width: '80%',
  },
});

export default EditProfileScreen;
