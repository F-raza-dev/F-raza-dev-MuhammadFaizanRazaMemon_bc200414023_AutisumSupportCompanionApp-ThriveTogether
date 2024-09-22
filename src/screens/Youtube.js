import {StyleSheet, View, Text, ScrollView} from 'react-native';
import React from 'react';
import Common from '../components/Common';
import VideoCard from '../components/VideoCard';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFontSize} from '../Hooks/FontSizeContext';

const Youtube = () => {
  const {fontSize} = useFontSize();

  const videoIds = ['jSoEVLNeHw0','f2Ady21DfpE', 'Oz4ovCgq9n4', '8Ph3S-Ciwio','Fps2bqFV5nM','JT0MmZcJ2Vw','tRJcZKYPY4o'];
  return (
    <Common>
      <ScrollView style={styles.container}>
        <View style={styles.youtube}>
          <Ionicons name="logo-youtube" size={30} color="#FF0000" />

          <Text style={[styles.title, {fontSize}]}>YouTube Videos</Text>
        </View>
        {videoIds.map((id, index) => (
          <VideoCard key={index} videoId={id} />
        ))}
                              <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>

      </ScrollView>
    </Common>
  );
};

export default Youtube;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    margin: 10,
    fontWeight: 'bold',
    color: 'black',
  },
  youtube: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    marginVertical: 20,
    marginHorizontal: 20,
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    backgroundColor: '#fafaf9',
  },
});
