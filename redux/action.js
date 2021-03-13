export const loadBooks = (books) => ({
  type: "LOAD_BOOKS_FROM_SERVER",
  payload: books,
});

export const toggleIsLoadingBooks = (bool) => ({
  type: "TOGGLE_IS_LOADING_BOOKS",
  payload: bool,
});

export const deleteBook = (book) => ({
  type: "DELETE_BOOK",
  payload: book,
});

export const updateBookImage = (book) => ({
  type: "UPDATE_BOOK_IMAGE",
  payload: book,
});

export const markBookAsRead = (book) => ({
  type: "MARK_BOOK_AS_READ",
  payload: book,
});
export const markBookAsUnread = (book) => ({
  type: "MARK_BOOK_AS_UNREAD",
  payload: book,
});
export const addBook = (book) => ({
  type: "ADD_BOOK",
  payload: book,
});
export const signOut = () => ({
  type: "SIGN_OUT",
});
