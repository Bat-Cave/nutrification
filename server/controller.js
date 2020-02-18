require('dotenv').config();
const bcrypt = require('bcryptjs');
const aws = require('aws-sdk');
const {S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY} = process.env

module.exports = {
    register: async(req, res) => {
      const {first_name, last_name, email, password, profile_pic, height, weight, gender, age, activity_level, rec_daily_calorie, rec_daily_protein, rec_daily_carb, rec_daily_fat, rec_daily_water} = req.body;
        const db = req.app.get('db');
        let user = await db.check_users(email);
        if(user[0]){
            return res.status(400).send('User already exists')
        }
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        let newUser = await db.register_user(first_name, last_name, email, hash, profile_pic, height, weight, age, gender, activity_level, rec_daily_calorie, rec_daily_protein, rec_daily_carb, rec_daily_fat, rec_daily_water);

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
    getMe: async (req, res) => {
      if(req.session.user){
        const {user_id} = req.session.user;
        const db = req.app.get('db');
        console.log('Hit get user')
        const userInfo = await db.get_me(user_id);
        delete userInfo[0].password;
        res.status(200).send(userInfo[0]);
      } else {
        res.status(401).send('User not found');
      }
    },
    updateProfilePicture: async (req, res) => {
      const {url, id} = req.body;
      const db = req.app.get('db');
      console.log(url);
      console.log(id);
      const success = await db.update_profile_pic(url, id);
      res.status(200).send(success);
    },
    addMeal: async (req, res) => {
      const db = req.app.get('db');
      const {user_id, meal_name, entry_date, entry_time, you_ate, biotin, folic_acid, niacin, pantothenic_acid, riboflavin, thiamin, vitamin_a, vitamin_b6, vitamin_b12, vitamin_c, vitamin_d, vitamin_e, vitamin_k,calcium, chloride, chromium, copper, iodine, iron, magnesium, mangenese, molybdenum, phosphorus, potassium, selenium, sodium, zinc, protein, fiber, water, carbohydrates, sugar, fat, calories, alcohol,caffeine
      } = req.body.nutrients
      let confirm = await db.add_meal(user_id, meal_name, entry_date, entry_time, you_ate, biotin, folic_acid, niacin, pantothenic_acid, riboflavin, thiamin, vitamin_a, vitamin_b6, vitamin_b12, vitamin_c, vitamin_d, vitamin_e, vitamin_k,calcium, chloride, chromium, copper, iodine, iron, magnesium, mangenese, molybdenum, phosphorus, potassium, selenium, sodium, zinc, protein, fiber, water, carbohydrates, sugar, fat, calories, alcohol,caffeine);
      console.log(req.body.nutrients);
      res.status(200).send(confirm);
    },
    getUserHistory: async (req, res) => {
      const {id} = req.params;
      const db = req.app.get('db');
      const history = await db.get_user_history(id);
      res.status(200).send(history)
    },
    s3Upload: (req, res) => {

      aws.config = {
        region: 'us-west-1',
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY
      }
      
      const s3 = new aws.S3();
      const fileName = req.query['file-name'];
      const fileType = req.query['file-type'];
      const s3Params = {
        Bucket: S3_BUCKET,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'public-read'
      };
    
      s3.getSignedUrl('putObject', s3Params, (err, data) => {
        if(err){
          console.log(err);
          return res.end();
        }
        const returnData = {
          signedRequest: data,
          url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
        };
    
        return res.send(returnData)
      });
    }, 
    getRecommended: async (req, res) => {
      const db = req.app.get('db');
      const data = await db.get_recommended();
      res.status(200).send(data)
    }
  }