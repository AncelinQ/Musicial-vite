import { gql, TypedDocumentNode } from '@apollo/client';
import { Ad } from '../../../types/api';

interface Response {
  allBandAds: {
    data: Ad[];
  };
}

const query: TypedDocumentNode<Response> = gql`
  query allBandAds {
    allBandAds {
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
