process.env['NODE_CONFIG_DIR'] = __dirname + '/configs';

import 'dotenv/config';
import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
// import UsersRoute from '@routes/users.route';
import ApplicationsRoute from '@routes/applications.route';
import validateEnv from '@utils/validateEnv';

validateEnv();

const app = new App([new IndexRoute(), new AuthRoute(), new ApplicationsRoute()]); //new UsersRoute(),

app.listen();
