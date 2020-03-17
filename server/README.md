# Kudos App Server

### Installation

Clone the repository.

```sh
$ git clone https://github.com/bharadhwaj/kudos-app.git
$ cd kudos-app/server/
$ yarn install
```

To start running this, you might need an `.env` file.

```sh
$ touch .env
```
The `.env` should contain following keys for the smooth running of app.

```dosini
ADD_DUMMY_DATA=0 # To decide whether to run script to populate dummy data. 
SERVER_PORT="3000" # Port in which server runs
MYSQL_URL_DEV="mysql://<user>:<password>@<host>:<port>/<database>" # MySQL DB URL for Dev
MYSQL_URL_PRODUCTION="mysql://<user>:<password>@<host>:<port>/<database>" # MySQL DB URL for Production
JWT_SECRET="<random-mixed-alphanumeric-string>" # To generate JWT
```

To start the server
```sh
$ yarn dev-server
```

The dev server should be up and running.

License
----

MIT


**Free Software, Hell Yeah!**

