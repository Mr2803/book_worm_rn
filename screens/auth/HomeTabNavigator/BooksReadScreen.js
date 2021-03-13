import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import colors from "../../../assets/colors";
import { useSelector } from "react-redux";
import ListItem from "../../../components/ListItem";
import ListEmptyComponent from "../../../components/ListEmptyComponent";

export default function BooksReadScreen() {
  const { isLoadingBooks, booksRead } = useSelector((state) => state.books);
  return (
    <View style={styles.container}>
      {isLoadingBooks && (
        <View
          style={{
            ...StyleSheet.absoluteFill,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            elevation: 1000,
          }}
        >
          <ActivityIndicator size="large" color={colors.logoColor} />
        </View>
      )}
      <FlatList
        data={booksRead}
        renderItem={({ item }, index) => <ListItem item={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          !isLoadingBooks && <ListEmptyComponent text="No Books Read" />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  listEmptyComponent: {
    marginTop: 50,
    alignItems: "center",
  },
  listEmptyComponentText: {
    fontWeight: "bold",
  },
});
