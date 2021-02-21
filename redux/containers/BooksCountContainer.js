import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { connect } from "react-redux";
import colors from "../../assets/colors";
import PropTypes from "prop-types";
const BooksCountContainer = ({ color, type, ...props }) => {
  return (
    <View>
      <Text style={{ color: color }}>{props.books[type].length || 0}</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    books: state.books,
  };
};

BooksCountContainer.defaultProps = {
  color: colors.txtPlaceholder,
};

BooksCountContainer.propTypes = {
  color: PropTypes.string,
  type: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({});

export default connect(mapStateToProps)(BooksCountContainer);
