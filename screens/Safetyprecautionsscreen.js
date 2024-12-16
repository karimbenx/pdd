import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Safetyprecautionsscreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Safety Precautions</Text>
      <Text style={styles.content}>
        - Avoid walking or driving through floodwaters.{"\n"}
        - Stay informed about weather forecasts and flood alerts.{"\n"}
        - Prepare an emergency kit with essentials.{"\n"}
        - Secure important documents in waterproof containers.
      </Text>
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
});

export default Safetyprecautionsscreen;
