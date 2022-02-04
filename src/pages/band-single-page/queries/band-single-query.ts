import { FaunaId } from './../../../types/fauna';
import { gql, TypedDocumentNode } from '@apollo/client';
import { Band } from '../../../types/api';

interface Response {
  findBandByID: Band;
}

interface Variables {
  id: FaunaId;
}

const query: TypedDocumentNode<Response, Variables> = gql`
  query findBandByID($id: ID!) {
    findBandByID(id: $id) {
      admin {
        _id
        email
      }
      _id
      name
      city
      members {
        data {
          _id
          firstName
          lastName
        }
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
