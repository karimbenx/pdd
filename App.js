import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'react-native';

// Import Screens
import Titlescreen from './screens/Titlescreen'; 
import SignUpScreen from './screens/SignUpScreen';
import LoginScreen from './screens/LoginScreen';
import Firstscreen from './screens/Firstscreen';
import Floodsscreen from './screens/Floodsscreen';
import Weatherscreen from './screens/Weatherscreen';
import Emergencyscreen from './screens/Emergencyscreen';
import Newsscreen from './screens/Newsscreen';
import Floodmapscreen from './screens/Floodmapscreen';
import Rainfalldatascreen from './screens/Rainfalldatascreen';
import Floodpredictionscreen from './screens/Floodpredictionscreen';
import Aboutfloodsscreen from './screens/Aboutfloodsscreen';
import Whatisfloodscreen from './screens/Whatisfloodscreen';
import Safetyprecautionsscreen from './screens/Safetyprecautionsscreen';
import Dosanddontsscreen from './screens/Dosanddontsscreen';
import Floodnewsscreen from './screens/Floodnewsscreen';
import Weathernewsscreen from './screens/Weathernewsscreen';
import MapScreen from './screens/MapScreen';
import Settingscreen from './screens/Settingscreen';
import EditProfileScreen from './screens/EditProfileScreen';  
import AboutUsScreen from './screens/AboutUsScreen';
import PrivacyPolicyScreen from './screens/PrivacyPolicyScreen';
import TermsAndConditionsScreen from './screens/TermsAndConditionsScreen';
import ChatbotScreen from './screens/ChatbotScreen';  // Import Chatbot Screen

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* Ensure the status bar matches the theme */}
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Stack.Navigator
        initialRouteName="Titlescreen"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2C3E50', // Black header background
          },
          headerTintColor: '#fff', // White back button and title
          headerTitleStyle: {
            color: '#fff', // White title color
          },
          cardStyle: {
            backgroundColor: '#fff', // White screen background
          },
        }}
      >
        {/* Screens */}
        <Stack.Screen
          name="Titlescreen"
          component={Titlescreen}
          options={{ headerShown: false }} // Hide header for Titlescreen
        />
        <Stack.Screen
          name="SignUpScreen"
          component={SignUpScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Firstscreen"
          component={Firstscreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Floodsscreen"
          component={Floodsscreen}
          options={{ headerTitle: 'Flood Information' }}
        />
        <Stack.Screen
          name="Weatherscreen"
          component={Weatherscreen}
          options={{ headerTitle: 'Weather in Chennai' }}
        />
        <Stack.Screen
          name="Emergencyscreen"
          component={Emergencyscreen}
          options={{ headerTitle: 'Emergency' }}
        />
        <Stack.Screen
          name="Newsscreen"
          component={Newsscreen}
          options={{ headerTitle: 'News' }}
        />
        <Stack.Screen
          name="Floodmapscreen"
          component={Floodmapscreen}
          options={{ headerTitle: 'Flood Map' }}
        />
        <Stack.Screen
          name="Rainfalldatascreen"
          component={Rainfalldatascreen}
          options={{ headerTitle: 'Rainfall Data' }}
        />
        <Stack.Screen
          name="Floodpredictionscreen"
          component={Floodpredictionscreen}
          options={{ headerTitle: 'Flood Prediction' }}
        />
        <Stack.Screen
          name="Aboutfloodsscreen"
          component={Aboutfloodsscreen}
          options={{ headerTitle: 'About Floods' }}
        />
        <Stack.Screen
          name="Whatisfloodscreen"
          component={Whatisfloodscreen}
          options={{ headerTitle: 'What is Flood?' }}
        />
        <Stack.Screen
          name="Safetyprecautionsscreen"
          component={Safetyprecautionsscreen}
          options={{ headerTitle: 'Safety Precautions' }}
        />
        <Stack.Screen
          name="Dosanddontsscreen"
          component={Dosanddontsscreen}
          options={{ headerTitle: 'Dos and Don’ts' }}
        />
        <Stack.Screen
          name="Floodnewsscreen"
          component={Floodnewsscreen}
          options={{ headerTitle: 'Flood News' }}
        />
        <Stack.Screen
          name="Weathernewsscreen"
          component={Weathernewsscreen}
          options={{ headerTitle: 'Weather News' }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerTitle: 'Map' }}
        />
        <Stack.Screen
          name="Settingscreen"
          component={Settingscreen}
          options={{ headerTitle: 'Settings' }}
        />
        <Stack.Screen
          name="EditProfileScreen"
          component={EditProfileScreen}
          options={{ headerTitle: 'Edit Profile' }}
        />
        <Stack.Screen
          name="AboutUsScreen"
          component={AboutUsScreen}
          options={{ headerTitle: 'About Us' }}
        />
        <Stack.Screen
          name="PrivacyPolicyScreen"
          component={PrivacyPolicyScreen}
          options={{ headerTitle: 'Privacy Policy' }}
        />
        <Stack.Screen
          name="TermsAndConditionsScreen"
          component={TermsAndConditionsScreen}
          options={{ headerTitle: 'Terms and Conditions' }}
        />
        {/* Add the Chatbot Screen here */}
        <Stack.Screen
          name="ChatbotScreen"
          component={ChatbotScreen}
          options={{ headerTitle: 'Chat with Us' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
