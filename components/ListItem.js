import React from "react";
import { render } from "react-dom";
import { Text, View, StyleSheet, Image } from "react-native";
import colors from "../assets/colors";

const ListItem = ({ item, children }) => {
  return (
    <View style={styles.listItemContainer}>
      <View style={styles.imageContainer}>
        <Image source={require("../assets/icon.png")} style={styles.image} />
      </View>
      <View style={styles.listItemTitleContainer}>
        <Text style={styles.listItemTitle}>{item.name}</Text>
      </View>
      {children}
      {/* {item.read ? (
      <Ionicons name="ios-checkmark" color={colors.logoColor} size={30} />
    ) : (
      <CustomActionButton
        style={styles.markAsReadButton}
        onPress={() => this.markAsRead(item, index)}
      >
        <Text style={styles.markAsReadButtonText}>Mark as read</Text>
      </CustomActionButton>
    )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  listItemContainer: {
    minHeight: 100,
    flexDirection: "row",
    backgroundColor: colors.listItemBg,
    alignItems: "center",
    marginVertical: 5,
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

export default ListItem;
