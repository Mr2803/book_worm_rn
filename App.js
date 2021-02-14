import React from "react";

import WelcomeScreen from "./screens/public/WelcomeScreen";
import HomeScreen from "./screens/auth/HomeScreen";
import LoginScreen from "./screens/public/LoginScreen";
import SettingsScreen from "./screens/auth/SettingsScreen";
import CustomDrawerComponent from "./screens/CustomDrawerComponent";
import colors from "./assets/colors";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./config/config";

class App extends React.Component {
  constructor() {
    super();
    this.initializeFirebase();
  }
  initializeFirebase = () => {
    firebase.initializeApp(firebaseConfig);
  };
  render() {
    return <AppContainer />;
  }
}

const loginFlow = createStackNavigator(
  {
    WelcomeScreen: {
      screen: WelcomeScreen,
      navigationOptions: {
        header: null,
        headerBackTitle: null,
      },
    },
    LoginScreen: {
      screen: LoginScreen,
      navigationOptions: {},
    },
  },
  {
    mode: "modal",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain,
      },
    },
  }
);
const drawerNavigator = createDrawerNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        title: "Home",
        drawerIcon: () => <Ionicons name="ios-home" size={24} />,
      },
    },
    SettingsScreen: {
      screen: SettingsScreen,
      navigationOptions: {
        title: "Settings",
        drawerIcon: () => <Ionicons name="ios-settings" size={24} />,
      },
    },
  },
  {
    contentComponent: CustomDrawerComponent,
  }
);
const switchNavigator = createSwitchNavigator({
  loginFlow,
  drawerNavigator,
});

const AppContainer = createAppContainer(switchNavigator);

export default App;
