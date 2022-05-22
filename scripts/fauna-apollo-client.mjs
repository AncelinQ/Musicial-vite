import dotenv from 'dotenv';
// Require the driver
import faunadb from 'faunadb';

// Read environment variables from .env file
dotenv.config();

// Acquire the secret and optional endpoint from environment variables
const {
  FAUNA_DOMAIN,
  FAUNA_PORT,
  VITE_FAUNA_HTTPS,
  VITE_FAUNA_SECRET,
} = process.env;

if (typeof VITE_FAUNA_SECRET === 'undefined')
{
  throw new Error('VITE_FAUNA_SECRET environment variable is missing.');
}

const faunaClient = new faunadb.Client({
  secret: VITE_FAUNA_SECRET,
  domain: FAUNA_DOMAIN || 'db.eu.fauna.com',
  port: Number(FAUNA_PORT) || 443,
  scheme: VITE_FAUNA_HTTPS === 'false' ? 'http' : 'https',
});

export default faunaClient;
