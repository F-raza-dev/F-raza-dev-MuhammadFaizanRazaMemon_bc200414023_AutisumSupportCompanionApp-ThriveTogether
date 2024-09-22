import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import Tts from 'react-native-tts';
import { useTheme } from '../Hooks/ThemeContext';

const UrduPreview = ({ card, onClose }) => {
  const { theme } = useTheme();

  // Urdu alphabet data
  const urduAlphabetData = [
    'ا', 'ب', 'پ', 'ت', 'ٹ', 'ث', 'ج', 'چ', 'ح', 'خ', 'د', 'ڈ', 'ذ', 'ر', 'ز', 'ژ', 'س', 'ش', 'ص', 'ض',
    'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ک', 'گ', 'ل', 'م', 'ن', 'ں', 'و', 'ہ', 'ھ', 'ی', 'ے'
  ];

  const handleLetterPress = letter => {
    Tts.stop();
    Tts.setDefaultLanguage('ur-PK'); // Set Urdu language
    Tts.speak(letter, {
      androidParams: {
        KEY_PARAM_PAN: -5,
        KEY_PARAM_VOLUME: 20,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  };

  const renderLetter = ({ item }) => (
    <TouchableOpacity
      style={[styles.letterContainer, { backgroundColor: '#713f12' }]}
      onPress={() => handleLetterPress(item)}>
      <Text style={styles.letter}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.gradientBackground}>
      <View style={styles.container}>
        {/* Optional: Add image and description if needed */}
        
        <TouchableOpacity onPress={onClose} style={[styles.closeButton,{backgroundColor:theme.backgroundColor}]}>
          <Text style={styles.closeButtonText}>Back to Cards</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={urduAlphabetData}
        renderItem={renderLetter}
        keyExtractor={item => item}
        numColumns={4}
        contentContainerStyle={styles.lettersContainer}
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
  closeButton: {
    display:"flex",
    justifyContent:"center",
    padding: 10,
   
    borderRadius: 5,
    marginBottom: -10,
    height:40
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  gradientBackground: {
    flex: 1,
    
  },
  lettersContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  letterContainer: {
    flex: 1,
    height: 80,
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    color:"white"
  },
  letter: {
    fontSize: 36,
    fontWeight: 'bold',
    color:"white"
  },
  flatList: {
    marginBottom: 80,
  },
});

export default UrduPreview;
