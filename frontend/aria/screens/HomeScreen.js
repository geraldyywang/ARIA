import React, { useState, useRef, useEffect, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Text, Keyboard, Button, ScrollView } from 'react-native';
import { Video, Audio } from 'expo-av';
import LanguageSelector from '../components/LanguageSelector';
import { transcribeAudio } from '../openai/Transcribe';
import { FileSystem } from 'expo';
import {PrevQnAContext} from '../App';

const HomeScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoSize, setVideoSize] = useState(new Animated.Value(160));
  const videoRef = useRef(null);
  const [questionText, setQuestionText] = useState("Hi! I'm Aria. Tap on me to ask a question, and it will be shown here. Pick any language to speak in.");
  const [answerText, setAnswerText] = useState('My answer to your question will be here.');
  const [answerAudioFile, setAnswerAudioFile] = useState(null);

  const [recording, setRecording] = React.useState();
  const [recordings, setRecordings] = React.useState([]); // state to manage recordings

  // State for selected language
  const [selectedLanguage, setSelectedLanguage] = useState({ id: 1, name: 'English', flag: '🇺🇸', code: 'en'});

  // const {prevQnA, setPrevQnA} = useContext(PrevQnAContext);

  // Function to handle language change
  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
  };

  const processVoiceResponse = async (questionText, language) => {
    let languageCode = language.code;

    axios.post('/login', {
      language: languageCode,
      transcribedText: questionText
    }).then((response) => {
      setAnswerText(response[0]);
      setAnswerAudioFile(response[1]);

      setPrevQnA(prevQnA.concat({
        question: questionText,
        answer: response[0],
      }))

      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
      }
    } catch (err) {}
  }

  async function stopRecording() {
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const recordingURI = recording.getURI(); // Get the URI of the recorded audio
    console.log('Recording stopped. URI:', recordingURI);

    let allRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    allRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI()
    });

    setRecordings(allRecordings);

    // Call transcribeAudio function after recording
    try {
      const fileInfo = {
        uri: recordingURI,
        type: 'audio/mp4',
        name: 'recording.m4a',
      };
      const transcription = await transcribeAudio(fileInfo, 'whisper-1', 'en');
      setQuestionText(transcription); // Update the question text with transcription
    } catch (error) {
      console.error('Error transcribing audio:', error);
    }
  }

  function getDurationFormatted(milliseconds) {
    const minutes = milliseconds / 1000 / 60;
    const seconds = Math.round((minutes - Math.floor(minutes)) * 60);
    return seconds < 10 ? `${Math.floor(minutes)}:0${seconds}` : `${Math.floor(minutes)}:${seconds}`
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>
            Question #{index + 1} | {recordingLine.duration}
          </Text>
          <Button onPress={() => recordingLine.sound.replayAsync()} title="Play"></Button>
        </View>
      );
    });
  }

  function clearRecordings() {
    setRecordings([])
  }

  // Function to handle pressing the video button
  const togglePlay = () => {
    setIsPlaying(prevState => !prevState);
    if (!isPlaying) {
      startRecording(); // Start recording
    } else {
      stopRecording(); // Stop recording
    }
  };

  // Effect to handle animation
  useEffect(() => {
    const toggleSize = () => {
      Animated.sequence([
        Animated.timing(videoSize, {
          toValue: 160,
          duration: 600, // Adjust the duration as needed
          useNativeDriver: false,
        }),
        Animated.timing(videoSize, {
          toValue: 130,
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
      videoSize.setValue(130);
    }

    
  }, [isPlaying]);

  // Function to handle submitting text
  const handleTextSubmit = () => {
    Keyboard.dismiss();
    // Here you can handle the submission of the question text, for example, sending it to a server
    console.log('Question submitted:', questionText);
  };

  

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={togglePlay} activeOpacity={0.8}>
        <Animated.View style={[styles.video, { width: videoSize, height: videoSize }]}>
          <Video
            ref={videoRef}
            rate={isPlaying ? 1.5 : 0.5} // Adjust the rate based on isPlaying state
            source={require('../assets/aria.mp4')} // Provide the correct path to your local video file
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
            shouldPlay={true}
            isLooping
          />
        </Animated.View>
      </TouchableOpacity>
      <View style={styles.languageSelector}>
        <LanguageSelector selectedLanguage={selectedLanguage} onSelectLanguage={handleLanguageChange} />
      </View>
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>QUESTION</Text>
        <ScrollView style={styles.questionRoundBorder}>
          <Text
            style={[styles.questionField, { height: 'auto' }]} // Set height to 'auto' for dynamic height
            numberOfLines={5} // Adjust based on your preference
            multiline={true}
            textAlignVertical="top" // Adjusts text alignment to top
          >
            {questionText}
            {/* What language can I use to complete my Basis of Claim Form? What language can I use to complete my? */}
          </Text>
        </ScrollView>
      </View>

      <View style={styles.answerContainer}>
        <View >
            <Text style={styles.questionText}>ANSWER</Text>
        </View>
        <ScrollView style={styles.answerRoundBorder}>
            <Text
            style={styles.answerField} // Set height to 'auto' for dynamic height
            multiline={true}
            textAlignVertical="top" // Adjusts text alignment to top
          >
            {answerText}
            {/* If you made your claim at a port of entry, you have 15 days after your claim is sent to the Refugee Protection Division to submit your Basis of Claim Form. If you made your claim at an inland office, provide it on the day of your eligibility interview. Test this is just more text that I am adding, does it work i guess it does a             */}
            </Text>
        </ScrollView>
      </View>

      <View style={styles.recordingContainer}>
        {getRecordingLines()}
        <Button title={recordings.length > 0 ? 'Clear Questions' : ''} onPress={clearRecordings} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  recordingContainer: {
    position: 'absolute',
    top: 490, // Adjust as needed
    width: '90%',
    maxWidth: 400,
    backgroundColor: 'transparent',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1, // Ensure it's above other elements
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 40
  },
  fill: {
    flex: 1,
    margin: 15
  },
  video: {
    borderRadius: 500,
    overflow: 'hidden',
    top: 0,
    borderWidth: 5,
    borderColor: "rgb(56, 201, 172)",
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
    bottom: 35,
    alignItems: 'center',
    position: 'absolute',
  },
  questionText: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#06c49e',
  },
  questionField: {
    width: '100%',
    fontSize: 20,
    lineHeight: 28,
    paddingHorizontal: 20,
    paddingVertical: 20,
    color: 'black', // Text color
    textAlign: 'center', // Center the text horizontally
    textAlignVertical: 'top',
  },
  answerField: {
    width: '100%',
    fontSize: 18,
    lineHeight: 22,
    paddingHorizontal: 20,
    paddingVertical: 20,
    color: 'black', // Text color
    borderRadius: 5,
    textAlign: 'center', // Center the text horizontally
    textAlignVertical: 'top',
  },
  questionRoundBorder: {
    width: '90%',
    height: 125,
    backgroundColor: '#c5e0da',
    borderRadius: 10,
  },
  answerRoundBorder: {
    width: '90%',
    height: 215,
    backgroundColor: '#c5e0da',
    borderRadius: 10,
  }
});

export default HomeScreen;
