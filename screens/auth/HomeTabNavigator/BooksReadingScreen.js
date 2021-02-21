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
import { connect } from "react-redux";
import ListItem from "../../../components/ListItem";
import ListEmptyComponent from "../../../components/ListEmptyComponent";

class BooksReadingScreen extends Component {
  renderItem = (item) => {
    return <ListItem item={item} />;
  };

  render() {
    return (
      <View style={styles.container}>
        {this.props.books.isLoadingBooks && (
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
          data={this.props.books.booksReading}
          renderItem={({ item }, index) => this.renderItem(item, index)}
          keyExtractor={(item, index) => index.toString()}
          ListEmptyComponent={
            !this.props.books.isLoadingBooks && (
              <ListEmptyComponent text="Not Reading Any Books" />
            )
          }
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

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

export default connect(mapStateToProps)(BooksReadingScreen);
