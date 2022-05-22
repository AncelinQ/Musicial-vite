import { gql, TypedDocumentNode } from '@apollo/client';
import { Ad } from '../../../common/types/types';

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
