// SavedScreen.js
import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { HistoryContext } from "../App";
import { HistoryCard } from "../components/HistoryCard";

const SavedScreen = () => {
  const { history, setHistory } = useContext(HistoryContext);

  return (
    <View style={styles.container}>
      <FlatList
        data={history}
        renderItem={({ item }) => (
          <View
            style={{
              padding: 10,
              margin: 5,
              backgroundColor: "white",
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontSize: 20, paddingBottom: 5, fontWeight: "bold" }}
            >
              {item.question}
            </Text>
            <Text>{item.answer}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingTop: 20 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SavedScreen;
