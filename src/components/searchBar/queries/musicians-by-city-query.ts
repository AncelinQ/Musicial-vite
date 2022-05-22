import { Instrument } from '../../../common/types/types';
import { gql, TypedDocumentNode } from '@apollo/client';
import { Ad } from '../../../common/types/types';

interface Response {
  musiciansByCity: {
    data: Ad[];
  };
}

const query: TypedDocumentNode<Response> = gql`
  query musiciansByCity($city: String!) {
    musiciansByCity(city: $city) {
      data {
        _id
        adminUser {
          _id
          firstName
          lastName
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
