import { gql, TypedDocumentNode } from '@apollo/client';
import { Band } from '../../../types/api';

interface Response {
  allBands: {
    data: Band[];
  };
}

const query: TypedDocumentNode<Response> = gql`
  query AllBands {
    allBands {
      data {
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
