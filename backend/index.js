const app = require('./app');

const ping = require('./routes/ping');
const login = require('./routes/login');
const signup = require('./routes/signup');
const profile = require('./routes/profile');
const images = require('./routes/images');
const groups = require('./routes/groups');
const bills = require('./routes/bills');
const activity = require('./routes/activity');

app.use('/api/ping', ping);
app.use('/api/login', login);
app.use('/api/signup', signup);
app.use('/api/profile', profile);
app.use('/api/images', images);
app.use('/api/groups', groups);
app.use('/api/bills', bills);
app.use('/api/activity', activity);

const port = process.env.PORT || 3001;

app.listen(port);

module.exports = app;
