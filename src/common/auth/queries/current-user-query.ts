import { gql, TypedDocumentNode } from '@apollo/client';
import { User } from '../../types/types';

export interface Response {
  currentUser?: User | null;
}

export const query: TypedDocumentNode<Response, unknown> = gql`
  query CurrentUserQuery {
    currentUser {
      _id
      email
      firstName
      lastName
    }
  }
`;

export default query;
