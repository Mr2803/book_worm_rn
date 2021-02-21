import { createStore, combineReducers } from "redux";
import booksReducer from "../reducers/BooksReducer";

const store = createStore(
  combineReducers({
    books: booksReducer,
  })
);

export default store;
