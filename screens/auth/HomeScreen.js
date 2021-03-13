import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import CustomActionButton from "../../components/CustomActionButton";
import { snapshotToArray } from "../../helpers/firebaseHelpers";
import colors from "../../assets/colors";
import * as Animatable from "react-native-animatable";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { connect } from "react-redux";
import { compose } from "redux";
import { connectActionSheet } from "@expo/react-native-action-sheet";
import ListEmptyComponent from "../../components/ListEmptyComponent";
import { useSelector, useDispatch } from "react-redux";
import BookRow from "../../components/BookRow";
import { loadBooks, toggleIsLoadingBooks, addBook } from "../../redux/action";

export default function HomeScreenHooks() {
  const [textInputData, setTextInputData] = useState("");
  const textInputRef = useRef();
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchBooks() {
      const books = await firebase
        .database()
        .ref("books")
        .child(user.uid)
        .once("value");

      const booksArray = snapshotToArray(books);

      dispatch(loadBooks(booksArray.reverse()));
      dispatch(toggleIsLoadingBooks(false));
    }

    fetchBooks();
  }, [dispatch, user]);

  const { isLoadingBooks, books } = useSelector((state) => state.books);

  const handleAddBook = async (book) => {
    setTextInputData("");
    textInputRef.current.setNativeProps({ text: "" });

    try {
      dispatch(toggleIsLoadingBooks(true));
      const snapshot = await firebase
        .database()
        .ref("books")
        .child(user.uid)
        .orderByChild("name")
        .equalTo(book)
        .once("value");

      if (snapshot.exists()) {
        alert("unable to add as book already exists");
      } else {
        const key = await firebase
          .database()
          .ref("books")
          .child(user.uid)
          .push().key;

        const response = await firebase
          .database()
          .ref("books")
          .child(user.uid)
          .child(key)
          .set({ name: book, read: false });
        dispatch(addBook({ name: book, read: false, key: key }));
        dispatch(toggleIsLoadingBooks(false));
      }
    } catch (error) {
      console.log(error);
      dispatch(toggleIsLoadingBooks(false));
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView />

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

        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Book Name"
            placeholderTextColor={colors.txtPlaceholder}
            onChangeText={(text) => setTextInputData(text)}
            ref={textInputRef}
          />
        </View>

        <FlatList
          data={books}
          renderItem={({ item }, index) => (
            <BookRow item={item} index={index} />
          )}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            !isLoadingBooks && (
              <ListEmptyComponent text="Not Reading Any Books." />
            )
          }
        />
        {/* <Animatable.View
            style={{ elevation: 1000 }}
            animation={
              this.state.textInputData.length > 0
                ? "slideInRight"
                : "slideOutRight"
            }
          > */}
        {textInputData.length > 0 ? (
          <CustomActionButton
            position="right"
            style={styles.addNewBookButton}
            onPress={() => handleAddBook(textInputData)}
          >
            <Text style={styles.addNewBookButtonText}>+</Text>
          </CustomActionButton>
        ) : null}
        {/* </Animatable.View> */}
      </View>
      <SafeAreaView />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  header: {
    height: 70,
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderColor,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 24,
  },
  textInputContainer: {
    height: 50,
    flexDirection: "row",
    margin: 5,
  },
  textInput: {
    flex: 1,
    backgroundColor: "transparent",
    borderColor: colors.listItemBg,
    borderBottomWidth: 5,
    fontSize: 22,
    fontWeight: "200",
    color: colors.txtWhite,
  },
  checkmarkButton: {
    backgroundColor: colors.bgSuccess,
  },
  listEmptyComponent: {
    marginTop: 50,
    alignItems: "center",
  },
  listEmptyComponentText: {
    fontWeight: "bold",
  },
  markAsReadButton: {
    width: 100,
    backgroundColor: colors.bgSuccess,
  },
  markAsReadButtonText: {
    fontWeight: "bold",
    color: "white",
  },
  addNewBookButton: {
    backgroundColor: colors.bgPrimary,
    borderRadius: 25,
  },
  addNewBookButtonText: {
    color: "white",
    fontSize: 30,
  },
  footer: {
    height: 70,
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: colors.borderColor,
  },
});
