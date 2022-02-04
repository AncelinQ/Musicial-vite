import { gql, TypedDocumentNode } from '@apollo/client';
import { Musician } from '../../../types/api';

interface Response {
  allMusicians: {
    data: Musician[];
  };
}

const query: TypedDocumentNode<Response> = gql`
  query AllMusicians {
    allMusicians {
      data {
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
