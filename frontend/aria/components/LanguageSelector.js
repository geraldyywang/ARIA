import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icon

const LanguageSelector = ({ selectedLanguage, onSelectLanguage }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const languages = [
    { id: 1, name: 'Afrikaans', flag: '🇿🇦' },
    { id: 2, name: 'Amharic', flag: '🇪🇹' },
    { id: 3, name: 'Arabic', flag: '🇸🇾' },
    { id: 4, name: 'Chinese', flag: '🇨🇳' },
    { id: 5, name: 'Dari', flag: '🇦🇫' },
    { id: 6, name: 'English', flag: '🇺🇸' },
    { id: 7, name: 'French', flag: '🇫🇷' },
    { id: 8, name: 'German', flag: '🇩🇪' },
    { id: 9, name: 'Italian', flag: '🇮🇹' },
    { id: 10, name: 'Japanese', flag: '🇯🇵' },
    { id: 11, name: 'Korean', flag: '🇰🇷' },
    { id: 12, name: 'Kurdish', flag: '🇮🇶' },
    { id: 13, name: 'Pashto', flag: '🇦🇫' },
    { id: 14, name: 'Somali', flag: '🇸🇴' },
    { id: 15, name: 'Spanish', flag: '🇪🇸' },
    { id: 16, name: 'Tigrinya', flag: '🇪🇷' },
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
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
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
    backgroundColor: 'rgb(56, 201, 172)',
    borderRadius: 5,
  },
  languageText: {
    fontSize: 16,
    marginLeft: 5,
    marginRight: 5,
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20, // Round the top-left corner
    borderTopRightRadius: 20, // Round the top-right corner
    marginTop: 120,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    padding: 5,
  },
  scrollViewContent: {
    paddingVertical: 20, // Add padding to the content
    paddingHorizontal: 20,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  selectedLanguageOption: {
    backgroundColor: '#aee8db', // Change background color for selected language
    borderRadius: 5,
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
