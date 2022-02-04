import { gql, TypedDocumentNode } from '@apollo/client';
import { Ad } from '../../../types/api';

interface Response {
  allMusicianAds: {
    data: Ad[];
  };
}

const query: TypedDocumentNode<Response> = gql`
  query allMusicianAds {
    allMusicianAds {
      data {
        _id
        title
        description
        author {
          _id
          firstName
          lastName
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
