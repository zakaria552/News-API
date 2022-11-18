# Link to the hosted API
🚀 https://jittery-pig-teddy.cyclic.app/api

# Project summary
A RESTFUL news API fully built with using TDD methodology and the Model View Controller design pattern. The API that responds with information that is stored in a database server to its client and with this information it can be used by the frontend architecture. It make uses of sql database to store data about articles, topics, comments and users, e.g. like keeping track of the comments and reaction left in articles by the users. Ans also I used express node js dealing with the server side.


# Setup guide 
Begin by cloning this repo to your local machine, here is a [guide](https://github.com/git-guides/git-clone) to cloning. Afterwards you would need to install all the dependencies that the application relies on and also devdependencies if you wish work on the code. Bellow are listed the packeges you need to install, it is ideal to get the latest version but also bellow is listed minimum version required for the project to run.
#### dependencies
* Node js v8.0.0
* postgress v8.8.0
* pg-format
* express
* dotenv
#### devdependencies
* jest & jest-extended & jest-sorted
* supertest
* husky

Once installed all the dependencies, next is to setup the database.

##  Database setup 
Databases are hosted locally by running the setup-dbs script, because of security reasons in order for node-postgres to connect to the databases securily you must create two files named .env.develoment and .env.test and set the variable environment PGDATABASE to the database name in the db/setup.sql, you can do this by following the .env-example.
## Seed / running tests
After you've setup the database you can seed the local database by running the run-seed file, but to make things easier I've provided script "npm run seed" in the json package that does the same. Also to run tests there is script "npm run test" for it to check weather the code is passing or failing the tests. 
