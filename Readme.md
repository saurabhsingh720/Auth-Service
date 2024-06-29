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
