import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkUserAuthentication = async () => {
      const user = auth().currentUser; // Get current user
      if (user) {
        
        navigation.navigate('HomeTabs');
      } else {
        
        navigation.navigate('Login');
      }
    };

    // Check user authentication after a delay
    setTimeout(() => {
      checkUserAuthentication();
    }, 3000); // 3 seconds delay for splash screen
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/chh.png')} 
        style={styles.logo}
      />
      <Text style={styles.text}>Thrive Together ...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009688',
  },
  logo: {
    width: 250, 
    height: 150, 
    marginBottom: 20,
    objectFit: 'contain', // Use objectFit for image containment
  },
  text: {
    fontSize: 34,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default SplashScreen;
