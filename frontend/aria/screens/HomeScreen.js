import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Video } from 'expo-av';

const HomeScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <Button title={isPlaying ? "Pause" : "Play"} onPress={togglePlay} />
      <Video
        source={require('../assets/aria.mp4')} // Provide the correct path to your local video file
        style={styles.video}
        resizeMode="cover"
        shouldPlay={isPlaying}
        isLooping
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 300,
    borderRadius: 150,
  },
});

export default HomeScreen;
