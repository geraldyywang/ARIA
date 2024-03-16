import { StatusBar } from "expo-status-bar";
import React, { createContext, useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

// input question text, output ans text

import TabNavigator from "./TabNavigator";

export const HistoryContext = createContext([]);

export default function App() {
  const [history, setHistory] = useState([]);

  return (
    <HistoryContext.Provider value={{ history, setHistory }}>
      <NavigationContainer>
        <View style={styles.container}>
          <TabNavigator />
          <StatusBar style="auto" />
        </View>
      </NavigationContainer>
    </HistoryContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
