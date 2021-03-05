require('dotenv/config');

const {
  JWT_SIGN,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  SINCH_KEY,
  SINCH_SECRET,
  NUMVERIFY_SECRET,
  GEOCODING_APIKEY,
  DB_NAME_2,
  PORT,
  JWT_AUDIENCE,
  JWT_ISSUER,
} = process.env;

const developement = {
  JWT_SIGN: 'my-secret', // secret for decoding jwts token
  PORT: 8084,
  DB_CONNECTION_STRING: 'mongodb://localhost/hanwok',
  USER_INFO_CONNECTION: 'mongodb://localhost/user-info-service',
  JWT_ISSUER: 'https://example.com/example',
  JWT_AUDIENCE: '76rghjklkjh',
  JWT_ALGO: 'RS256',
  APP_TEST_ENDPOINT: 'http://localhost:8084',
};

const production = {
  JWT_SIGN,
  SINCH_KEY,
  SINCH_SECRET,
  NUMVERIFY_SECRET,
  GEOCODING_APIKEY,
  PORT,
  DB_CONNECTION_STRING: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@services.onb2v.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
  USER_INFO_CONNECTION: `mongodb+srv://${DB_USER}:${DB_PASSWORD}@services.onb2v.mongodb.net/${DB_NAME_2}?retryWrites=true&w=majority`,
  JWT_ISSUER: JWT_AUDIENCE,
  JWT_AUDIENCE: JWT_ISSUER,
  JWT_ALGO: 'RS256',
  APP_TEST_ENDPOINT: '',
};

export default function environment() {
  switch (process.env.NODE_ENV) {
    case 'dev':
      return developement;
    case 'production':
      return production;
    default:
      return developement;
  }
}
