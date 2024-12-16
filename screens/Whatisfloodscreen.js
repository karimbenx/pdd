import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Whatisfloodscreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>What is Floods?</Text>
      <Text style={styles.content}>
        A flood is an overflow of water that submerges land that is usually dry. Flooding may
        occur as an overflow of water from water bodies, or it may be caused by an accumulation of
        rainwater in an area.
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

export default Whatisfloodscreen;
