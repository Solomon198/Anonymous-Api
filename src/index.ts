import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as helmet from 'helmet';
import constants from './constants/index';
import routes from './routes';

require('dotenv/config');
require('./utills/connection');

const {
  LOGIN_BASE,
  SIGNUP_BASE,
  VERIFICATION_BASE,
  TOKEN_MANAGEMENT_BASE,
  RESSET_PASSWORD_BASE,
  PROFILE_BASE,
} = constants.RouteBase;
// Application-Level Middleware
const app = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// api doc directory
app.use('/', express.static('api-doc'));

// Routes
app.use(LOGIN_BASE, routes.Login);
app.use(SIGNUP_BASE, routes.SignUp);
app.use(VERIFICATION_BASE, routes.Verification);
app.use(TOKEN_MANAGEMENT_BASE, routes.Token);
app.use(RESSET_PASSWORD_BASE, routes.PasswordReset);
app.use(PROFILE_BASE, routes.Profile);

export default app;
