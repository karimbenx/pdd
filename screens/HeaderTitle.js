// HeaderTitle.js
import React from 'react';
import { Text, Platform } from 'react-native';

// Define font styles
const fonts = {
  bold: 'Arial-BoldMT',   // iOS Bold Font (or use your custom font)
  medium: 'Arial',        // iOS Regular Font (or use your custom font)
  androidBold: 'Roboto-Bold',  // Android Bold Font
  androidMedium: 'Roboto',     // Android Regular Font
};

const HeaderTitle = ({ title, tintColor }) => {
  return (
    <Text
      style={{
        color: tintColor || 'black', // Default to black if no tintColor is passed
        fontFamily: Platform.select({
          ios: fonts.bold, // Use bold font on iOS
          android: fonts.androidBold, // Use bold font on Android
          default: fonts.androidMedium, // Default to regular font
        }),
      }}
    >
      {title}
    </Text>
  );
};

export default HeaderTitle;
