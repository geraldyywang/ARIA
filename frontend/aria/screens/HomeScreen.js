import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Video } from 'expo-av';
import LanguageSelector from '../components/LanguageSelector';

const HomeScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSize, setVideoSize] = useState(new Animated.Value(100));
  const videoRef = useRef(null);

  const togglePlay = () => {
    setIsPlaying(prevState => !prevState);
  };

  useEffect(() => {
    const toggleSize = () => {
      Animated.sequence([
        Animated.timing(videoSize, {
          toValue: 125,
          duration: 600, // Adjust the duration as needed
          useNativeDriver: false,
        }),
        Animated.timing(videoSize, {
          toValue: 100,
          duration: 600, // Adjust the duration as needed
          useNativeDriver: false,
        }),
      ]).start(({ finished }) => {
        if (finished && isPlaying) {
          toggleSize();
        }
      });
    };

    if (isPlaying) {
      toggleSize();
    } else {
      videoSize.setValue(100);
    }
  }, [isPlaying]);

  const [inputLanguage, setInputLanguage] = useState({ id: 1, name: 'English', flag: '🇺🇸' });
  const [outputLanguage, setOutputLanguage] = useState({ id: 2, name: 'Spanish', flag: '🇪🇸' });

  const handleInputLanguageChange = (language) => {
    setInputLanguage(language);
  };

  const handleOutputLanguageChange = (language) => {
    setOutputLanguage(language);
  };

  return (
    <View style={styles.container}>
      <LanguageSelector selectedLanguage={inputLanguage} onSelectLanguage={handleInputLanguageChange} />
      <TouchableOpacity onPress={togglePlay} activeOpacity={0.8}>
        <Animated.View style={[styles.video, { width: videoSize, height: videoSize }]}>
          <Video
            ref={videoRef}
            source={require('../assets/aria.mp4')} // Provide the correct path to your local video file
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
            shouldPlay={isPlaying}
            isLooping
          />
        </Animated.View>
      </TouchableOpacity>
      <LanguageSelector selectedLanguage={outputLanguage} onSelectLanguage={handleOutputLanguageChange} />
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
    borderRadius: 100,
    overflow: 'hidden',
  },
});

export default HomeScreen;
