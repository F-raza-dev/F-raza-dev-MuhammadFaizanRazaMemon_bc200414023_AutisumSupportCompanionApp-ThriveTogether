import React, { useEffect, useState } from 'react';
import { View, TextInput, Image, StyleSheet, TouchableOpacity, ImageBackground, Text, ScrollView, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Common from '../components/Common';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../Hooks/ThemeContext';
import VideoCard from '../components/VideoCard';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import storage from '@react-native-firebase/storage'; // Import Firebase Storage

const HomePage = () => {
  const {theme} = useTheme();
  const navigation = useNavigation(); // Get the navigation prop

  const videoIds = ['f2Ady21DfpE', 'NdgQCuBa74A', 'f_FAQUWpSLA'];

  const [pic, setPic] = useState(''); // Default profile picture URL
  const [name, setName] = useState('');

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

          setPic(userData.pic || '');
        }
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };





  return (
    <Common>

<LinearGradient
        colors={[theme.backgroundColor, '#cbd5e1']}
        start={{x: 0.5, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.gradientBackground}>


    <View style={styles.container}>
      {/* Search Bar and User Icon */}
      <View style={styles.header}>
        <View>

       <Text style={styles.nam}>
        hello' {name?name:null}
       </Text>
       <Text style={styles.name}>Thrive Together</Text>
        </View>

        <TouchableOpacity style={styles.userIconContainer}
        onPress={() => navigation.navigate('Profile')}
        >
         {
          pic ? 
          <Image
          source={{ uri: pic }} 
          style={styles.userIcon}
        />
        :
        <Image
        source={{ uri: 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png' }} 
        style={styles.userIcon}
      />
         }
        </TouchableOpacity>
      </View>

      <TextInput
          style={styles.searchBar}
          placeholder="Search..."
          placeholderTextColor="#000"
        />

      {/* Scrollable Content */}
      <ScrollView>
        {/* Poster Image Card */}
        <ImageBackground
          source={require("../assets/images/poster.png")} 
          style={styles.poster}
          resizeMode="cover"
        >
        </ImageBackground>

        {/* Heading */}
        <View style={styles.headingContainer}>

        <Text style={styles.heading}>Thing's We do Together</Text>
        <View style={styles.headingBorder}></View>
        </View>
<View style={{width:"100px",height:"10px",backgroundColor:theme.backgroundColor}}></View>
        {/* Cards Section */}
        <View style={styles.cardsContainer}>
          {/* Card 1 */}
          <View style={styles.card}>
            <Image
              source={require("../assets/images/todo.png")} 
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Plan Your Day</Text>
            <View style={styles.cardIcons}>
              <Icon name="headphones" size={24} color="black" />
              <Icon name="ellipsis-h" size={24} color="black" />
            </View>
          </View>

          {/* Card 2 */}
          <View style={styles.card}>
            <Image
              source={require('../assets/images/Calming.png')} 
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Calming</Text>
            <View style={styles.cardIcons}>
              <Icon name="headphones" size={24} color="black" />
              <Icon name="ellipsis-h" size={24} color="black" />
            </View>
          </View>

          {/* Card 3 */}
          <View style={styles.card}>
            <Image
              source={require("../assets/images/Learner.png")} 
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Learner</Text>
            <View style={styles.cardIcons}>
              <Icon name="headphones" size={24} color="black" />
              <Icon name="ellipsis-h" size={24} color="black" />
            </View>
          </View>

          {/* Card 4 */}
          <View style={styles.card}>
            <Image
              source={require("../assets/images/YouTube.png")} 
              style={styles.cardImage}
            />
            <Text style={styles.cardText}>Youtube</Text>
            <View style={styles.cardIcons}>
              <Icon name="headphones" size={24} color="black" />
              <Icon name="ellipsis-h" size={24} color="black" />
            </View>
          </View>
        </View>
        <View style={styles.headingContainer}>
              <Text style={styles.heading}>YouTube Videos</Text>
              <View style={styles.headingBorder}></View>
            </View>
        <FlatList
  data={videoIds}
  renderItem={({ item }) => (
    <View style={styles.videoContainer}>
      <VideoCard videoId={item} />
    </View>
  )}
  keyExtractor={(item, index) => index.toString()}
  horizontal={true}  // This enables horizontal scrolling
  showsHorizontalScrollIndicator={false}  // Hides the scroll indicator
/>


        <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
      </ScrollView>
    </View>
    </LinearGradient>
    </Common>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    
   
  },
  gradientBackground: {
    flex: 1,
  },
 
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  nam:{
  fontSize:18,
  color:"black"
  },
  name:{
  fontSize:28,
  color:"black",
  fontWeight:"bold"
  },
  searchBar: {
    // flex: 1,
    // height: "80px",
    borderRadius: 10,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    // marginRight: 10,
    borderColor: 'gray',
    borderWidth: 0.5,

    color:"black",
    marginVertical:10
  },
  userIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
  },
  userIcon: {
    width: '100%',
    height: '100%',
    objectFit:"cover"
  },
  poster: {
    width: '100%',
    height: 200,
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%', 
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    objectFit: "fill",
  },
  cardText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "black",
  },
  cardIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  videoContainer: {
    width: 320,  // Set a fixed width for each video card
    marginHorizontal: -6,  // Adds spacing between each card
  },
  headingContainer: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headingBorder: {
    height: 2,
    backgroundColor: '#fff',
    width: 100,  // Adjust width as needed
  },
});

export default HomePage;
