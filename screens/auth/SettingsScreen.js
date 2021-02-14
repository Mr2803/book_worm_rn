import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomActionButton from "../../components/CustomActionButton";
import colors from "../../assets/colors";

export default class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CustomActionButton
          title="Sign Up"
          onPress={() => this.props.navigation.navigate("WelcomeScreen")}
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgMain,
  },
});
