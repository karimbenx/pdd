import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Aboutfloodsscreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Floods</Text>

      {/* Button to navigate to What is Floods? */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Whatisfloodscreen')}
      >
        <ImageBackground
          source={require('./assets/whatisflood.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.textContainer}>
            <Text style={styles.label}>What is Floods?</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      {/* Button to navigate to Safety Precautions */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Safetyprecautionsscreen')}
      >
        <ImageBackground
          source={require('./assets/safetyandprecautions.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.textContainer}>
            <Text style={styles.label}>Safety Precautions</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      {/* Button to navigate to Do's and Don'ts */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Dosanddontsscreen')}
      >
        <ImageBackground
          source={require('./assets/dosanddonts.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.textContainer}>
            <Text style={styles.label}>Do's and Don'ts</Text>
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
    flexDirection: 'column', // Column direction for image and text
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
    justifyContent: 'flex-start', // Ensures image takes 75% of the space
    borderRadius: 10,
  },
  imageStyle: {
    width: '100%',
    height: '75%', // 75% of the button height for the image
    borderRadius: 10,
  },
  textContainer: {
    height: '25%', // 25% of the button height for the text
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Optional: background color to make text stand out
    borderRadius: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
  },
});

export default Aboutfloodsscreen;
