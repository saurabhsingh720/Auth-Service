const express = require('express');
const bodyParser = require('body-parser');


const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

/*
const {User} = require('./models/index');
const bcrypt = require('bcrypt');
*/

const app = express();

const prepareAndServer = () => {

     app.use(bodyParser.json());
     app.use(bodyParser.urlencoded({extended: true}));

     app.use('/api', apiRoutes);

     app.listen(PORT, async () => {
          console.log('Server Started on PORT :', PORT);
          /*
          //matching the hashed incrypted password
          const incomingpassword = '98765';
          const user = await User.findByPk(6);
          const response = bcrypt.compareSync(incomingpassword, user.password);
          console.log(response);
          */
     })
}

prepareAndServer();