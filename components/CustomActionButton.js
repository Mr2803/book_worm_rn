import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

function getPosition(position) {
  switch (position) {
    case "left":
      return { position: "absolute", left: 20, bottom: 20 };
    default:
      return { position: "absolute", right: 20, bottom: 20 };
  }
}
const CustomActionButton = ({ children, onPress, style, position }) => {
  const floatinActionButton = position ? getPosition(position) : [];
  return (
    <TouchableOpacity style={floatinActionButton} onPress={onPress}>
      <View style={[styles.button, style]}>{children}</View>
    </TouchableOpacity>
  );
};

CustomActionButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  children: PropTypes.isRequired,
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

CustomActionButton.defaultProps = {
  style: {},
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    backgroundColor: "#deada5",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CustomActionButton;
