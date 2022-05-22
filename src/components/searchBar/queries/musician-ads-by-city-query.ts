import { gql, TypedDocumentNode } from '@apollo/client';
import { Ad } from '../../../common/types/types';

interface Response {
  musicianAdsByCity: {
    data: Ad[];
  };
}

const query: TypedDocumentNode<Response> = gql`
  query musicianAdsByCity($city: String!) {
    musicianAdsByCity(city: $city) {
      data {
        _id
        title
        description
        author {
          _id
          adminUser {
            _id
            firstName
            lastName
          }
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
