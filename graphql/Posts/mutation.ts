import { gql } from "@apollo/client";

export const createPostMutation = gql`
  mutation createPost($title: String!, $content: String!) {
    createPost(data: { title: $title, content: $content }) {
      message
      error
    }
  }
`;

export const updatePostMutation = gql`
  mutation updatePost($id: Int!, $title: String!, $content: String!) {
    updatePost(id: $id, title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

export const deletePostMutation = gql`
  mutation deletePost($id: Int!) {
    deletePost(id: $id) {
      id
    }
  }
`;
