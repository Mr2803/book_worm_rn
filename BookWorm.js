import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import WelcomeScreen from "./screens/public/WelcomeScreen";
import HomeScreen from "./screens/auth/HomeScreen";
import LoginScreen from "./screens/public/LoginScreen";
import SettingsScreen from "./screens/auth/SettingsScreen";
import BooksReadingScreen from "./screens/auth/HomeTabNavigator/BooksReadingScreen";
import BooksReadScreen from "./screens/auth/HomeTabNavigator/BooksReadScreen";
import CustomDrawerComponent from "./screens/CustomDrawerComponent";
import LoadingScreen from "./screens/public/LoadingScreen";
import colors from "./assets/colors";
import SplashScreen from "./screens/public/SplashScreen";

import { Ionicons } from "@expo/vector-icons";
import { firebaseConfig } from "./config/config";
import * as firebase from "firebase/app";
import "firebase/auth";
import { Provider } from "react-redux";
import store from "./redux/store";
import BooksCountContainer from "./redux/containers/BooksCountContainer";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { LogBox } from "react-native";
import { connect } from "react-redux";

LogBox.ignoreLogs(["Setting a timer"]);

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

class BookWorm extends Component {
  componentDidMount() {
    this.checkIfLoggedIn();
  }

  checkIfLoggedIn = () => {
    let unsubscribe;
    try {
      unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // sign the user in
          this.props.signIn(user);
        } else {
          console.log("no user signed in");
          //signout
          this.props.signOut();
        }
        unsubscribe();
      });
    } catch (error) {
      //sign the out user
      console.log(error);
      this.props.signOut();
    }
  };
  render() {
    if (this.props.auth.isLoading) {
      return <SplashScreen />;
    }
    return (
      <NavigationContainer>
        {!this.props.auth.isSignedIn ? (
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: colors.bgMain,
              },
              headerTintColor: "white",
            }}
          >
            <Stack.Screen
              name="WelcomeScreen"
              options={{ headerShown: false }}
              component={WelcomeScreen}
            />
            <Stack.Screen
              name="LoginScreen"
              options={{ headerBackTitleVisible: false }}
              component={LoginScreen}
            />
          </Stack.Navigator>
        ) : (
          <ActionSheetProvider>
            <AppDrawerNavigator />
          </ActionSheetProvider>
        )}
      </NavigationContainer>
    );
  }
}

const HomeTabNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: colors.logoColor,
      inactiveTintColor: colors.bgTextInput,
      style: {
        backgroundColor: colors.bgMain,
      },
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        switch (route.name) {
          case "Books":
            return <BooksCountContainer color={color} type="books" />;
          case "BooksReading":
            return <BooksCountContainer color={color} type="booksReading" />;
          case "BooksRead":
            return <BooksCountContainer color={color} type="booksRead" />;

          default:
            break;
        }
      },
    })}
  >
    <Tab.Screen
      options={{ tabBarLabel: "Tutti i libri" }}
      name="Books"
      component={HomeScreen}
    />
    <Tab.Screen
      options={{ tabBarLabel: "Libri che stai leggendo" }}
      name="BooksReading"
      component={BooksReadingScreen}
    />
    <Tab.Screen
      options={{ tabBarLabel: "Libri letti" }}
      name="BooksRead"
      component={BooksReadScreen}
    />
  </Tab.Navigator>
);

const getHeaderTitle = (route) => {
  const routeName = route.state
    ? route.state.routes[route.state.index].name
    : "Home";

  switch (routeName) {
    case "Home":
      return "Tutti i libri";
    case "BooksReading":
      return "Libri che stai leggendo";
    case "BooksRead":
      return "Libri Letti";

    default:
      return routeName;
  }
};

const HomeStackNavigator = ({ navigation }) => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: colors.bgMain },
      headerTintColor: "white",
      headerLeft: () => (
        <Ionicons
          onPress={() => navigation.openDrawer()}
          name="ios-menu"
          size={30}
          color="white"
          style={{ marginLeft: 10 }}
        />
      ),
    }}
  >
    <Stack.Screen
      options={({ route }) => ({
        title: getHeaderTitle(route),
      })}
      name="HomeTabNavigator"
      component={HomeTabNavigator}
    />
  </Stack.Navigator>
);

const AppDrawerNavigator = () => (
  <Drawer.Navigator
    drawerContent={(props) => <CustomDrawerComponent {...props} />}
  >
    <Drawer.Screen
      options={{
        drawerIcon: () => <Ionicons name="ios-home" size={24} />,
      }}
      name="Home"
      component={HomeStackNavigator}
    />
    <Drawer.Screen
      options={{
        drawerIcon: () => <Ionicons name="ios-settings" size={24} />,
      }}
      name="Settings"
      component={SettingsScreen}
    />
  </Drawer.Navigator>
);

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (user) => dispatch({ type: "SIGN_IN", payload: user }),
    signOut: () => dispatch({ type: "SIGN_OUT" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookWorm);