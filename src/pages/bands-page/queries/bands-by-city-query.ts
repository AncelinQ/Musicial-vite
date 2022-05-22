import { gql, TypedDocumentNode } from '@apollo/client';
import { Ad } from '../../../common/types/types';

interface Response {
  bandsByCity: {
    data: Ad[];
  };
}

const query: TypedDocumentNode<Response> = gql`
  query bandsByCity($city: String!) {
    bandsByCity(city: $city) {
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
