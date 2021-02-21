const initialState = {
  books: [],
  booksReading: [],
  booksRead: [],
};

const books = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_BOOKS_FROM_SERVER":
      return {
        ...state,
        books: action.payload,
        booksReading: action.payload.filter((book) => !book.read),
        booksRead: action.payload.filter((book) => book.read),
      };
    case "ADD_BOOK":
      return {
        ...state,
        books: [action.payload, ...state.books],
        booksReading: [action.paylod, state.booksReading],
      };
    case "MARK_BOOKS_AS_READ":
      return {
        ...state,
        books: state.books.map((books) => {
          if (book.name == action.payload.name) {
            return { ...book, read: true };
          }
          return book;
        }),
      };
    default:
      return state;
  }
};

export default books;
