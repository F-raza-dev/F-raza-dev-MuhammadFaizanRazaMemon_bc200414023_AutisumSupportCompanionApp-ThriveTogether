// VideoCard.js
import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const VideoCard = ({ videoId }) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.card}>
      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#ff0000" />
        </View>
      )}
      <WebView
        source={{ uri: `https://www.youtube.com/embed/${videoId}` }}
        style={styles.video}
        onLoad={() => setLoading(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 5,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // semi-transparent white
  },
  video: {
    height: 200,
    width: '100%',
  },
});

export default VideoCard;
