// SavedScreen.js
import React, {useContext} from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native';

const SavedScreen = () => {
  // const {prevQnA, setPrevQnA} = useContext(PrevQnAContext);

  return (
    <View style={styles.container}>
      <Text>Saved Screen</Text>

      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SavedScreen;
