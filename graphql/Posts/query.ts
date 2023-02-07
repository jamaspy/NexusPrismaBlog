import { gql } from "@apollo/client";

export const allPostsQuery = gql`
  query {
    allPosts {
      id
      title
      content
    }
  }
`;
