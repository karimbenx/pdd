import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  FlatList,
  Linking,
  PermissionsAndroid,
  Platform,
} from "react-native";

const emergencyContacts = [
  { name: "Fire Department", number: "101" },
  { name: "Ambulance", number: "102" },
  { name: "Police", number: "100" },
  { name: "Disaster Management", number: "108" },
  { name: "Flood Helpline", number: "1070" },
  { name: "Emergency Medical Help", number: "104" },
];

const requestCallPermission = async () => {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CALL_PHONE,
      {
        title: "Call Permission",
        message: "This app needs access to make phone calls.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }
  return true;
};

const handlePress = async (name, number) => {
  const permissionGranted = await requestCallPermission();
  if (permissionGranted) {
    Linking.openURL(`tel:${number}`);
  } else {
    Alert.alert("Permission Denied", "You need to grant call permission to proceed.");
  }
};

const renderContact = ({ item }) => (
  <Pressable
    style={({ pressed }) => [
      styles.contactButton,
      { backgroundColor: pressed ? "#AED6F1" : "#3498DB" },
    ]}
    onPress={() => handlePress(item.name, item.number)}
  >
    <Text style={styles.contactName}>{item.name}</Text>
    <Text style={styles.contactNumber}>{item.number}</Text>
  </Pressable>
);

const Emergencyscreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Emergency Contacts</Text>
      <FlatList
        data={emergencyContacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderContact}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F7",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#1A5276",
  },
  contactButton: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  contactName: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
  },
  contactNumber: {
    fontSize: 16,
    color: "white",
    marginTop: 5,
  },
});

export default Emergencyscreen;
