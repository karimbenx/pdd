import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

const ChatbotScreen = () => {
  const [userInput, setUserInput] = useState('');
  const [chatbotResponse, setChatbotResponse] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = 'YNvxgpUDZoEqZV9y5Nv8u3F5y90HRTG3';
  const location = '37.7749,-122.4194'; // Example location (latitude,longitude) - San Francisco

  // Function to fetch weather data from Tomorrow.io API
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`https://api.tomorrow.io/v4/timelines?location=${location}&fields=temperature,precipitation,weatherCode&apikey=${apiKey}`);
      const data = response.data;
      const currentWeather = data.data.timelines[0].intervals[0].values;

      setWeatherData(currentWeather);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Function to handle user input and chatbot response
  const handleUserInput = () => {
    if (userInput.trim()) {
      const userMessage = userInput.trim();
      setChatbotResponse((prevResponses) => [...prevResponses, { type: 'user', text: userMessage }]);
      setUserInput('');

      // Check if the input contains weather-related questions
      if (userMessage.toLowerCase().includes('weather')) {
        fetchWeatherData();
        setChatbotResponse((prevResponses) => [
          ...prevResponses,
          { type: 'bot', text: 'Fetching weather information for you...' }
        ]);
      } else {
        setChatbotResponse((prevResponses) => [
          ...prevResponses,
          { type: 'bot', text: 'I can help with weather information. Ask me about the weather!' }
        ]);
      }
    }
  };

  useEffect(() => {
    // Fetch weather data once when the screen is loaded
    fetchWeatherData();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatContainer}>
        {chatbotResponse.map((message, index) => (
          <View key={index} style={message.type === 'user' ? styles.userMessage : styles.botMessage}>
            <Text style={styles.messageText}>{message.text}</Text>
          </View>
        ))}

        {weatherData && (
          <View style={styles.weatherBox}>
            <Text style={styles.weatherInfo}>Current Temperature: {weatherData.temperature}°C</Text>
            <Text style={styles.weatherInfo}>Precipitation: {weatherData.precipitation} mm</Text>
            <Text style={styles.weatherInfo}>Weather Code: {weatherData.weatherCode}</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ask me about the weather..."
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity onPress={handleUserInput} style={styles.sendButton}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    paddingTop: 40,
  },
  chatContainer: {
    paddingHorizontal: 20,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  botMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#2196F3',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  messageText: {
    color: '#fff',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderRadius: 20,
    padding: 10,
    backgroundColor: '#f1f1f1',
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  weatherBox: {
    backgroundColor: '#fff',
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  weatherInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ChatbotScreen;
