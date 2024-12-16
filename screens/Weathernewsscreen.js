import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ScrollView, Linking } from 'react-native';
import axios from 'axios';

const WeatherNewsScreen = () => {
  const [weatherNews, setWeatherNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NewsData.io API Key
  const newsAPIKey = 'pub_56968ce6c7bd29f44c2b49986a56ecaaa1dad';  // Your API key
  const newsAPIUrl = `https://newsdata.io/api/1/news?apikey=${newsAPIKey}&q=weather%20in%20chennai`;

  // Fetch weather news articles for Chennai
  const getWeatherNews = async () => {
    try {
      const response = await axios.get(newsAPIUrl);

      if (response.data && response.data.results) {
        setWeatherNews(response.data.results);  // Set state with fetched news
      } else {
        setError('No weather news found for Chennai.');
      }
    } catch (error) {
      setError('Error fetching weather news. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);  // Set loading to false once the request is done
    }
  };

  // Fetch news when component mounts
  useEffect(() => {
    getWeatherNews();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Weather News</Text>

      {/* Loading or Error Handling */}
      {loading && <Text>Loading weather news...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <ScrollView>
        {weatherNews.length > 0 ? (
          weatherNews.map((article, index) => (
            <View key={index} style={styles.articleContainer}>
              <Text style={styles.title}>{article.title}</Text>
              <Text style={styles.description}>{article.description}</Text>
              <Button
                title="Read More"
                onPress={() => Linking.openURL(article.link)}  // Open full article
              />
            </View>
          ))
        ) : (
          !loading && <Text>No weather news available.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  articleContainer: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginVertical: 10,
  },
});

export default WeatherNewsScreen;
