import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ title }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardText}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 100, // Example width
    height: 100, // Example height
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 5,
  },
  cardText: {
    fontSize: 14,
  },
});

export default Card;
