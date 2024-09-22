import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigation = useNavigation();

  const handleLogin = async () => {
    // Validation: Check if email or password is empty
    if (!email.trim() || !password.trim()) {
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Login Failed',
        text2: 'Please enter both email and password.',
      });
      return;
    }

    try {
      // Sign in with email and password
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      
      // Get user information
      const { user } = userCredential;

      // Store user ID and auth token in AsyncStorage
      await AsyncStorage.setItem('user_id', user.uid);
      await AsyncStorage.setItem('auth_token', await user.getIdToken());

      // Show success toast
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Login Successful',
        text2: 'You have successfully logged in!',
      });

      // Navigate to Home screen
      navigation.navigate('HomeTabs', {
        screen: 'Home',
      });

    } catch (error) {
      // Show error toast
      Toast.show({
        type: 'error',
        position: 'bottom',
        text1: 'Login Failed',
        text2: error.message,
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Image Section */}
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/mama.png")}
            style={styles.image}
          />
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>Login</Text>

          <View style={styles.inputContainer}>
            <Icon name="envelope" size={20} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="black"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <Icon name="lock" size={20} color="#333" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="black"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2f1',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  imageContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009688',
    borderBottomLeftRadius: 90,
    overflow: 'hidden',
  },
  image: {
    width: 250,
    height: 300,
  },
  contentContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    marginBottom: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#80cbc4',
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "black",
  },
  button: {
    backgroundColor: '#009688',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupText: {
    color: '#333',
    fontSize: 16,
  },
});

export default Login;
