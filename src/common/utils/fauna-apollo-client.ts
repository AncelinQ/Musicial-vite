import { getToken } from '../auth/auth-functions';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const { VITE_FAUNA_GRAPHQL_DOMAIN, VITE_FAUNA_HTTPS, VITE_FAUNA_SECRET } =
  process.env;

const httpLink = createHttpLink({
  uri: `http${
    VITE_FAUNA_HTTPS === 'true' ? 's' : ''
  }://${VITE_FAUNA_GRAPHQL_DOMAIN}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token if it exists
  const token =
    typeof getToken() !== 'undefined' ? getToken() : VITE_FAUNA_SECRET;
  // return the headers to the context so httpLink can read them

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const FaunaApolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default FaunaApolloClient;
