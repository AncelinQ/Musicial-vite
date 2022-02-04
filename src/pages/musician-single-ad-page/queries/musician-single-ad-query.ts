import { FaunaId } from './../../../types/fauna';
import { gql, TypedDocumentNode } from '@apollo/client';
import { Ad } from '../../../types/api';

interface Response {
  findMusicianAdByID: Ad;
}

interface Variables {
  id: FaunaId;
}

const query: TypedDocumentNode<Response, Variables> = gql`
  query findMusicianAdByID($id: ID!) {
    findMusicianAdByID(id: $id) {
      _id
      title
      description
      author {
        _id
        firstName
        lastName
        city
        instrument {
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
      }
    }
  }
`;

export default query;
