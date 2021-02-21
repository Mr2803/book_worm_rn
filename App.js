import React from "react";
import WelcomeScreen from "./screens/public/WelcomeScreen";
import HomeScreen from "./screens/auth/HomeScreen";
import LoginScreen from "./screens/public/LoginScreen";
import SettingsScreen from "./screens/auth/SettingsScreen";
import BooksReadingScreen from "./screens/auth/HomeTabNavigator/BooksReadingScreen";
import BooksReadScreen from "./screens/auth/HomeTabNavigator/BooksReadScreen";
import CustomDrawerComponent from "./screens/CustomDrawerComponent";
import LoadingScreen from "./screens/public/LoadingScreen";
import colors from "./assets/colors";
import {
  createAppContainer,
  createSwitchNavigator,
  createStackNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
} from "react-navigation";
import { Ionicons } from "@expo/vector-icons";
import { firebaseConfig } from "./config/config";
import * as firebase from "firebase/app";
import { Provider } from "react-redux";
import store from "./redux/store";

class App extends React.Component {
  constructor() {
    super();
    this.initializeFirebase();
  }
  initializeFirebase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  };
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
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
const TabNavigator = createBottomTabNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: "Tutti i Libri",
      },
    },
    BooksReadingScreen: {
      screen: BooksReadingScreen,
      navigationOptions: {
        tabBarLabel: "Libri che stai leggendo",
      },
    },
    BooksReadScreen: {
      screen: BooksReadScreen,
      navigationOptions: {
        tabBarLabel: "Libri Letti",
      },
    },
  },
  {
    tabBarOptions: {
      style: {
        backgroundColor: colors.bgMain,
      },
      activeTintColor: colors.logoColor,
      inactiveTintColor: colors.bgTextInput,
    },
  }
);

const HomeStackNavigator = createStackNavigator(
  {
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: ({ navigation }) => {
        return {
          headerLeft: (
            <Ionicons
              name="ios-menu"
              size={30}
              color={colors.logoColor}
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 10 }}
            />
          ),
        };
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: colors.bgMain,
      },
      headerTintColor: colors.txtWhite,
    },
  }
);

TabNavigator.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  switch (routeName) {
    case "HomeScreen":
      return {
        headerTitle: "Tutti i Libri",
      };
    case "BooksReadingScreen":
      return {
        headerTitle: "Libri che stai leggendo",
      };
    case "BooksReadScreen":
      return {
        headerTitle: "Libri letti",
      };

    default:
      return {
        headerTitle: "Book Worm",
      };
  }
};
const drawerNavigator = createDrawerNavigator(
  {
    HomeStackNavigator: {
      screen: HomeStackNavigator,
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
  LoadingScreen,
  loginFlow,
  drawerNavigator,
});

const AppContainer = createAppContainer(switchNavigator);

export default App;
