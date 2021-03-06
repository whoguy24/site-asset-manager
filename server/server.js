const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const navigationRouter = require('./routes/navigation.router');
const equipmentRouter = require('./routes/equipment.router');
const sitesRouter = require('./routes/sites.router');
const siteRouter = require('./routes/site.router');
const buildingRouter = require('./routes/building.router');
const systemRouter = require('./routes/system.router');
const activityRouter = require('./routes/activity.router');
const stepRouter = require('./routes/step.router');
const issueRouter = require('./routes/issue.router');
const ecmRouter = require('./routes/ecm.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/navigation', navigationRouter);
app.use('/api/equipment', equipmentRouter);
app.use('/api/sites', sitesRouter);
app.use('/api/site', siteRouter);
app.use('/api/building', buildingRouter);
app.use('/api/system', systemRouter);
app.use('/api/activity', activityRouter);
app.use('/api/step', stepRouter);
app.use('/api/issue', issueRouter);
app.use('/api/ecm', ecmRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
