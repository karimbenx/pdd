import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Newsscreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>News and Information</Text>

      {/* Button to navigate to Flood News */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Floodnewsscreen')}
      >
        <ImageBackground
          source={require('./assets/floodnews.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.textContainer}>
            <Text style={styles.label}>Flood News</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      {/* Button to navigate to Weather News */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Weathernewsscreen')}
      >
        <ImageBackground
          source={require('./assets/weathernews.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.textContainer}>
            <Text style={styles.label}>Weather News</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      {/* Button to navigate to About Floods */}
      <TouchableOpacity
        style={styles.option}
        onPress={() => navigation.navigate('Aboutfloodsscreen')}
      >
        <ImageBackground
          source={require('./assets/aboutfloods.png')}
          style={styles.imageBackground}
          imageStyle={styles.imageStyle}
        >
          <View style={styles.textContainer}>
            <Text style={styles.label}>About Floods</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

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
    flexDirection: 'column',  // Stack image and text vertically
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

export default Newsscreen;
