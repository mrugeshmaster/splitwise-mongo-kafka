const app = require('./app');

const ping = require('./routes/ping');
const login = require('./routes/login');
const signup = require('./routes/signup');
const profile = require('./routes/profile');
const images = require('./routes/images');
const groups = require('./routes/groups');
const bills = require('./routes/bills');
// const balances = require('./routes/balances');
// const settle = require('./routes/settle');
// const recentactivity = require('./routes/recentactivity');

app.use('/api/ping', ping);
app.use('/api/login', login);
app.use('/api/signup', signup);
app.use('/api/profile', profile);
app.use('/api/images', images);
app.use('/api/groups', groups);
app.use('/api/bills', bills);
// app.use('/api/balances', balances);
// app.use('/api/settle', settle);
// app.use('/api/recentactivity', recentactivity);

const port = process.env.PORT || 3001;

app.listen(port);

module.exports = app;
