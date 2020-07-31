=====>INSTALLATION<=====
///Sequelize -> yarn add sequelize --save
///Postgres -> yarn add --save pg pg-hstore
///Bcryptjs -> yarn add bcryptjs
///Express -> yarn add express
///Eslint -> yarn add eslint
///Eslint Config -> yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
///Jsonwebtoken -> yarn add jsonwebtoken
///Yup -> yarn add yup

====>DEV
///Nodemon -> yarn add nodemon -D
///Sucrase -> yarn add sucrase -D

TALVEZ FALTE O MODULO "pg": "^8.2.1",

===>Eslint FIX
yarn eslint --fix src --ext .js



===>SEQUELIZE COMMANDS
yarn sequelize db:seed:all

=>then

yarn sequelize db:migrate
