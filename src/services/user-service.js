const UserRepository = require('../repository/user-repository');
const jwt = require('jsonwebtoken');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const AppErrors = require('../utils/error-handler');

class UserService {
     constructor() {
          this.userRepository = new UserRepository();
     }

     async create(data) {
          try {
               const user = await this.userRepository.create(data);
               return user;
          } catch (error) {
               if(error.name == 'SequelizeValidationError') {
                    throw error;
               }
               console.log("Something went wrong on repo layer");
               throw new AppErrors(
                  'ServerError',
                  'Something went wrong in service',
                  'Logical Issue found',
                  500  
               )
          }
     }

     async signIn(email, plainPassword) {
          try {
               //fetching the user using email
               const user = await this.userRepository.getByEmail(email);

               //comparing the incoming plain password with  stored encrypted password
               const passwordsMatch = this.checkPassword(plainPassword, user.password);
               if (!passwordsMatch) {
                    console.log('Password doesnot match');
                    throw { error: 'Incorrect password' };
               }

               //if password match then create a token and send it to the user
               const newJWT = this.createToken({ email: user.email, id: user.id });
               return newJWT;
          } catch (error) {
               console.log('Something went wrong in the sign in process');
               throw error;
          }
     }

     async isAuthenticated(token) {
          try {
               const response = this.verifyToken(token);
               if (!response) {
                    throw { error: 'Invalid token' };
               }
               const user = await this.userRepository.getById(response.id);
               if (!user) {
                    throw { error: 'No user with the corresponding token exits' };
               }
               return user.id;
          } catch (error) {
               console.log('Something went wrong in the sign in process');
               throw error;
          }
     }

     createToken(user) {
          try {
               const result = jwt.sign(user, JWT_KEY, { expiresIn: '1h' });
               return result;
          } catch (error) {
               console.log("Something went wrong in token creation");
               throw error;
          }
     }

     verifyToken(token) {
          try {
               const response = jwt.verify(token, JWT_KEY);
               return response;
          } catch (error) {
               console.log("Something went wrong in token validation", error);
               throw error;
          }
     }

     checkPassword(userInputPlainPassword, encryptedPassword) {
          try {
               return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
          } catch (error) {
               console.log("Something went wrong in password comparision");
               throw error;
          }
     }

     isAdmin(userId) {
          try {
               return this.userRepository.isAdmin(userId);
          } catch (error) {
               console.log("Something went wrong in service layer");
               throw error;
          }
     }
}

module.exports = UserService;