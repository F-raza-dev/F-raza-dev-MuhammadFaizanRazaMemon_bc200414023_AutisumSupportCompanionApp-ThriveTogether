import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import Tts from 'react-native-tts';
import {useTheme} from '../Hooks/ThemeContext';

const ArrowsPreview = ({onClose}) => {
  const {theme} = useTheme();

  const arrowsData = [
    {
      direction: 'Left',
      backgroundColor: 'lightblue',
      imageUrl: require('../assets/images/Right.png'),
    },
    {
      direction: 'Right',
      backgroundColor: 'lightgreen',
      imageUrl: require('../assets/images/Left.png'),
    },
    {
      direction: 'Up',
      backgroundColor: 'lightcoral',
      imageUrl: require('../assets/images/Up.png'),
    },
    {
      direction: 'Down',
      backgroundColor: 'lightgoldenrodyellow',
      imageUrl: require('../assets/images/Down.png'),
    },
    {
      direction: 'Turn Left',
      backgroundColor: 'lightpink',
      imageUrl: require('../assets/images/TurnLeft.png'),
    },
    {
      direction: 'Turn Right',
      backgroundColor: 'lightseagreen',
      imageUrl: require('../assets/images/TurnRight.png'),
    },
    {
      direction: 'Stop',
      backgroundColor: 'lightsalmon',
      imageUrl: require('../assets/images/Stop.png'),
    },
    {
      direction: 'Go',
      backgroundColor: 'lightsteelblue',
      imageUrl: require('../assets/images/Go.png'),
    },
  ];

  const handleArrowPress = direction => {
    Tts.stop();
    Tts.speak(direction, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 1.0,
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  };

  const renderArrow = ({item}) => (
    <TouchableOpacity
      style={[styles.arrowContainer, {backgroundColor: item.backgroundColor}]}
      onPress={() => handleArrowPress(item.direction)}>
      <Image source={item.imageUrl} style={styles.arrowImage} />
      <Text style={styles.arrowText}>{item.direction}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.transparentBackground}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={onClose}
          style={[
            styles.closeButton,
            {backgroundColor: theme.backgroundColor},
          ]}>
          <Text style={styles.closeButtonText}>Back to Cards</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={arrowsData}
        renderItem={renderArrow}
        keyExtractor={item => item.direction}
        numColumns={1}
        contentContainerStyle={styles.arrowsContainer}
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
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  closeButton: {
    display: 'flex',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    marginBottom: -20,
    height: 40,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  transparentBackground: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  arrowsContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  arrowContainer: {
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    width: 300,
    height: 180,
    borderRadius: 8,
    shadowOffset: {width: 0, height: 10},
    transform: [{perspective: 1000}],
  },
  arrowImage: {
    width: 220,
    height: 145,
    resizeMode: 'contain',
  },
  arrowText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 10,
  },
  flatList: {
    marginBottom: 80,
  },
});

export default ArrowsPreview;
