=====>INSTALLATION<=====
///Sequelize -> yarn add sequelize --save
///Postgres -> yarn add --save pg pg-hstore
///Bcryptjs -> yarn add bcryptjs
///Express -> yarn add express
///Eslint -> yarn add eslint
///Eslint Config -> yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
///Jsonwebtoken -> yarn add jsonwebtoken
///Nodemailer -> yarn add nodemailer
///Date-fns -> yarn add date-fns
///Yup -> yarn add yup

====>DEV
///Nodemon -> yarn add nodemon -D
///Sucrase -> yarn add sucrase -D

===>Eslint FIX
yarn eslint --fix src --ext .js

===>SEQUELIZE COMMANDS
yarn sequelize db:seed:all
yarn sequelize db:migrate
yarn sequelize migration:generate --name [migration-name]
