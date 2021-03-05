import * as mongoose from 'mongoose';
import Configs from '../core/enivronment.config';

const HanwokDb = mongoose.createConnection(
  Configs().DB_CONNECTION_STRING,
);
const userInfoDb = mongoose.createConnection(
  Configs().USER_INFO_CONNECTION,
);

export default {
  HanwokDb,
  userInfoDb,
};
