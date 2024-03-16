import { StatusBar } from "expo-status-bar";
import React, { createContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

// input question text, output ans text

import TabNavigator from "./TabNavigator";

// export const PrevQnAContext = createContext({
//   prevQnA: [],
//   setPrevQnA: () => {},
// });

export default function App() {
  return (
    // <PrevQnAContext.Provider value={{ prevQnA, setPrevQnA }}>
    <NavigationContainer>
      <View style={styles.container}>
        <TabNavigator />
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
    // </PrevQnAContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
