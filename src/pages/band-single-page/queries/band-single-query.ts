import { FaunaId } from '../../../common/types/fauna';
import { gql, TypedDocumentNode } from '@apollo/client';
import { Band } from '../../../common/types/types';

interface Response {
  findBandByID: Band;
}

interface Variables {
  id: FaunaId;
}

const query: TypedDocumentNode<Response, Variables> = gql`
  query findBandByID($id: ID!) {
    findBandByID(id: $id) {
      adminUser {
        _id
        email
        firstName
        lastName
      }
      _id
      name
      city
      members {
        data {
          adminUser {
            _id
            firstName
            lastName
          }
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
