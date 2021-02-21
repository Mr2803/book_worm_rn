import React, { Component } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import * as firebase from "firebase/app";
import "firebase/auth";
import colors from "../../assets/colors";

export default class LoadingScreen extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }
  checkIfLoggedIn = () => {
    this.unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //navigate to the home
        this.props.navigation.navigate("HomeScreen", { user });
      } else {
        //navigate to login
        this.props.navigation.navigate("loginFlow");
      }
    });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colors.logoColor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bgMain,
  },
});
