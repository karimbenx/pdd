import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

const TitleScreen = ({ navigation }) => {  // Add navigation as a prop
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* Cloud images */}
        <Image source={require('./assets/clouds.png')} style={styles.cloud} />
        <Image source={require('./assets/clouds.png')} style={[styles.cloud, styles.cloudRight]} />
      </View>
      <View style={styles.content}>
        {/* Logo and text */}
        <Image source={require('./assets/floodhaven-logo.png')} style={styles.logo} />
        <Text style={styles.title}>FLOODHAVEN</Text>
        <Text style={styles.subtitle}>DISASTER RESILIENCE APP FOR FLOODS</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.buttonText}>GET STARTED</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E91B8',  // Light blue background
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 1,  // Ensure the clouds are above the main content
  },
  cloud: {
    width: 80,  // Increased cloud size
    height: 80, // Increased cloud size
    resizeMode: 'contain',
  },
  cloudRight: {
    position: 'absolute',
    top: 10,  // Position it a little lower
    right: 10, // Position it to the right side
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,  // Prevents content from being blocked by header
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    color: 'white',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#2E91B8', // Matching color for text
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TitleScreen;
