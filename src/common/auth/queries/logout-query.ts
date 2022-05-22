import { gql, TypedDocumentNode } from '@apollo/client';

interface Response {
  logoutData: Boolean;
}

const query: TypedDocumentNode<Response> = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

export default query;
