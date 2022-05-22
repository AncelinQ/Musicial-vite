import { FaunaId } from '../../../common/types/fauna';
import { gql, TypedDocumentNode } from '@apollo/client';
import { AuthPayload } from '../../../common/types/types';

interface Response {
  loginUser: AuthPayload;
}

interface Variables {
  email: string;
  password: string;
}

const query: TypedDocumentNode<Response, Variables> = gql`
  mutation login($email: String!, $password: String!) {
    loginUser(data: { email: $email, password: $password }) {
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
