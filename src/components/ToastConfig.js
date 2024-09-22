// ToastConfig.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';

const toastConfig = {
  error: ({ text1, text2 }) => (
    <View style={styles.errorToast}>
      <Text style={styles.toastText}>{text1}</Text>
      {text2 && <Text style={styles.toastSubText}>{text2}</Text>}
    </View>
  ),
  // You can add more custom configurations for success, info, etc.
};

const styles = StyleSheet.create({
  errorToast: {
    backgroundColor: '#1e293b', // Custom background color for error toast
    padding: 15,
    borderRadius: 5,
    
  },
  toastText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  toastSubText: {
    color: 'white',
    fontSize: 14,
  },
});

export default toastConfig;
