import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Image, Alert, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons'; // Import Ionicons
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import auth from '@react-native-firebase/auth'; // Import Firebase Auth
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import storage from '@react-native-firebase/storage'; // Import Firebase Storage

const Profile = () => {
  const [pic, setPic] = useState(''); // Default profile picture URL
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [diagnose, setDiagnose] = useState('');
  const [allergies, setAllergies] = useState('');
  const [contact, setContact] = useState('');
  const [address, setAddress] = useState('');
  const [learningCenter, setLearningCenter] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation(); // Get the navigation prop

  useEffect(() => {
    
    

    fetchUserData();
  }, []);


  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('user_id');
      if (userId) {
        const userDoc = await firestore().collection('users').doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setName(userData.name || '');
          setAge(userData.age || '');
          setDiagnose(userData.diagnose || '');
          setAllergies(userData.allergies || '');
          setContact(userData.contact || '');
          setAddress(userData.address || '');
          setLearningCenter(userData.learningCenter || '');
          setPic(userData.pic || '');
        }
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };


  const handleImagePick = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };
    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const { uri } = response.assets[0];
        setPic(uri); // Update the state with the image URI
  
        try {
          const userId = await AsyncStorage.getItem('user_id');
          if (userId) {
            // Upload image to Firebase Storage
            const filename = uri.substring(uri.lastIndexOf('/') + 1);
            const reference = storage().ref(`profile_pictures/${userId}/${filename}`);
            await reference.putFile(uri);
            const downloadURL = await reference.getDownloadURL();
            setPic(downloadURL); // Update the state with the download URL
          }
        } catch (error) {
          console.error('Error uploading image: ', error);
        }
      }
    });
  };
  

  const handleSubmit = async () => {
    if (!name || !age || !diagnose || !allergies || !contact || !address || !learningCenter) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }
  
    setLoading(true);
    try {
      const userId = await AsyncStorage.getItem('user_id');
      if (userId) {
        await firestore().collection('users').doc(userId).set({
          name,
          age,
          diagnose,
          allergies,
          contact,
          address,
          learningCenter,
          pic,
        });
        Alert.alert('Profile Data Saved', 'Your profile data has been saved successfully.');
  
        // Fetch and display updated user data
        await fetchUserData();
      }
    } catch (error) {
      console.error('Error saving profile data: ', error);
    } finally {
      setLoading(false);
    }
  };
  
  

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('user_id');
      await AsyncStorage.removeItem('auth_token');
      await auth().signOut(); // Sign out from Firebase
      navigation.navigate('Login'); // Navigate to the login screen
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color="#009688"  />
        </TouchableOpacity>
        <Text style={styles.heading}>Profile</Text>
      </View>

      {/* Profile Picture */}
      <View style={styles.picContainer}>
        <Image
          source={{ uri: pic || 'https://via.placeholder.com/150' }} 
          style={styles.pic}
        />
        <TouchableOpacity style={styles.changePicButton} onPress={handleImagePick}>
          <Text style={styles.changePicText}>Change Picture</Text>
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Name"
        placeholderTextColor="#000"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Age"
        keyboardType="numeric"
        placeholderTextColor="#000"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        style={styles.input}
        placeholder="Diagnose"
        placeholderTextColor="#000"
        value={diagnose}
        onChangeText={setDiagnose}
      />
      <TextInput
        style={styles.input}
        placeholder="Allergies"
        placeholderTextColor="#000"
        value={allergies}
        onChangeText={setAllergies}
      />
      <TextInput
        style={styles.input}
        placeholder="Contact"
        keyboardType="phone-pad"
        placeholderTextColor="#000"
        value={contact}
        onChangeText={setContact}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        placeholderTextColor="#000"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Learning Center"
        placeholderTextColor="#000"
        value={learningCenter}
        onChangeText={setLearningCenter}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit} disabled={loading}>
        <Text style={styles.submitButtonText}>{loading ? 'Saving...' : 'Save Profile'}</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Icon name="log-out" size={24} color="#fff" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#e0f2f1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    marginRight: -30,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  picContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  pic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  changePicButton: {
    backgroundColor: '#009688',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  changePicText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25, // Rounded corners
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: '#80cbc4',
    fontSize: 16,
    color: '#000', // Text color
  },
  submitButton: {
    backgroundColor: '#009688',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default Profile;
