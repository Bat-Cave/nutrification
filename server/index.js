require('dotenv').config();
const express = require('express'),
      massive = require('massive'),
      cors = require('cors'),
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

//ENDPOINTS




massive(CONNECTION_STRING).then(db => {
  app.set('db', db);
  console.log('Database connected')
  app.listen(port, () => console.log(`Server started on ${port}`));
});