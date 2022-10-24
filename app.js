const express = require('express');

//
const indexRoute = require('./routers/index');
const registerRouter = require('./routers/register');
const loginRouter = require('./routers/login');
const logoutRouter = require('./routers/logout');

const app = express();

// db
const data = [];

// middleware
app.use(express.json());

// route
app.use('/', indexRoute);
app.use('/register', registerRouter);
app.use('./login', loginRouter);
app.use('/logout', logoutRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`app run on port ${port}`));
