import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import firebase from "firebase/app";
import "firebase/auth";

export default function useAuthenticateUser() {
  const dispatch = useDispatch();
  useEffect(() => {
    let unsubscribe;
    try {
      unsubscribe = firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          // sign the user in

          dispatch({ type: "SIGN_IN", payload: user });
        } else {
          console.log("no user signed in");
          //signout
          dispatch({ type: "SIGN_OUT" });
        }
        unsubscribe();
      });
    } catch (error) {
      //sign the out user
      console.log(error);
      dispatch({ type: "SIGN_OUT" });
      // this.props.signOut();
    }
  }, [dispatch]);
}
