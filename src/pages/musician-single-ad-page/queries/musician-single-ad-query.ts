import { FaunaId } from '../../../common/types/fauna';
import { gql, TypedDocumentNode } from '@apollo/client';
import { Ad } from '../../../common/types/types';

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
        adminUser {
          _id
          firstName
          lastName
          email
        }
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
