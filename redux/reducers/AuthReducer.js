const initialState = {
  isLoading: true,
  isSignedIn: false,
  currentUser: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      console.log("sign_in");
      return {
        ...state,
        isSignedIn: true,
        currentUser: action.payload,
        isLoading: false,
      };
    case "SIGN_OUT":
      console.log("sign_out");
      return {
        ...state,
        isSignedIn: false,
        currentUser: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default auth;
