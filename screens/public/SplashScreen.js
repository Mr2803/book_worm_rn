import React from "react";
import { View, Text, StyleSheet } from "react-native";

import LottieView from "lottie-react-native";
import colors from "../../assets/colors";
const SplashScreen = (props) => (
  <View style={styles.container}>
    <LottieView
      style={{ height: 200, width: 200 }}
      source={require("../../assets/splash.json")}
      autoPlay
      loop
    />
  </View>
);
export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgMain,
  },
});
