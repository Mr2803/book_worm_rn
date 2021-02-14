import React, { Component } from "react";
import { View, StyleSheet, TextInput, Text } from "react-native";
import colors from "../../assets/colors";
import CustomActionButton from "../../components/CustomActionButton";

export default class LoginScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: "center" }}>
          <TextInput
            style={styles.textInput}
            placeholder="abc@example.com"
            placeholderTextColor={colors.bgTextInputDark}
            keyboardType="email-address"
          />
          <TextInput
            style={styles.textInput}
            placeholder="enter password"
            placeholderTextColor={colors.bgTextInputDark}
            secureTextEntry
          />
          <View style={{ alignItems: "center" }}>
            <CustomActionButton
              style={[styles.loginButton, { borderColor: colors.bgPrimary }]}
            >
              <Text style={{ color: "white", fontWeight: "100" }}>Login</Text>
            </CustomActionButton>
            <CustomActionButton
              style={[styles.loginButton, { borderColor: colors.bgError }]}
            >
              <Text style={{ color: "white", fontWeight: "100" }}>Signup</Text>
            </CustomActionButton>
          </View>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bgMain,
  },
  textInput: {
    height: 50,
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginHorizontal: 40,
    marginBottom: 10,
    color: colors.txtWhite,
    paddingHorizontal: 10,
  },
  loginButton: {
    borderWidth: 0.5,
    backgroundColor: "transparent",
    width: 200,
    marginTop: 10,
  },
});
