import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from 'react-native';
import Sound from 'react-native-sound';
import Common from '../components/Common';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../Hooks/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import storage from '@react-native-firebase/storage'; // Import Firebase Storage
import { useNavigation } from '@react-navigation/native';

const soundFiles = {
  'babycrying.mp3': 'babycrying.mp3',
  'birds.mp3': 'birds.mp3',
  'ball.mp3': 'ball.mp3',
  'brushing.mp3': 'brushing.mp3',
  'bubble.mp3': 'bubble.mp3',
  'longbrith.mp3': 'longbrith.mp3',
};

const cards = [
  {image: require('../assets/images/bird.png'), sound: 'birds.mp3'},
  {image: require('../assets/images/image1.png'), sound: 'babycrying.mp3'},
  {image: require('../assets/images/brith.png'), sound: 'longbrith.mp3'},
  {image: require('../assets/images/brush.png'), sound: 'brushing.mp3'},
  {image: require('../assets/images/BubbleBlow.png'), sound: 'bubble.mp3'},
  {image: require('../assets/images/bassketball.png'), sound: 'ball.mp3'},
];

const Calming = () => {
  const {theme} = useTheme();

  const [activeSound, setActiveSound] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const navigation = useNavigation(); // Get the navigation prop

  const handleCardPress = index => {
    const {sound} = cards[index];

    if (activeSound) {
      activeSound.stop(() => activeSound.release());
    }

    const soundFile = soundFiles[sound];
    if (!soundFile) {
      Alert.alert('Error', 'Sound file not found.');
      return;
    }

    const newSound = new Sound(soundFile, Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.error('Failed to load sound', error);
        Alert.alert('Error', 'Failed to load sound.');
        return;
      }
      console.log('Sound loaded successfully');

      newSound.play(success => {
        if (!success) {
          console.error('Failed to play sound');
          Alert.alert('Error', 'Sound did not play successfully.');
        } else {
          console.log('Sound played successfully');

          setTimeout(() => {
            setActiveImageIndex(null);
          }, newSound.getDuration() * 1000);
        }
      });
    });

    setActiveSound(newSound);
    setActiveImageIndex(index);
  };

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
        start={{x: 0, y: 1}}
        end={{x: 0, y: 0}}
        style={styles.gradientBackground}>
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
        <View style={styles.headingContainer}>
          <Icon name="gears" size={28} color="#64748b" style={styles.iconn} />
          <Text style={[styles.heading, {color: theme.textColor}]}>
            Calming
          </Text>
        </View>
        <ScrollView style={styles.container}>
          <View style={styles.cardsContainer}>
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleCardPress(0)}>
              <Image
                source={
                  activeImageIndex === 0
                    ? require('../assets/images/birds.png')
                    : cards[0].image
                }
                style={styles.cardImage}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => handleCardPress(1)}>
              <Image
                source={
                  activeImageIndex === 1
                    ? require('../assets/images/image.png')
                    : cards[1].image
                }
                style={styles.cardImage}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.largeCard}
              onPress={() => handleCardPress(2)}>
              <Image
                source={
                  activeImageIndex === 2
                    ? require('../assets/images/longbrith.png')
                    : cards[2].image
                }
                style={styles.cardImage}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => handleCardPress(3)}>
              <Image
                source={
                  activeImageIndex === 3
                    ? require('../assets/images/brushing.png')
                    : cards[3].image
                }
                style={styles.cardImage}
                resizeMode="cover"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.card}
              onPress={() => handleCardPress(4)}>
              <Image
                source={
                  activeImageIndex === 4
                    ? require('../assets/images/Bubbleblowing.png')
                    : cards[4].image
                }
                style={styles.cardImage}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.largeCard}
              onPress={() => handleCardPress(5)}>
              <Image
                source={
                  activeImageIndex === 5
                    ? require('../assets/images/basket.png')
                    : cards[5].image
                }
                style={styles.cardImage}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.bheader}>
            <Icon
              name="clock-o"
              size={24}
              color={theme.textColor}
              style={styles.icon}
            />
            <Text style={[styles.comingSoon, {color: theme.textColor}]}>
              Coming Soon
            </Text>
          </View>

          <Text style={styles.notice}>
            Welcome to our{' '}
            <Text style={styles.highlight}>Calming Exercise</Text> page, where
            relaxation meets simplicity. This feature allows you to unwind and
            rejuvenate with a simple click.
          </Text>
          <Text style={styles.notice}>
            <Text style={styles.highlight}>Engage with Tranquility:</Text> Click
            on any image to start a soothing voice exercise designed to ease
            your mind.
          </Text>
          <Text style={styles.notice}>
            <Text style={styles.highlight}>User-Friendly Interface:</Text>{' '}
            Navigate effortlessly through the exercises with our intuitive
            design, crafted for your comfort.
          </Text>
          <Text style={styles.notice}>
            <Text style={styles.highlight}>High-Quality Audio:</Text> Immerse
            yourself in crystal-clear sound quality that enhances your
            relaxation experience.
          </Text>
          <Text style={styles.notice}>
            <Text style={styles.highlight}>Variety of Themes:</Text> Choose from
            a diverse range of exercises, each with unique themes to match your
            mood.
          </Text>
          <Text style={styles.notice}>
            <Text style={styles.highlight}>Start Your Journey:</Text> Embrace
            tranquility today and discover the path to a peaceful mind. Click on
            an image and begin your calming journey now!
          </Text>
        </ScrollView>
      </LinearGradient>
    </Common>
  );
};

export default Calming;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    marginTop:0

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
  gradientBackground: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    padding:20
  },
  headingContainer: {
    display:"flex",
    flexDirection: 'row',
    alignItems: 'baseline',
    marginVertical: 20,
  },
  iconn: {
    marginRight: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    textShadowRadius: 3,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    height: 150,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 10, // Add shadow for Android
    shadowColor: '#000', // Add shadow color for iOS
    shadowOffset: { width: 0, height: 10 }, // Shadow position
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 10, // Shadow blur
    borderWidth: 1, // Add a border
    borderColor: '#ccc', // Border color
    transform: [{ perspective: 1000 }], // Add perspective for 3D effect
  },
  largeCard: {
    width: '100%',
    height: 290,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 10, // Add shadow for Android
    shadowColor: '#000', // Add shadow color for iOS
    shadowOffset: { width: 0, height: 10 }, // Shadow position
    shadowOpacity: 0.5, // Shadow opacity
    shadowRadius: 10, // Shadow blur
    borderWidth: 1, // Add a border
    borderColor: '#ccc', // Border color
    transform: [{ perspective: 1000 }], // Add perspective for 3D effect
  },
  cardImage: {
    width: '100%',
    height: '100%',
    objectFit: 'fill',
  },
  bheader: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  icon: {
    marginRight: 8,
  },
  comingSoon: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
  },
  notice: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 5,
    color: 'black',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#65a30d',
  },
});

