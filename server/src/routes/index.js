const authRoute = require('./auth');
const userRoute = require('./user');
const messageRoute = require('./message');

const Router = (app) => {
    app.use('/', authRoute);
    app.use('/user', userRoute);
    app.use('/msg', messageRoute);
}

module.exports = Router;