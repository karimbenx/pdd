import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const Floodmapscreen = () => {
  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={['*']}
        source={{uri: 'http://10.0.2.2:4541'}} // Localhost URL where your Flask server is running
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Floodmapscreen;

