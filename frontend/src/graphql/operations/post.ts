import { gql } from "@apollo/client";

const posts = {
  Queries: {
    posts: gql`
      query Posts {
        posts {
          author
          comment
        }
      }
    `,
  },
  Mutations: {
    createPost: gql`
      mutation CreatePost($author: String, $comment: String) {
        createPost(author: $author, comment: $comment) {
          author
          comment
        }
      }
    `,
  },
  Subscriptions: {},
};

export default posts;
