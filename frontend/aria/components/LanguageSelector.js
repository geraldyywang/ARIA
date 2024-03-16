import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; // Import AntDesign icon

const LanguageSelector = ({ selectedLanguage, onSelectLanguage }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const languages = [
    { id: 1, name: 'Afrikaans', flag: '🇿🇦', code: 'af' },
    { id: 2, name: 'Amharic', flag: '🇪🇹', code: 'am' },
    { id: 3, name: 'Arabic', flag: '🇸🇾', code: 'ar' },
    { id: 4, name: 'Bengali', flag: '🇧🇩', code: 'bn' },
    { id: 5, name: 'Chinese', flag: '🇨🇳', code: 'zh' },
    { id: 6, name: 'Dutch', flag: '🇳🇱', code: 'nl' },
    { id: 7, name: 'English', flag: '🇺🇸', code: 'en' },
    { id: 8, name: 'French', flag: '🇫🇷', code: 'fr' },
    { id: 9, name: 'German', flag: '🇩🇪', code: 'de' },
    { id: 10, name: 'Gujarati', flag: '🇮🇳', code: 'gu' },
    { id: 11, name: 'Hausa', flag: '🇳🇬', code: 'ha' },
    { id: 12, name: 'Hindi', flag: '🇮🇳', code: 'hi' },
    { id: 13, name: 'Indonesian', flag: '🇮🇩', code: 'id' },
    { id: 14, name: 'Italian', flag: '🇮🇹', code: 'it' },
    { id: 15, name: 'Japanese', flag: '🇯🇵', code: 'ja' },
    { id: 16, name: 'Kannada', flag: '🇮🇳', code: 'kn' },
    { id: 17, name: 'Korean', flag: '🇰🇷', code: 'ko' },
    { id: 18, name: 'Malay', flag: '🇲🇾', code: 'ms' },
    { id: 19, name: 'Marathi', flag: '🇮🇳', code: 'mr' },
    { id: 20, name: 'Pashto', flag: '🇦🇫', code: 'ps' },
    { id: 21, name: 'Persian', flag: '🇮🇷', code: 'fa' },
    { id: 22, name: 'Portuguese', flag: '🇵🇹', code: 'pt' },
    { id: 23, name: 'Punjabi', flag: '🇮🇳', code: 'pa' },
    { id: 24, name: 'Russian', flag: '🇷🇺', code: 'ru' },
    { id: 25, name: 'Somali', flag: '🇸🇴', code: 'so' },
    { id: 26, name: 'Spanish', flag: '🇪🇸', code: 'es' },
    { id: 27, name: 'Swahili', flag: '🇹🇿', code: 'sw' },
    { id: 28, name: 'Tagalog', flag: '🇵🇭', code: 'tl' },
    { id: 29, name: 'Tamil', flag: '🇮🇳', code: 'ta' },
    { id: 30, name: 'Telugu', flag: '🇮🇳', code: 'te' },
    { id: 31, name: 'Thai', flag: '🇹🇭', code: 'th' },
    { id: 32, name: 'Turkish', flag: '🇹🇷', code: 'tr' },
    { id: 33, name: 'Ukrainian', flag: '🇺🇦', code: 'uk' },
    { id: 34, name: 'Urdu', flag: '🇵🇰', code: 'ur' },
    { id: 35, name: 'Vietnamese', flag: '🇻🇳', code: 'vi' },
    { id: 36, name: 'Yoruba', flag: '🇳🇬', code: 'yo' }
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
