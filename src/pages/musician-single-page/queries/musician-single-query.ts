import { FaunaId } from './../../../types/fauna';
import { gql, TypedDocumentNode } from '@apollo/client';
import { Musician } from '../../../types/api';

interface Response {
  findMusicianByID: Musician;
}

interface Variables {
  id: FaunaId;
}

const query: TypedDocumentNode<Response, Variables> = gql`
  query findMusicianByID($id: ID!) {
    findMusicianByID(id: $id) {
      user {
        _id
        email
      }
      _id
      firstName
      lastName
      city
      instrument {
        _id
        name
      }
      band {
        _id
        name
      }
      styles {
        data {
          style {
            _id
            name
          }
        }
      }
      ads {
        data {
          _id
          title
        }
      }
    }
  }
`;

export default query;
