import faunaClient from '../../scripts/fauna-client';
import faunadb from 'faunadb';
const fql = faunadb.query;

async function authenticate(email: string, password: string) {
  return await faunaClient.query(
    fql.Login(fql.Match(fql.Index('user_by_email')), email),
    {
      password: password,
      ttl: fql.TimeAdd(fql.Now(), 1, 'hour'),
    }
  );
}
