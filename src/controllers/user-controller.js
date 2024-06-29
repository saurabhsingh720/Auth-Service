const {response} = require('express');
const UserService = require('../services/user-service');

const userService = new UserService();

const create = async (req, res) => {
     try {
          const response = await userService.create({
               email: req.body.email,
               password: req.body.password
          });
     } catch (error) {
         console.log(error);
         return res.status(500).json({
          message: 'Something went wrong',
          data: {},
          success: false,
          err: error
         });
     }
}

module.exports = {
     create
}