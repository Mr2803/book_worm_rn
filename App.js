import React from "react";
import { Provider } from "react-redux";
import * as firebase from "firebase/app";
import { firebaseConfig } from "./config/config";
import store from "./redux/store";

import { LogBox } from "react-native";
import BookWorm from "./BookWorm";
LogBox.ignoreLogs(["Setting a timer"]);

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);

export default function App() {
  return (
    <Provider store={store}>
      <BookWorm />
    </Provider>
  );
}
