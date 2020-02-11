const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
      const {email, password} = req.body;
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
        const db = req.app.get('db');
        console.log('Created db variable')
        let user = await db.check_users(email);
        console.log(`Checked user. Received ${user}`)
        if(user[0]){
            return res.status(400).send('User already exists')
        }
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let newUser = await db.register_user(email, hash);

        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    login: async(req, res) => {
      const {email, password} = req.body;
      const db = req.app.get('db');
      let user = await db.check_users(email);
      if(!user[0]){
          return res.status(400).send('Email not found');
      }

      let authenticated = bcrypt.compareSync(password, user[0].password);
      if(!authenticated){
          return res.status(401).send('Password is incorrect');
      }
      delete user[0].password;

      req.session.user = user[0];
      res.status(202).send(req.session.user);
    },
}