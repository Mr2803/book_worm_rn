import React from "react";
import * as firebase from "firebase/app";
import { Provider } from "react-redux";
import { firebaseConfig } from "./config/config";
import store from "./redux/store";

import { LogBox } from "react-native";
import BookWorm from "./BookWorm";
LogBox.ignoreLogs(["Setting a timer"]);

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
        <BookWorm />
      </Provider>
    );
  }
}

export default App;
