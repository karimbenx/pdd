import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Button } from 'react-native';

const RainfallDataScreen = () => {
  const [rainfallData, setRainfallData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRainfallData();
  }, []);

  const fetchRainfallData = async () => {
    setLoading(true);
    setError(null); // Reset any previous error
    try {
      const response = await fetch(
        `https://api.tomorrow.io/v4/timelines?location=Chennai&fields=precipitationIntensity&timesteps=1d&units=metric&apikey=YNvxgpUDZoEqZV9y5Nv8u3F5y90HRTG3`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch rainfall data');
      }

      const data = await response.json();
      setRainfallData(data.data.timelines[0].intervals); // Update with Tomorrow.io data structure
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <View>
          <Text style={styles.title}>Rainfall Data for Chennai</Text>
          {rainfallData && rainfallData.length > 0 ? (
            <View style={styles.table}>
              <View style={styles.tableRow}>
                <Text style={styles.tableHeader}>Date</Text>
                <Text style={styles.tableHeader}>Precipitation (mm)</Text>
              </View>
              {rainfallData.map((interval, index) => (
                <View key={index} style={styles.tableRow}>
                  <Text style={styles.tableCell}>{interval.startTime.split('T')[0]}</Text>
                  <Text style={styles.tableCell}>
                    {interval.values.precipitationIntensity.toFixed(2)} mm
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <Text>No rainfall data available</Text>
          )}
          <Button title="Refresh Data" onPress={fetchRainfallData} />
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  table: { marginTop: 20, borderWidth: 1, borderColor: '#ddd' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd' },
  tableHeader: { flex: 1, padding: 10, fontWeight: 'bold', backgroundColor: '#f4f4f4' },
  tableCell: { flex: 1, padding: 10, textAlign: 'center' },
  errorText: { color: 'red', textAlign: 'center', marginTop: 20 },
});

export default RainfallDataScreen;
