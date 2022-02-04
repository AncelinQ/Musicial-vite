import { FaunaId } from '../../../types/fauna';
import { gql, TypedDocumentNode } from '@apollo/client';
import { Ad } from '../../../types/api';

interface Response {
  findBandAdByID: Ad;
}

interface Variables {
  id: FaunaId;
}

const query: TypedDocumentNode<Response, Variables> = gql`
  query findBandAdByID($id: ID!) {
    findBandAdByID(id: $id) {
      _id
      title
      description
      author {
        _id
        name
        city
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
