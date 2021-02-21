import React from "react";
import { render } from "react-dom";
import { Text, View, StyleSheet, Image } from "react-native";
import colors from "../assets/colors";

const ListItem = ({ item, children, marginVertical }) => (
  <View style={[styles.listItemContainer, { marginVertical }]}>
    <View style={styles.imageContainer}>
      <Image source={require("../assets/icon.png")} style={styles.image} />
    </View>
    <View style={styles.listItemTitleContainer}>
      <Text style={styles.listItemTitle}>{item.name}</Text>
    </View>
    {children}
  </View>
);

ListItem.defaultProps = {
  marginVertical: 5,
};

export default ListItem;

const styles = StyleSheet.create({
  listItemContainer: {
    height: 100,
    flexDirection: "row",
    backgroundColor: colors.listItemBg,
    alignItems: "center",
  },
  imageContainer: {
    height: 70,
    width: 70,
    marginLeft: 10,
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    borderRadius: 35,
  },

  listItemTitleContainer: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 5,
  },
  listItemTitle: {
    fontWeight: "100",
    fontSize: 22,
    color: colors.txtWhite,
  },
});
