import { FaunaId } from '../../../common/types/fauna';
import { gql, TypedDocumentNode } from '@apollo/client';
import { Ad } from '../../../common/types/types';

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
