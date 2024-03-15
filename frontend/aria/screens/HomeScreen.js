import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Text, TextInput } from 'react-native';
import { Video } from 'expo-av';
import LanguageSelector from '../components/LanguageSelector';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient
import MaskedView from '@react-native-masked-view/masked-view';

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

  const [selectedLanguage, setSelectedLanguage] = useState({ id: 1, name: 'English', flag: '🇺🇸' });
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const [questionText, setQuestionText] = useState('');

  return (
    <View style={styles.container}>
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
      <View style={styles.languageSelector}>
        <LanguageSelector selectedLanguage={selectedLanguage} onSelectLanguage={handleLanguageChange} />
      </View>
      <View style={styles.questionContainer}>
        <MaskedView maskElement={<Text style={styles.questionText}>ASK ARIA</Text>}>
          <LinearGradient // Add LinearGradient here
              colors={['#38c9ac', '#6a40e6']} // Gradient colors
              start={[0, 0]} // Gradient start point
              end={[1, 1]} // Gradient end point
              style={styles.gradient} // Style for the gradient
            >
            <Text style={styles.questionTextMask}>ASK ARIA</Text>
          </LinearGradient>
        </MaskedView>
        <View style={styles.inputFieldWrapper}>
          <LinearGradient
            colors={['#38c9ac', '#6a40e6']} // Gradient colors
            start={[0, 0]} // Gradient start point
            end={[1, 1]} // Gradient end point
            style={styles.inputFieldGradient} // Style for the gradient
          >
            <TextInput
              style={styles.inputField}
              value={questionText}
              onChangeText={setQuestionText}
              placeholder="Question can be seen here"
              placeholderTextColor="white" // Placeholder text color
              selectionColor="white" // Selection color
            />
          </LinearGradient>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c5e0da'
  },
  video: {
    borderRadius: 100,
    overflow: 'hidden',
    top: 30,
  },
  languageSelector: {
    position: 'absolute',
    top: 60, // Adjust as needed
  },
  questionContainer: {
    marginTop: 20, // Adjust as needed
    width: '90%',
    top: 100,
    alignItems: 'center',
    position: 'absolute',
  },
  questionText: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  questionTextMask: {
    fontSize: 60,
    fontWeight: 'bold',
    marginBottom: 10,
    opacity: 0,
  },
  inputFieldWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  inputFieldGradient: {
    width: '90%',
    borderRadius: 5,
  },
  inputField: {
    width: '100%',
    height: 40,
    paddingHorizontal: 10,
    color: 'white', // Text color
  },
});

export default HomeScreen;
