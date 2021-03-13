import React from "react";
import { render } from "react-dom";
import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../assets/colors";
import NetworkImage from "react-native-image-progress";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useNavigation } from "@react-navigation/native";

const ListItem = ({ item, children, marginVertical, editable, onPress }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("DetailScreen", { bookData: item })}
    >
      <View style={[styles.listItemContainer, { marginVertical }]}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            disabled={!editable}
            style={{ flex: 1 }}
            onPress={() => onPress(item)}
          >
            {item.image ? (
              <NetworkImage
                source={{ uri: item.image }}
                style={styles.image}
                indicator={() => (
                  <AnimatedCircularProgress
                    size={70}
                    width={5}
                    fill={100}
                    tintColor={colors.logoColor}
                    backgroundColor={colors.bgMain}
                  />
                )}
                indicatorProps={{
                  size: 40,
                  borderWidth: 0,
                  color: colors.logoColor,
                  unfilledColor: "rgba(200,200,200,0.2)",
                }}
                imageStyle={{ borderRadius: 35 }}
              />
            ) : (
              <Image
                source={require("../assets/icon.png")}
                style={styles.image}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.listItemTitleContainer}>
          <Text style={styles.listItemTitle}>{item.name}</Text>
        </View>
        {children}
      </View>
    </TouchableOpacity>
  );
};

ListItem.defaultProps = {
  marginVertical: 5,
  editable: false,
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
