import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import Tts from 'react-native-tts';
import { useTheme } from '../Hooks/ThemeContext';

const ShapesPreview = ({ onClose }) => {
    const { theme } = useTheme();
require("../assets/images/curcle.png")
  // Shapes data with corresponding background colors and image URLs
  const shapesData = [
    { shape: 'Circle', backgroundColor: 'lightblue', imageUrl: require('../assets/images/curcle.png') },
    { shape: 'Square', backgroundColor: 'lightgreen', imageUrl: require('../assets/images/Square.png') },
    { shape: 'Triangle', backgroundColor: 'lightcoral', imageUrl: require('../assets/images/Triangle.png') },
    { shape: 'Rectangle', backgroundColor: 'lightgoldenrodyellow', imageUrl: require('../assets/images/Rectangle.png') },
    { shape: 'Hexagon', backgroundColor: 'lightpink', imageUrl: require('../assets/images/Hexagon.png') },
    { shape: 'Pentagon', backgroundColor: 'lightseagreen', imageUrl: require('../assets/images/Pentagon.png') },
    { shape: 'Oval', backgroundColor: 'lightsalmon', imageUrl: require('../assets/images/Oval.png') },
    { shape: 'Star', backgroundColor: 'lightsteelblue', imageUrl:require('../assets/images/Star.png') },
    { shape: 'Diamond', backgroundColor: 'lightyellow', imageUrl: require('../assets/images/Diamond.png') },
    // Add more shapes as needed
  ];

  const handleShapePress = shape => {
    Tts.stop();
    Tts.speak(shape, {
      androidParams: {
        KEY_PARAM_PAN: -1,
        KEY_PARAM_VOLUME: 1.0, // Increase volume
        KEY_PARAM_STREAM: 'STREAM_MUSIC',
      },
    });
  };

  const renderShape = ({ item }) => (
    <TouchableOpacity
      style={[styles.shapeContainer, { backgroundColor: item.backgroundColor }]}
      onPress={() => handleShapePress(item.shape)}>
      <Image source={item.imageUrl} style={styles.shapeImage} />
      <Text style={styles.shapeText}>{item.shape}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.transparentBackground}>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={[styles.closeButton,{backgroundColor:theme.backgroundColor}]}>
          <Text style={styles.closeButtonText}>Back to Cards</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={shapesData}
        renderItem={renderShape}
        keyExtractor={item => item.shape}
        numColumns={1} // Only one shape per row
        contentContainerStyle={styles.shapesContainer}
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
    marginBottom: -20,
    height:40
  },
  closeButtonText: {
    color: 'white',
    fontSize: 18,
  },
  transparentBackground: {
    flex: 1,
    backgroundColor: 'transparent', // Transparent background
  },
  shapesContainer: {
    flexGrow: 1,
    justifyContent: 'center', // Center the content
    alignItems: 'center', // Center the content horizontally
    padding: 20,
  },
  shapeContainer: {
    margin: 10, // Add spacing between shapes
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    width: 300,
    height: 180,
    borderRadius: 8,
    shadowOffset: { width: 0, height: 10 },
    transform: [{ perspective: 1000 }],
  },
  shapeImage: {
    width: 220,
    height: 145,
    resizeMode: 'contain',
  },
  shapeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginVertical:10

  },
  flatList: {
    marginBottom: 80,
  },
});

export default ShapesPreview;
