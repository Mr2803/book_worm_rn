import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";
import colors from "../assets/colors";
import { Ionicons } from "@expo/vector-icons";
import { DrawerItems } from "react-navigation";

export default class CustomDrawerComponent extends Component {
  render() {
    return (
      <ScrollView>
        <SafeAreaView style={{ backgroundColor: colors.bgMain }} />
        <View
          style={{
            height: 200,
            backgroundColor: colors.bgMain,
            alignItems: "center",
            justifyContent: "center",
            paddingTop: Platform.OS == "android" ? 50 : 0,
          }}
        >
          <Ionicons name="ios-bookmarks" size={100} color={colors.logoColor} />
          <Text style={{ fontSize: 25, color: "white", fontWeight: "100" }}>
            {" "}
            Book Worm
          </Text>
        </View>
        <DrawerItems {...this.props} />
      </ScrollView>
    );
  }
}
