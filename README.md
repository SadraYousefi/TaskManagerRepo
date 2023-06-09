
# TaskManager
This is a task manager application built on top of javascript.
technologies used in this application: 
Backend: node.js/express.js
frontend : html/css(bootstrap)/javascript
database: Postgres
ORM: Prisma
other technologies: Axios - node-fetch - js 


## Authors

- [@Sadra Yousefi](https://github.com/SadraYousefi)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL=`



## Deployment

To deploy this project run
```bash
  npm install
```
after all packages installed then run : 
```bash
  npm start
```

to deploy database after inserting db_uri in .env file (check .env.example)
```bash
  npx prisma migrate
```


## Features

- Both Api + SSR responses
- Use JWT for authentication
- Cross platform


## Brief explanation

This project uses JWT as an authentication system
After the user login to the website we set the 'authorization' cookie for 1 hour so if the user leaves the page and comes back in this time, he will auto redirect to the dashboard page.
while the user is logged in she doesn't have access to /login, /register pages
Users can read groups and tasks also they can delete, read, and write the things they created 
On the main page, they can check or uncheck the tasks and it also changes in the database so if they refresh the page everything remains the same
This app is using ssr frontend but it has implanted API inside the ssr
this app uses prisma as orm for express.js so you can migrate models to any new database simply by running PRISMA-CLI commands.
We used the joi package for data validation and also a built-in function to detect and remove unwanted data, for example for login and register we don't let users use passwords less than 5 chars and strings that don't have email formats also we use the built-in package for update request so empty data get deleted.
We use 2 middlewares to secure our routes both for SSR and API
and at last logout function will delete the user's cookies and redirect him to the login page!

