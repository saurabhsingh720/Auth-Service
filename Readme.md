**Auth service**
- done all setups
- created and generated all folders
- change the database name and put the database password
- use `npx sequelize db:create`
- use `npx sequelize model:generate --name User --attributes email:string,password:string`
- use `npx sequeli
ze db:migrate`
- setting up different files
- we can use path `localhost:3001/api/v1/signup` in postman
- making the password encrypted by using `bcrypt` npm package
- added attributes to show to the user like id and email.
- Now install `npm i jsonwebtoken`
- Added all the function that helps in signing in in with the correct email and password.
- Added function that only works when both email and password is entered by users.
- Done authentication

**Implementing authorisation**
- lets create a `role` model
- do `npx sequelize model:generate --name Role --attributes name:string`
- The above command creates a migration file and a model file
- do `npx sequelize db:migrate` , this will create tables of name `roles`
- do `npx sequelize seed:generate --name add-roles`
- do `npx sequelize db:seed --seed filename.js`

**Handling the different errors**
- install package for error `npm i http-status-codes`