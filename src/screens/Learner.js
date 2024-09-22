import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Preview1 from './Preview1';
import LinearGradient from 'react-native-linear-gradient';
import Common from '../components/Common';
import { useTheme } from '../Hooks/ThemeContext';
import UrduPreview from './UrduPreview';
import ShapesPreview from './ShapesPrivew';
import Icon from 'react-native-vector-icons/FontAwesome';
import ArrowsPreview from './ArrowsPreview';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import firestore from '@react-native-firebase/firestore'; // Import Firestore
import storage from '@react-native-firebase/storage'; // Import Firebase Storage
import { useNavigation } from '@react-navigation/native';

const cardData = [
  { id: 1, title: 'Card 1', image: 'https://m.media-amazon.com/images/S/pv-target-images/64c4da45ae322086371d7860b6dd175135059498f313cf6a13d0169a1f7ca15c.png', description: 'Description for Card 1', previewComponent: 'Preview1' },
  { id: 2, title: 'Card 2', image: 'https://i.ytimg.com/vi/hHWXI1Q_RNU/maxresdefault.jpg', description: 'Description for Card 2', previewComponent: 'Preview2' },
  { id: 3, title: 'Card 3', image: 'https://images04.nicepage.com/feature/481905/preset-shapes.jpg', description: 'Description for Card 3', previewComponent: 'Preview3' },
  { id: 4, title: 'Card 4', image: 'https://img.freepik.com/free-vector/set-three-dimensional-colored-arrows_23-2147611115.jpg?t=st=1724066554~exp=1724070154~hmac=4b43e7d6ed505d794c182f87e75e1e610cd7454370ac4f25478115a2689fbf90&w=740', description: 'Description for Card 4', previewComponent: 'Preview4' }
];

const LearnerPage = () => {
  const { theme } = useTheme();
  const [selectedCard, setSelectedCard] = useState(null);
  const navigation = useNavigation(); // Get the navigation prop

  const handleCardPress = (card) => {
    setSelectedCard(card);
  };

  const handleClosePreview = () => {
    setSelectedCard(null);
  };

  const renderPreview = (card) => {
    switch (card.previewComponent) {
      case 'Preview1':
        return <Preview1 card={card} onClose={handleClosePreview} />;
      case 'Preview2':
        return <UrduPreview card={card} onClose={handleClosePreview} />;
      case 'Preview3':
        return <ShapesPreview card={card} onClose={handleClosePreview} />;
      case 'Preview4':
        return <ArrowsPreview card={card} onClose={handleClosePreview} />;
      default:
        return null;
    }
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
        start={{ x: 0.5, y: 1 }}
        end={{ x: 0, y: 0 }}
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

        <View style={styles.container}>



  <View style={styles.headingContainer}>
          <Icon name="book" size={28} color="#64748b" style={styles.iconn} />
          <Text style={[styles.heading, {color: theme.textColor}]}>
          Learner
          </Text>
        </View>


          {!selectedCard ? (
            <ScrollView contentContainerStyle={styles.cardContainer}>
              {cardData.map((card) => (
                <TouchableOpacity
                  key={card.id}
                  style={styles.card}
                  onPress={() => handleCardPress(card)}
                >
                  <Image source={{ uri: card.image }} style={styles.cardImage} />
                  {/* <Text style={styles.cardTitle}>{card.title}</Text> */}
                </TouchableOpacity>
              ))}
                      <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>

            </ScrollView>
          ) : (
            <View style={styles.cardContainer}>
          {  renderPreview(selectedCard)}
            </View>
          )}
          
        </View>




      </LinearGradient>
    </Common>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    paddingBottom:10
  },
  gradientBackground: {
    flex: 1,
    padding:20
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
  cardContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  card: {
    width: '100%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff', // Ensure card has a background color
  },
  cardImage: {
    width: '100%',
    height: 180,
    objectFit:"fill"
  },
  cardTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LearnerPage;
