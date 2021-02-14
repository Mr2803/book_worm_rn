import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import BookCount from "../../components/BookCount";
import CustomActionButton from "../../components/CustomActionButton";
import colors from "../../assets/colors";
import { Ionicons } from "@expo/vector-icons";

export default class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      totalCount: 0,
      readingCount: 0,
      readCount: 0,
      isAddNewBookVisible: false,
      books: [],
      textInputdata: "",
    };
  }

  showAddNewBook = () => {
    this.setState({ isAddNewBookVisible: true });
  };

  hideAddNewBook = () => {
    this.setState({ isAddNewBookVisible: false });
  };

  addBook = (book) => {
    this.setState(
      (state, props) => ({
        books: [...state.books, book],
        totalCount: state.totalCount + 1,
        readingCount: state.readingCount + 1,
      }),
      () => {
        console.log(this.state.books);
      }
    );
  };

  markAsRead = (selectedBook, index) => {
    let newList = this.state.books.filter((book) => book !== selectedBook);

    this.setState((prevState) => ({
      books: newList,
      readingCount: prevState.readingCount - 1,
      readCount: prevState.readCount + 1,
    }));
  };

  renderItem = (item, index) => (
    <View style={styles.listItemContainer}>
      <View style={styles.listItemTitleContainer}>
        <Text>{item}</Text>
      </View>
      <CustomActionButton
        style={styles.markAsReadButton}
        onPress={() => this.markAsRead(item, index)}
      >
        <Text style={styles.markAsReadButtonText}>Mark as read</Text>
      </CustomActionButton>
    </View>
  );
  render() {
    return (
      <View style={styles.container}>
        <SafeAreaView />
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Book Worm</Text>
        </View>
        <View style={styles.container}>
          {this.state.isAddNewBookVisible && (
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Book Name"
                placeholderTextColor="grey"
                onChangeText={(text) => this.setState({ textInputdata: text })}
              />
              <CustomActionButton
                style={styles.checkmarkButton}
                onPress={() => this.addBook(this.state.textInputdata)}
              >
                <Ionicons name="ios-checkmark" size={40} color="white" />
              </CustomActionButton>
              <CustomActionButton onPress={this.hideAddNewBook}>
                <Ionicons name="ios-close" size={40} color="white" />
              </CustomActionButton>
            </View>
          )}

          <FlatList
            data={this.state.books}
            renderItem={({ item }, index) => this.renderItem(item, index)}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View style={styles.listEmptyComponent}>
                <Text style={styles.listEmptyComponentText}>
                  Not Reading any books
                </Text>
              </View>
            }
          />
          <CustomActionButton
            position="right"
            style={styles.addNewBookButton}
            onPress={this.showAddNewBook}
          >
            <Text style={styles.addNewBookButtonText}>+</Text>
          </CustomActionButton>
        </View>

        <View style={styles.footer}>
          <BookCount count={this.state.totalCount} title="Total" />
          <BookCount count={this.state.readingCount} title="Reading" />
          <BookCount count={this.state.readCount} title="Read" />
        </View>
        <SafeAreaView />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.bgTextInput,
    paddingLeft: 5,
  },
  checkmarkButton: {
    backgroundColor: colors.bgSuccess,
  },
  listItemContainer: {
    height: 50,
    flexDirection: "row",
  },
  listItemTitleContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
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
