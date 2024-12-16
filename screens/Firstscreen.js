import React, { useState, useEffect } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Animated,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AccuWeatherAPIKey = 'GWY8h3GrUSkHXQeG4ZLqcG1C7fPthyJB';

const Firstscreen = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-250));
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [profileName, setProfileName] = useState('');

  const cards = [
    { id: 1, label: 'FLOODS', screen: 'Floodsscreen', image: require('./assets/flood-image.png') },
    { id: 2, label: 'WEATHER', screen: 'Weatherscreen', image: require('./assets/weather-image.png') },
    { id: 3, label: 'EMERGENCY NUMBERS', screen: 'Emergencyscreen', image: require('./assets/emergencyimage.png') },
    { id: 4, label: 'NEWS AND INFORMATION', screen: 'Newsscreen', image: require('./assets/news-image.png') },
  ];

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const savedProfilePicture = await AsyncStorage.getItem('userProfilePicture');
        const savedProfileName = await AsyncStorage.getItem('userName');
        if (savedProfilePicture && savedProfilePicture !== 'defaultProfilePic') {
          setProfilePicture(savedProfilePicture);
        }
        if (savedProfileName) {
          setProfileName(savedProfileName);
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const openMenu = () => {
    setMenuVisible(true);
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    setMenuVisible(false);
    Animated.spring(slideAnim, {
      toValue: -250,
      useNativeDriver: true,
    }).start();
  };

  const getWeather = async () => {
    try {
      const response = await fetch(
        `http://dataservice.accuweather.com/currentconditions/v1/215854?apikey=${AccuWeatherAPIKey}`
      );
      const data = await response.json();
      const weather = data[0]?.WeatherText?.toLowerCase() || 'unknown';
      setWeatherCondition(weather);
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  const renderWeatherIcon = () => {
    if (!weatherCondition) return null;

    if (weatherCondition.includes('sunny')) {
      return <Image source={require('./assets/sun-icon.png')} style={styles.weatherIcon} />;
    } else if (weatherCondition.includes('rain')) {
      return <Image source={require('./assets/rain-icon.png')} style={styles.weatherIcon} />;
    } else if (weatherCondition.includes('cloud')) {
      return <Image source={require('./assets/cloud-logo.png')} style={styles.weatherIcon} />;
    }
    return null;
  };

  const logout = () => {
    navigation.navigate('LoginScreen');
  };

  const openChatbot = () => {
    navigation.navigate('ChatbotScreen'); // Ensure 'ChatbotScreen' exists in your navigator
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.menuButton} onPress={openMenu}>
          <Image source={require('./assets/menu-icon.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Text style={styles.header}>Welcome to Floodhaven</Text>
      </View>

      <ScrollView style={styles.cardContainer}>
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={styles.card}
            onPress={() => navigation.navigate(card.screen)}
          >
            <Image source={card.image} style={styles.cardImage} />
            <Text style={styles.cardText}>{card.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.weatherFrame}>
        <View style={styles.weatherBox}>
          {renderWeatherIcon()}
          <Text style={styles.weatherCondition}>
            {weatherCondition ? weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1) : 'Loading...'}
          </Text>
        </View>
      </View>

      {/* Chatbot Logo - Clicking it will navigate to the chatbot screen */}
      <TouchableOpacity style={styles.chatbotButton} onPress={openChatbot}>
        <Image source={require('./assets/chatbot-logo.png')} style={styles.chatbotIcon} />
      </TouchableOpacity>

      {menuVisible && (
        <Animated.View style={[styles.sidebar, { transform: [{ translateX: slideAnim }] }]}>
          <View style={styles.profileSection}>
            <TouchableOpacity onPress={() => navigation.navigate('EditProfileScreen')}>
              <Image
                source={profilePicture ? { uri: profilePicture } : require('./assets/default-profile.png')}
                style={styles.profileImage}
              />
            </TouchableOpacity>
            <Text style={styles.profileName}>{profileName || 'Your Name'}</Text>
          </View>

          <View style={styles.sidebarHeader}>
            <Text style={styles.sidebarTitle}>Menu</Text>
          </View>

          <View style={styles.menuItems}>
            <TouchableOpacity onPress={() => navigation.navigate('Settingscreen')}>
              <Text style={styles.menuItem}>Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={logout}>
              <Text style={styles.menuItem}>Logout</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeMenuButton} onPress={closeMenu}>
            <Text style={styles.closeMenuText}>Close</Text>
          </TouchableOpacity>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C3E50',
    padding: 10,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 12,
    flex: 1,
    textAlign: 'center',
  },
  cardContainer: {
    flex: 1,
  },
  card: {
    marginVertical: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    alignItems: 'center',
    padding: 20,
  },
  cardImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 10,
  },
  weatherFrame: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#2C3E50',
  },
  weatherBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginRight: 10,
  },
  weatherCondition: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatbotButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#2C3E50',
    borderRadius: 50,
    padding: 10,
  },
  chatbotIcon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 250,
    backgroundColor: '#2C3E50',
    zIndex: 1000,
    paddingTop: 20,
  },
  profileSection: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: 'cover',
  },
  profileName: {
    color: '#fff',
    fontSize: 18,
    marginTop: 10,
  },
  sidebarHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  sidebarTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  menuItems: {
    padding: 20,
  },
  menuItem: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 20,
  },
  closeMenuButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeMenuText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Firstscreen;
