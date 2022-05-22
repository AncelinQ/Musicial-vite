import { gql, TypedDocumentNode } from '@apollo/client';
import { Ad } from '../../../common/types/types';

interface Response {
  bandAdsByCity: {
    data: Ad[];
  };
}

const query: TypedDocumentNode<Response> = gql`
  query bandAdsByCity($city: String!) {
    bandAdsByCity(city: $city) {
      data {
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
  }
`;

export default query;
