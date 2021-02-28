import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomActionButton from "../../components/CustomActionButton";
import colors from "../../assets/colors";
import * as firebase from "firebase/app";
import "firebase/auth";
import { connect } from "react-redux";
class SettingsScreen extends Component {
  signOut = async () => {
    try {
      await firebase.auth().signOut();
      this.props.signOut();
      // this.props.navigation.navigate("WelcomeScreen");
    } catch (error) {
      console.log(error);
      alert("Impossibile effettuare il logout");
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <CustomActionButton
          title="Sign Up"
          onPress={this.signOut}
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
const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch({ type: "SIGN_OUT" }),
  };
};

export default connect(null, mapDispatchToProps)(SettingsScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bgMain,
  },
});
