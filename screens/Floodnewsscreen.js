import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const Floodnewsscreen = () => {
  const [floodNews, setFloodNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NewsData.io API Key
  const newsAPIKey = 'pub_56968ce6c7bd29f44c2b49986a56ecaaa1dad';  // Your API key
  const newsAPIUrl = `https://newsdata.io/api/1/news?apikey=${newsAPIKey}&q=flood%20news%20in%20chennai`;

  // Fetch flood news articles for Chennai
  const getFloodNews = async () => {
    try {
      const response = await axios.get(newsAPIUrl);

      if (response.data && response.data.results) {
        setFloodNews(response.data.results);  // Set state with fetched news
      } else {
        setError('No flood news found for Chennai.');
      }
    } catch (error) {
      setError('Error fetching flood news. Please try again later.');
      console.error(error);
    } finally {
      setLoading(false);  // Set loading to false once the request is done
    }
  };

  // Fetch news when component mounts
  useEffect(() => {
    getFloodNews();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Flood News</Text>

      {/* Loading or Error Handling */}
      {loading && <Text>Loading flood news...</Text>}
      {error && <Text style={styles.errorText}>{error}</Text>}

      <ScrollView>
        {floodNews.length > 0 ? (
          floodNews.map((article, index) => (
            <View key={index} style={styles.articleContainer}>
              <Text style={styles.title}>{article.title}</Text>
              <Text style={styles.description}>{article.description}</Text>
            </View>
          ))
        ) : (
          !loading && <Text>No flood news available.</Text>
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

export default Floodnewsscreen;
