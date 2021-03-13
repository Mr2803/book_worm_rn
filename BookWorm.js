import React from "react";
import WelcomeScreen from "./screens/public/WelcomeScreen";
import HomeScreen from "./screens/auth/HomeScreen";
import LoginScreen from "./screens/public/LoginScreen";
import SettingsScreen from "./screens/auth/SettingsScreen";
import BooksReadingScreen from "./screens/auth/HomeTabNavigator/BooksReadingScreen";
import BooksReadScreen from "./screens/auth/HomeTabNavigator/BooksReadScreen";
import CustomDrawerComponent from "./screens/CustomDrawerComponent";
import DetailScreen from "./screens/auth/DetailScreen";
import colors from "./assets/colors";
import SplashScreen from "./screens/public/SplashScreen";
import { Ionicons } from "@expo/vector-icons";
import "firebase/auth";
import BooksCountContainer from "./redux/containers/BooksCountContainer";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import useAuthenticateUser from "./hooks/useAuthenticateUser";

export default function BookWormHook() {
  useAuthenticateUser();
  const auth = useSelector((state) => state.auth);
  // console.log(auth);

  if (auth.isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      {!auth.isSignedIn ? (
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

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

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

const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
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
    <Stack.Screen
      options={({ route }) => ({
        title: capitalize(route.params.bookData.name),
      })}
      name="DetailScreen"
      component={DetailScreen}
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
