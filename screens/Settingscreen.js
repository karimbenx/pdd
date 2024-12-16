import React from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity, Image } from 'react-native';

const userTheme = {
  backgroundColor: "#b3d9ff",
  primaryTextColor: "#000000",
  secondaryTextColor: "#707070",
  toggleActiveColor: "#003366",
  iconColor: "#000000",
};

const SettingsScreen = ({ navigation }) => {
  const [isPushNotificationsEnabled, setPushNotificationsEnabled] = React.useState(false);

  return (
    <View style={[styles.container, { backgroundColor: userTheme.backgroundColor }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={[styles.icon, { color: userTheme.iconColor }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: userTheme.primaryTextColor }]}>Settings</Text>
      </View>

      {/* Account Settings */}
      <Text style={[styles.sectionTitle, { color: userTheme.secondaryTextColor }]}>Account Settings</Text>
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate('EditProfileScreen')} // Navigate to EditProfileScreen
      >
        <Text style={[styles.rowText, { color: userTheme.primaryTextColor }]}>Edit Profile</Text>
        <Text style={[styles.arrow, { color: userTheme.iconColor }]}>›</Text>
      </TouchableOpacity>
      <View style={styles.row}>
        <Text style={[styles.rowText, { color: userTheme.primaryTextColor }]}>Push notifications</Text>
        <Switch
          value={isPushNotificationsEnabled}
          onValueChange={setPushNotificationsEnabled}
          trackColor={{ true: userTheme.toggleActiveColor, false: "#ccc" }}
          thumbColor={isPushNotificationsEnabled ? userTheme.toggleActiveColor : "#f4f3f4"}
        />
      </View>

      {/* More Section */}
      <Text style={[styles.sectionTitle, { color: userTheme.secondaryTextColor }]}>More</Text>
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate('AboutUsScreen')}
      >
        <Text style={[styles.rowText, { color: userTheme.primaryTextColor }]}>About us</Text>
        <Text style={[styles.arrow, { color: userTheme.iconColor }]}>›</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate('TermsAndConditionsScreen')}
      >
        <Text style={[styles.rowText, { color: userTheme.primaryTextColor }]}>Terms and conditions</Text>
        <Text style={[styles.arrow, { color: userTheme.iconColor }]}>›</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.row}
        onPress={() => navigation.navigate('PrivacyPolicyScreen')}
      >
        <Text style={[styles.rowText, { color: userTheme.primaryTextColor }]}>Privacy policy</Text>
        <Text style={[styles.arrow, { color: userTheme.iconColor }]}>›</Text>
      </TouchableOpacity>

      {/* Home Button */}
      <TouchableOpacity
        style={styles.homeButton}
        onPress={() => navigation.navigate('Firstscreen')} // This will navigate to FirstScreen
      >
        <Image
          source={{ uri: "https://cdn-icons-png.flaticon.com/512/25/25694.png" }} // Replace with your home icon
          style={styles.homeIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  rowText: {
    fontSize: 16,
  },
  arrow: {
    fontSize: 18,
  },
  homeButton: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  homeIcon: {
    width: 50,
    height: 50,
  },
});

export default SettingsScreen;
