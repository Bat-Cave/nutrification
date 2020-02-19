require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      cors = require('cors'),
      aws = require('aws-sdk'),
      session = require('express-session'),
      {SERVER_PORT, SESSION_SECRET, CONNECTION_STRING} = process.env,
      port = SERVER_PORT,
      ctrl = require('./controller'),
      app = express();

app.use(cors());
app.use(express.json());

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: SESSION_SECRET,
  cookie: {maxAge: 1000 * 60 * 60 * 10}
}))

app.post('/api/register', ctrl.register)
app.post('/api/login', ctrl.login)
app.get('/api/me', ctrl.getMe)
app.post('/api/profile/image', ctrl.updateProfilePicture)
app.post('/api/addMeal', ctrl.addMeal)
app.get('/api/userHistory/:id', ctrl.getUserHistory)
app.get('/sign-s3', ctrl.s3Upload)
app.get('/api/recommended', ctrl.getRecommended)
app.post('/api/auth/logout', ctrl.logout)


massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('Database connected')
  app.listen(port, () => console.log(`Server started on ${port}`));
});
