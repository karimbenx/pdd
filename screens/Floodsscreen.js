import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Floodsscreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Flood Information</Text>

      {/* Button to navigate to Flood Prone Areas Map */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Floodmapscreen')}
      >
        <ImageBackground
          source={require('./assets/floodprone.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.textContainer}>
            <Text style={styles.label}>Flood Prone Areas in Chennai Map</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      {/* Button to navigate to Rainfall Data */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Rainfalldatascreen')}
      >
        <ImageBackground
          source={require('./assets/floodprediction.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.textContainer}>
            <Text style={styles.label}>Rainfall Data in Chennai</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      {/* Button to navigate to Flood Prediction */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Floodpredictionscreen')}
      >
        <ImageBackground
          source={require('./assets/Rainfall.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.textContainer}>
            <Text style={styles.label}>Flood Prediction in Chennai</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d3eaf5',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginVertical: 20,
  },
  option: {
    flexDirection: 'column',  // Column direction for image and text
    alignItems: 'center',
    marginVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    padding: 10,
    height: 150, // Adjust the height as needed
  },
  imageBackground: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',  // Ensures image takes the 75% space
    borderRadius: 10,
  },
  imageStyle: {
    width: '100%',
    height: '75%', // 75% of the button height for the image
    borderRadius: 10,
  },
  textContainer: {
    height: '25%',  // 25% of the button height for the text
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',  // Optional: background color to make text stand out
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

export default Floodsscreen;
