import React from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from "react-native";
import BookCount from "../../components/BookCount";
import { Ionicons } from "@expo/vector-icons";
import CustomActionButton from "../../components/CustomActionButton";
import { snapshotToArray } from "../../helpers/firebaseHelpers";
import colors from "../../assets/colors";
import ListItem from "../../components/ListItem";
import * as Animatable from "react-native-animatable";
import * as firebase from "firebase/app";
import "firebase/database";
import { connect } from "react-redux";

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      // totalCount: 0,
      // readingCount: 0,
      // readCount: 0,
      isAddNewBookVisible: false,
      books: [],
      booksReading: [],
      booksRead: [],
      textInputData: "",
      currentUser: {},
    };
    console.log("constructor");
    this.textInputRef = null;
  }

  componentDidMount = async () => {
    const { navigation } = this.props;
    const user = navigation.getParam("user");
    const currentUserData = await firebase
      .database()
      .ref("users")
      .child(user.uid)
      .once("value");

    const books = await firebase
      .database()
      .ref("books")
      .child(user.uid)
      .once("value");

    const booksArray = snapshotToArray(books);

    this.setState({
      currentUser: currentUserData.val(),
      books: booksArray,
      booksReading: booksArray.filter((book) => !book.read),
      booksRead: booksArray.filter((book) => book.read),
    });

    this.props.loadBooks(booksArray);
    console.log(this.props.books);
  };

  componentDidUpdate() {
    console.log("update");
  }

  componentWillUnmount() {
    console.log("unmount");
  }

  showAddNewBook = () => {
    this.setState({ isAddNewBookVisible: true });
  };

  hideAddNewBook = () => {
    this.setState({ isAddNewBookVisible: false });
  };

  addBook = async (book) => {
    this.setState({ textInputData: "" });
    this.textInputRef.setNativeProps({ text: "" });

    try {
      const snapshot = await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .orderByChild("name")
        .equalTo(book)
        .once("value");

      if (snapshot.exists()) {
        alert("unable to add as book already exists");
      } else {
        const key = await firebase
          .database()
          .ref("books")
          .child(this.state.currentUser.uid)
          .push().key;

        const response = await firebase
          .database()
          .ref("books")
          .child(this.state.currentUser.uid)
          .child(key)
          .set({ name: book, read: false });

        this.setState(
          (state, props) => ({
            books: [...state.books, { name: book, read: false }],
            booksReading: [...state.booksReading, { name: book, read: false }],
            // totalCount: state.totalCount + 1,
            // readingCount: state.readingCount + 1
          }),
          () => {
            console.log(this.state.books);
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  markAsRead = async (selectedBook, index) => {
    try {
      await firebase
        .database()
        .ref("books")
        .child(this.state.currentUser.uid)
        .child(selectedBook.key)
        .update({ read: true });

      let books = this.state.books.map((book) => {
        if (book.name == selectedBook.name) {
          return { ...book, read: true };
        }
        return book;
      });

      let booksReading = this.state.booksReading.filter(
        (book) => book.name !== selectedBook.name
      );

      this.setState((prevState) => ({
        books: books,
        booksReading: booksReading,
        booksRead: [
          ...prevState.booksRead,
          { name: selectedBook.name, read: true },
        ],
        // readingCount: prevState.readingCount - 1,
        // readCount: prevState.readCount + 1
      }));
    } catch (error) {
      console.log(error);
    }
  };

  renderItem = (item, index) => (
    <ListItem item={item}>
      {item.read ? (
        <Ionicons name="ios-checkmark" color={colors.logoColor} size={30} />
      ) : (
        <CustomActionButton
          style={styles.markAsReadButton}
          onPress={() => this.markAsRead(item, index)}
        >
          <Text style={styles.markAsReadButtonText}>Mark as read</Text>
        </CustomActionButton>
      )}
    </ListItem>
  );
  render() {
    console.log("render");
    return (
      <View style={styles.container}>
        <SafeAreaView />
        {/* <View style={styles.header}>
          <Text style={styles.headerTitle}>Book Worm</Text>
        </View> */}
        <View style={styles.container}>
          <View style={styles.textInputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Book Name"
              placeholderTextColor={colors.txtPlaceholder}
              onChangeText={(text) => this.setState({ textInputData: text })}
              ref={(component) => {
                this.textInputRef = component;
              }}
            />
          </View>
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

          {this.state.textInputData.length > 0 ? (
            <CustomActionButton
              position="right"
              style={styles.addNewBookButton}
              onPress={() => this.addBook(this.state.textInputData)}
            >
              <Text style={styles.addNewBookButtonText}>+</Text>
            </CustomActionButton>
          ) : null}
        </View>

        <SafeAreaView />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadBooks: (books) =>
      dispatch({ type: "LOAD_BOOKS_FROM_SERVER", payload: books }),
    addBook: (book) => dispatch({ type: "ADD_BOOK", payload: book }),
    markBookAsRead: (book) =>
      dispatch({ type: "MARK_BOOKS_AS_READ", payload: book }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
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
