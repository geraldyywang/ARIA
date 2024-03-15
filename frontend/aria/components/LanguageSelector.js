// LanguageSelector.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icon

const LanguageSelector = ({ selectedLanguage, onSelectLanguage }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const languages = [
    { id: 1, name: 'English', flag: '🇺🇸' },
    { id: 2, name: 'Spanish', flag: '🇪🇸' },
    { id: 3, name: 'French', flag: '🇫🇷' },
    // Add more languages as needed
  ];

  const handleLanguageSelect = (language) => {
    onSelectLanguage(language);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.languageContainer}>
          <Text style={styles.languageText}>{selectedLanguage.flag}</Text>
          <Text style={styles.languageText}>{selectedLanguage.name}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Select Language</Text>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <AntDesign name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.separator} />
          <ScrollView>
            {languages.map((language) => (
              <TouchableOpacity key={language.id} onPress={() => handleLanguageSelect(language)}>
                <View style={[styles.languageOption, language.id === selectedLanguage.id && styles.selectedLanguageOption]}>
                  <Text style={styles.languageFlag}>{language.flag}</Text>
                  <Text style={styles.languageName}>{language.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center the language selector vertically
    alignItems: 'center',
  },
  languageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#eee',
  },
  languageText: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 80,
    borderTopLeftRadius: 20, // Round the top-left corner
    borderTopRightRadius: 20, // Round the top-right corner
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    textAlign: 'center', // Center the text
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  closeButton: {
    padding: 5,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  selectedLanguageOption: {
    backgroundColor: 'rgb(56, 201, 172)', // Change background color for selected language
  },
  languageFlag: {
    fontSize: 20, // Adjust size as needed
  },
  languageName: {
    fontSize: 16, // Adjust size as needed
    marginLeft: 10,
  },
});

export default LanguageSelector;
