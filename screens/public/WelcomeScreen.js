import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../../assets/colors";
import CustomActionButton from "../../components/CustomActionButton";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: colors.bgMain }}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons name="ios-bookmarks" size={150} color={colors.logoColor} />
        <Text style={{ fontSize: 50, fontWeight: "100", color: "white" }}>
          Book Worm
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <CustomActionButton
          title="Login"
          onPress={() => navigation.navigate("LoginScreen")}
          style={{
            width: 200,
            borderWidth: 0.5,
            backgroundColor: "transparent",
            borderColor: colors.bgPrimary,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontWeight: "100", color: "white" }}>Login</Text>
        </CustomActionButton>
      </View>
    </View>
  );
}
