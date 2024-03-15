import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Text, TextInput, Keyboard } from 'react-native';
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
    handleTextSubmit(); // Submit the text when video is pressed
  };

  const handleTextSubmit = () => {
    Keyboard.dismiss();
    // Here you can handle the submission of the question text, for example, sending it to a server
    console.log('Question submitted:', questionText);
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
        <Text style={styles.questionText}>ASK ARIA</Text>
        <View style={styles.inputFieldWrapper}>
            <TextInput
              style={styles.inputField}
              value={questionText}
              onChangeText={setQuestionText}
              placeholder="Question can be seen here"
              placeholderTextColor="grey" // Placeholder text color
              selectionColor="black" // Selection color
              multiline={true}
              textAlignVertical="top"
              onSubmitEditing={handleTextSubmit}
            />
        </View>
      </View>

      <View style={styles.answerContainer}>
        <View >

            <Text style={styles.questionText}>ANSWER</Text>

        </View>
        <View style={styles.inputFieldWrapper}>
            <TextInput
              style={styles.answerField}
              value={questionText}
              onChangeText={setQuestionText}
              placeholder="Answer can be seen here"
              placeholderTextColor="grey" // Placeholder text color
              selectionColor="white" // Selection color
              multiline={true}
              textAlignVertical="top"
              onSubmitEditing={handleTextSubmit}
            />
          {/* </LinearGradient> */}
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
    width: '100%',
    top: 100,
    alignItems: 'center',
    position: 'absolute',
  },
  answerContainer: {
    width: '100%',
    bottom: 40,
    alignItems: 'center',
    position: 'absolute',
  },
  questionText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#06c49e',
  },
  questionTextMask: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    opacity: 0,
  },
  inputFieldWrapper: {
    maxWidth: 400,
    width: '90%',
    alignItems: 'center',
  },
  inputFieldGradient: {
    width: '90%',
    borderRadius: 5,
  },
  inputField: {
    width: '100%',
    height: 85,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingTop: 12,
    color: 'black', // Text color
    backgroundColor: 'white',
    borderRadius: 5,
  },
  answerField: {
    width: '100%',
    height: 170,
    fontSize: 16,
    lineHeight: 20,
    paddingHorizontal: 12,
    paddingTop: 12,
    color: 'black', // Text color
    backgroundColor: 'white',
    borderRadius: 5,
  },
  
});

export default HomeScreen;
