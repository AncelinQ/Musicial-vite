import { gql, TypedDocumentNode } from '@apollo/client';
import { AuthPayload } from '../../types/types';

interface Response {
  registeredUser: AuthPayload;
}

interface Variables {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const query: TypedDocumentNode<Response, Variables> = gql`
  mutation register(
    $email: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    createUser(
      data: {
        email: $email
        firstName: $firstName
        lastName: $lastName
        password: $password
      }
    ) {
      token
      adminUser {
        _id
        role
        email
        firstName
        lastName
      }
    }
  }
`;

export default query;
