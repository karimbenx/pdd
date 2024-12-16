import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Dosanddontsscreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Do's and Don'ts</Text>
      <Text style={styles.content}>
        Do's:{"\n"}
        - Move to higher ground immediately during floods.{"\n"}
        - Stay tuned to local weather updates.{"\n"}
        - Follow evacuation instructions.{"\n\n"}
        Don'ts:{"\n"}
        - Don't touch electrical equipment if you are wet.{"\n"}
        - Don't walk through moving water.{"\n"}
        - Don't ignore flood warnings or alerts.
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

export default Dosanddontsscreen;
