import { FaunaId } from '../../../common/types/fauna';
import { gql, TypedDocumentNode } from '@apollo/client';
import { Musician } from '../../../common/types/types';

interface Response {
  findMusicianByID: Musician;
}

interface Variables {
  id: FaunaId;
}

const query: TypedDocumentNode<Response, Variables> = gql`
  query findMusicianByID($id: ID!) {
    findMusicianByID(id: $id) {
      adminUser {
        _id
        email
        firstName
        lastName
      }
      _id
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
