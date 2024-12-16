import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TermsAndConditionsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Terms and Conditions</Text>
      <Text style={styles.content}>
        This section should outline the terms and conditions for using your app. Include details about user responsibilities and legal disclaimers.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default TermsAndConditionsScreen;
