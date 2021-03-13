import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomActionButton from "../../components/CustomActionButton";
import colors from "../../assets/colors";
import * as firebase from "firebase/app";
import "firebase/auth";
import { useDispatch } from "react-redux";
import { signOut } from "../../redux/action";

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut();
      dispatch(signOut());
      // this.props.navigation.navigate("WelcomeScreen");
    } catch (error) {
      console.log(error);
      alert("Impossibile effettuare il logout");
    }
  };

  return (
    <View style={styles.container}>
      <CustomActionButton
        title="Sign Up"
        onPress={handleSignOut}
        style={{
          width: 200,
          borderWidth: 0.5,
          backgroundColor: "transparent",
          borderColor: colors.bgError,
        }}
      >
        <Text style={{ fontWeight: "100", color: "white" }}>Log out</Text>
      </CustomActionButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgMain,
  },
});
