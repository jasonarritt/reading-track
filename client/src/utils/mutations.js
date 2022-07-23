import { gql } from "@apollo/client";

// LOGIN_USER mutation
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// ADD_USER mutation
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// SAVE_BOOK mutation
export const SAVE_BOOK = gql`
  mutation saveBook(
    $bookId: String!
    $authors: [String]!
    $description: String
    $title: String!
    $image: String
    $link: String
  ) {
    saveBook(
      bookId: $bookId
      authors: $authors
      description: $description
      title: $title
      image: $image
      link: $link
    ) {
      username
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
// REMOVE_BOOK mutation
export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      username
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
