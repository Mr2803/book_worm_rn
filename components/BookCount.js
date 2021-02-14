import React from "react";
import { Text, View } from "react-native";
import PropTypes from "prop-types";

const BookCount = (props) => {
  const { count, title } = props;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 20 }}>{title}</Text>
      <Text>{count}</Text>
    </View>
  );
};

BookCount.propTypes = {
  count: PropTypes.number.isRequired,
  title: PropTypes.string,
};

BookCount.defaultProps = {
  title: "Title",
};

export default BookCount;
