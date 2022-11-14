# access to database
Databases are hosted locally by running the setup-dbs script, because of security reasons in order for node-postgres to connect to the databases securily you must create two files named .env.develoment and .env.test and set the variable environment PGDATABASE to the database name in the db/setup.sql, you can do this by following the .env-example.
