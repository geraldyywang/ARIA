import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Image } from 'react-native';
import reading from '../assets/myrefugeeclaim.jpg';
import { AntDesign } from '@expo/vector-icons';

const SettingsScreen = () => {
  const [selectedTopic, setSelectedTopic] = useState(null);

  const topics = [
    { 
      id: 1,
      title: 'Overview', 
      questions: [
        'Can I make a refugee claim?',
        'How does the refugee claim process work?',
        'How do I make a claim for refugee protection?',
        'What are my responsibilities?',
        'When will my claim be considered abandoned?',
        'Can I withdraw my refugee protection claim?',
        'What does it mean to be a refugee in Canada?',
        'How do I know if I qualify for refugee protection in Canada?',
        'What organizations are involved in the refugee claim process in Canada?',
        'What support services are available to refugees in Canada?',
        'When can my family come to Canada?',
      ]
    },
    { 
      id: 2,
      title: 'Counsel', 
      questions: [
        'Do I need counsel to represent me in my claim?',
        'Who can be my counsel?',
        'How do I get a lawyer?',
        'How can I find a lawyer who specializes in refugee cases?',
        'What should I do if I cannot afford a lawyer?',
        'Can I get free legal representation for my refugee claim?',
        'What qualifications should I look for in a lawyer for my refugee claim?',
      ]
    },
    { 
      id: 3,
      title: 'Documentation', 
      questions: [
        'What is a Basis of Claim Form?',
        'How long do I have to complete my Basis of Claim Form?',
        'What language can I use to complete my Basis of Claim Form?',
        'What documents do I need to submit with my Basis of Claim Form?',
        'What should I do if I cannot provide certain documents for my Basis of Claim Form?',
        'What if I\'m unable to understand or fill out the Basis of Claim Form on my own?',
        'What are important documents I can read to understand the claim process?',
      ]
    },
    { 
      id: 4,
      title: 'Hearing', 
      questions: [
        'How do I prepare for my refugee claim hearing?',
        'How will I know when my hearing will be held?',
        'What will happen at my refugee claim hearing?',
        'Who will be at my refugee claim hearing?',
        'What types of questions can I expect during my refugee protection hearing?',
        'What happens if I or my counsel cannot attend the scheduled hearing date?',
        'What should I do if I need an interpreter during my hearing?',
        'What happens if the Minister intervenes in my refugee protection claim?',
      ]
    },
    { 
      id: 5,
      title: 'Decisions', 
      questions: [
        'How and when will I know if my refugee claim is accepted?',
        'What will happen next if my refugee claim is accepted?',
        'What will happen next if my refugee claim is rejected?',
        'What happens after my refugee protection hearing?',
        'How can I appeal a decision made by the Refugee Protection Division?',
        'How long does it typically take to receive a decision on my refugee claim?',
        'What should I do if there\'s a delay in receiving a decision on my refugee claim?',
        'What if I am detained?',
      ]
    },
  ];
  

  const handleTopicPress = (topic) => {
    setSelectedTopic(topic.id);
  };

  const handleBackPress = () => {
    setSelectedTopic(null);
  };

  const openWebsite = () => {
    Linking.openURL('https://myrefugeeclaim.ca/en/');
  };

  return (
    <View style={styles.container}>
      
      {!selectedTopic ? (
        <ScrollView style={styles.topicsContainer}>
          <Text style={styles.topicsTitle}>Refugee Claim Topics</Text>

          <View style={styles.separator} />
          {topics.map((topic) => (
            <React.Fragment key={topic.id}>
            <TouchableOpacity onPress={() => handleTopicPress(topic)}>
              <Text style={styles.topic}>{topic.title}</Text>
            </TouchableOpacity>
            <View style={styles.separator} />
            
          </React.Fragment>
          ))}
          <Text style={styles.topicsTitle}>Further Reading</Text>
          <TouchableOpacity onPress={openWebsite}>
              <Image
                source={reading}
                style={styles.image}
              />
            </TouchableOpacity>
        </ScrollView>
      ) : (
        <View>
          <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
              <View style={styles.backButton}>
                <AntDesign name="leftcircle" size={20} color="#408575"/>
                <Text style={styles.backText}>Back to Topics</Text>
              </View>
            </TouchableOpacity>
          <ScrollView style={styles.questionContainer}>
            <Text style={styles.topicsTitle}>Common Questions</Text>
            <View style={styles.separator} />
            {topics[selectedTopic-1].questions.map((question, index) => (
              <>
                <Text key={index} style={styles.question}>{question}</Text>
              <View style={styles.separator} />
              </>
            ))}
            
          </ScrollView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  topicsContainer: {
    backgroundColor: '#8fb3ab',
    paddingVertical: 20,
    paddingHorizontal: 20,
    flex: 1,
    borderRadius: 10,
  },
  topic: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 14,
    textAlign: 'center',
    color: 'white',
  },
  topicsTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingVertical: 10,
    textAlign: 'center',
    color: "#408575",
  },
  backButton: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: "#408575",
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 5,
  },
  question: {
    fontSize: 18,
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  questionContainer: {
    backgroundColor: '#8fb3ab',
    borderRadius: 10,
    paddingTop: 12,
    marginBottom: 31,
  },
  separator: {
    height: 1,
    backgroundColor: 'white',
    marginVertical: 10, // Adjust the vertical margin as needed
  },
  image: {
    width: '100%',
    resizeMode: 'contain',    
  },
  furtherText: {
    color: 'white',
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingVertical: 20,
  }
});

export default SettingsScreen;