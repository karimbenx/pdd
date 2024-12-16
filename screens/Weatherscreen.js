import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, Alert, StyleSheet, ScrollView, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';

const accuweatherAPIKey = 'GWY8h3GrUSkHXQeG4ZLqcG1C7fPthyJB'; // Replace with your actual API key

const Weatherscreen = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) {
      Alert.alert('Error', 'Please enter a city name');
      return;
    }

    setLoading(true);
    try {
      const locationResponse = await axios.get(
        'https://dataservice.accuweather.com/locations/v1/cities/search',
        {
          params: {
            apikey: accuweatherAPIKey,
            q: city,
          },
        }
      );

      const locationData = locationResponse.data;
      if (!locationData || locationData.length === 0) {
        throw new Error('Location not found.');
      }

      const locationKey = locationData[0].Key;
      const locationName = locationData[0].LocalizedName;
      const countryName = locationData[0].Country.LocalizedName;

      const weatherResponse = await axios.get(
        `https://dataservice.accuweather.com/currentconditions/v1/${locationKey}`,
        {
          params: {
            apikey: accuweatherAPIKey,
          },
        }
      );

      const weather = weatherResponse.data[0];
      if (!weather) {
        throw new Error('Weather data not available.');
      }

      const weatherDescription = weather.WeatherText.toLowerCase();
      let iconUrl;

      if (weatherDescription.includes('rain')) {
        iconUrl = require('./assets/rain-icon.png');
      } else if (weatherDescription.includes('sun') || weatherDescription.includes('clear')) {
        iconUrl = require('./assets/sun-icon.png');
      } else {
        iconUrl = require('./assets/cloud-logo.png');
      }

      setWeatherData({
        location: `${locationName}, ${countryName}`,
        temperature: weather.Temperature.Metric.Value,
        description: weather.WeatherText,
        icon: iconUrl,
      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
      Alert.alert('Error', error.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weather Information</Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Image
          source={require('./assets/search-icon.png')} // Replace with your search icon
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch}
        />
      </View>

      {/* Search Button */}
      <Pressable
        onPress={handleSearch}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? '#1e8449' : '#2ecc71' },
        ]}
      >
        <Text style={styles.buttonText}>Get Weather</Text>
      </Pressable>

      {/* Loading Indicator */}
      {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.loading} />}

      {/* Weather Data */}
      {weatherData && !loading && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
            <Text style={styles.boldText}>Location:</Text> {weatherData.location}
          </Text>
          <Text style={styles.weatherText}>
            <Text style={styles.boldText}>Temperature:</Text> {weatherData.temperature} °C
          </Text>
          <Text style={styles.weatherText}>
            <Text style={styles.boldText}>Description:</Text> {weatherData.description}
          </Text>

          {/* Weather Icon */}
          <View style={styles.iconContainer}>
            <Image source={weatherData.icon} style={styles.weatherIcon} />
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ADD8E6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  loading: {
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
  },
  searchIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  weatherContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  boldText: {
    fontWeight: 'bold',
  },
  iconContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  weatherIcon: {
    width: 80,
    height: 80,
  },
});

export default Weatherscreen;
