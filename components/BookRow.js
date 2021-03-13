import React from "react";
import { View, Text, Stylesheet } from "react-native";
import Swipeout from "react-native-swipeout";
import { Ionicons } from "@expo/vector-icons";
import colors from "../assets/colors";
import * as ImageHelpers from "../helpers/imageHelpers";
import ListItem from "./ListItem";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleIsLoadingBooks,
  deleteBook,
  markBookAsRead,
  markBookAsUnread,
  updateBookImage,
} from "../redux/action";
import * as firebase from "firebase/app";
import "firebase/database";
import "firebase/storage";
import { useActionSheet } from "@expo/react-native-action-sheet";

const BookRow = ({ item, index }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.currentUser);
  const { showActionSheetWithOptions } = useActionSheet();
  const markAsRead = async (selectedBook, index) => {
    try {
      dispatch(toggleIsLoadingBooks(true));
      await firebase
        .database()
        .ref("books")
        .child(currentUser.uid)
        .child(selectedBook.key)
        .update({ read: true });

      dispatch(markBookAsRead(selectedBook));
      dispatch(toggleIsLoadingBooks(false));
    } catch (error) {
      console.log(error);
      dispatch(toggleIsLoadingBooks(false));
    }
  };

  const markAsUnread = async (selectedBook, index) => {
    try {
      dispatch(toggleIsLoadingBooks(true));
      await firebase
        .database()
        .ref("books")
        .child(currentUser.uid)
        .child(selectedBook.key)
        .update({ read: false });

      dispatch(markBookAsUnread(selectedBook));
      dispatch(toggleIsLoadingBooks(false));
    } catch (error) {
      console.log(error);
      dispatch(toggleIsLoadingBooks(false));
    }
  };

  const handleDeleteBook = async (selectedBook, index) => {
    try {
      dispatch(toggleIsLoadingBooks(true));
      await firebase
        .database()
        .ref("books")
        .child(currentUser.uid)
        .child(selectedBook.key)
        .remove();

      dispatch(deleteBook(selectedBook));
      dispatch(toggleIsLoadingBooks(false));
    } catch (error) {
      console.log(error);
      dispatch(toggleIsLoadingBooks(false));
    }
  };

  const uploadImage = async (image, selectedBook) => {
    const ref = firebase
      .storage()
      .ref("books")
      .child(currentUser.uid)
      .child(selectedBook.key);

    try {
      //converting to blob
      const blob = await ImageHelpers.prepareBlob(image.uri);
      const snapshot = await ref.put(blob);

      let downloadUrl = await ref.getDownloadURL();

      await firebase
        .database()
        .ref("books")
        .child(currentUser.uid)
        .child(selectedBook.key)
        .update({ image: downloadUrl });

      blob.close();

      return downloadUrl;
    } catch (error) {
      console.log(error);
    }
  };

  const openImageLibrary = async (selectedBook) => {
    console.log(selectedBook);
    const result = await ImageHelpers.openImageLibrary();

    if (result) {
      dispatch(toggleIsLoadingBooks(true));
      const downloadUrl = await uploadImage(result, selectedBook);
      dispatch(updateBookImage({ ...selectedBook, uri: downloadUrl }));
      dispatch(toggleIsLoadingBooks(false));
    }
  };
  const openCamera = async (selectedBook) => {
    const result = await ImageHelpers.openCamera();

    if (result) {
      dispatch(toggleIsLoadingBooks(true));
      const downloadUrl = await uploadImage(result, selectedBook);
      dispatch(updateBookImage({ ...selectedBook, uri: downloadUrl }));
      dispatch(toggleIsLoadingBooks(false));
    }
  };

  const addBookImage = (selectedBook) => {
    // Same interface as https://facebook.github.io/react-native/docs/actionsheetios.html
    const options = ["Seleziona da Galleria", "Camera", "Chiudi"];
    const cancelButtonIndex = 2;

    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      (buttonIndex) => {
        // Do something here depending on the button index selected
        if (buttonIndex == 0) {
          openImageLibrary(selectedBook);
        } else if (buttonIndex == 1) {
          openCamera(selectedBook);
        } else {
          console.log("close");
        }
      }
    );
  };

  let swipeoutButtons = [
    {
      text: "Delete",
      component: (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Ionicons name="ios-trash" size={24} color={colors.txtWhite} />
        </View>
      ),
      backgroundColor: colors.bgDelete,
      onPress: () => handleDeleteBook(item, index),
    },
  ];

  if (!item.read) {
    swipeoutButtons.unshift({
      text: "Mark as read",
      component: (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: colors.txtWhite }}>Mark as read</Text>
        </View>
      ),
      backgroundColor: colors.bgSuccessDark,
      onPress: () => markAsRead(item, index),
    });
  } else {
    swipeoutButtons.unshift({
      text: "Mark unread",
      component: (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: colors.txtWhite }}>Mark unread</Text>
        </View>
      ),
      backgroundColor: colors.bgUnread,
      onPress: () => markAsUnread(item, index),
    });
  }
  return (
    <Swipeout
      backgroundColor={colors.bgMain}
      right={swipeoutButtons}
      autoClose={true}
      style={{ marginHorizontal: 5, marginVertical: 5 }}
    >
      <ListItem
        editable={true}
        item={item}
        marginVertical={0}
        onPress={() => addBookImage(item)}
      >
        {item.read && (
          <Ionicons
            style={{ marginRight: 5 }}
            name="ios-checkmark"
            color={colors.logoColor}
            size={30}
          />
        )}
      </ListItem>
    </Swipeout>
  );
};

export default BookRow;
