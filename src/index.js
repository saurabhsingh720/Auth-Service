const express = require('express');
const bodyParser = require('body-parser');


const { PORT } = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

/*
const {User} = require('./models/index');
const bcrypt = require('bcrypt');
*/

// const UserRepository = require('./repository/user-repository');

// const UserService = require('./services/user-service');

const db = require('./models/index');

const {User, Role} = require('./models/index');

const app = express();

const prepareAndServer = () => {

     app.use(bodyParser.json());
     app.use(bodyParser.urlencoded({ extended: true }));

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

          /*
          const repo = new UserRepository();
          const response = await repo.getById(1);
          console.log(response);
          */

          /*
          const service = new UserService();
          const newToken = service.createToken({ email: 'ajay@gmail.com', id: 4 });
          console.log(newToken);

          const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFqYXlAZ21haWwuY29tIiwiaWQiOjQsImlhdCI6MTcxOTY1MDQ1OCwiZXhwIjoxNzE5NjU0MDU4fQ.FpG6DRT1TQukYSY7Vq7H14-DuT5i3cBER6hXhU6iNHk';
          const response = service.verifyToken(token);
          console.log(response);
          // */

          if(process.env.DB_SYNC) {
               db.sequelize.sync({alter: true});
          }

          // const u1 = await User.findByPk(4);
          // const r1 = await Role.findByPk(1);
          // // u1.addRole(r1);

          // const response = await u1.hasRole(r1);
          // console.log(response);

     })
}

prepareAndServer();