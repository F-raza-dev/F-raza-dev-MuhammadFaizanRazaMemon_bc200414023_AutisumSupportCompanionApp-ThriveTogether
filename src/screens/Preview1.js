import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import Tts from 'react-native-tts';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '../Hooks/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';
import Common from '../components/Common';

const Preview = ({ card, onClose }) => {
  const { theme } = useTheme();

  const handleCardPress = letter => {
    Tts.stop();
    Tts.speak(letter, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 0.5,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  };

  const alphabetData = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    .split('')
    .map((letter, index) => ({
      letter,
      backgroundColor: `hsl(${index * 15}, 70%, 80%)`,
      color: `hsl(${index * 15}, 70%, 30%)`,
    }));

  const renderCard = ({ item }) => (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: item.backgroundColor }]}
      onPress={() => handleCardPress(item.letter)}>
      <Text style={[styles.letter, { color: item.color }]}>{item.letter}</Text>
    </TouchableOpacity>
  );

  return (
   <View style={styles.gradientBackground}>
        <View style={styles.container}>
          


          <TouchableOpacity onPress={onClose} style={[styles.closeButton,{backgroundColor:theme.backgroundColor}]}>
            <Text style={styles.closeButtonText}>Back to Cards</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={alphabetData}
          renderItem={renderCard}
          keyExtractor={item => item.letter}
          numColumns={3}
          contentContainerStyle={styles.cardsContainer}
          style={styles.flatList}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    display:"flex",
    justifyContent:"flex-end",
    alignItems:"flex-end"
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    display:"flex",
    justifyContent:"center",
    padding: 10,
    borderRadius: 5,
    marginBottom: -20,
    height:40
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  gradientBackground: {
    flex: 1,
  },
  cardsContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  card: {
    flex: 1,
    height: 100,
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  letter: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  flatList: {
    marginBottom: 80,
  },
});

export default Preview;
