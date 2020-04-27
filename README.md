# Welcome to StackEdit!

Hi! I'm your first Markdown file in **StackEdit**. If you want to learn about StackEdit, you can read me. If you want to play with Markdown, you can edit me. Once you have finished with me, you can create new files by opening the **file explorer** on the left corner of the navigation bar.


# Filesa
## _**GonzaloLawDashboard**_

## About

Project is divided into two codebases: **client** and **server**. I want to rename these to frontend and backend, but this will be a future change. For now, we'll be splitting our tasks into backend and frontend tasks.

The about section is still in progress. I haven't had much time to add more documentation on what the dashboard is, but feel free to add the documentation. Everyone in the team should feel free/responsible to document the project.

## Formatting

Still in-progress, haven't had much time to add to this section. However, it is important we all stick to one style so we are all able to read our code easily. We will be using [prettier](https://prettier.io/docs/en/install.html), a code formatter tool. Once you install it, run it from the main directory using this command:

`prettier --write '**/*.js`

This will format your code to use proper Javascript/HTML styling. Also, do any development in a separate branch. For example, if I am developing the authentication logic in the backend, I will develop it in the branch **PE_authentication_in_backend** (my initials, PE, and brief description of what the branch contains)


## Frontend

I added Semantic UI to the Frontend, a CSS styling library. This will help you make your frontend components a lot more stylish. Please read the documentation to learn how to use it in React: https://react.semantic-ui.com/

Github flow:
1. Clone repository
2. Create new branch
3. Push branch to remote
4. Create pull request
5. I will review your code and add it to master

## Backend

### Authentication

For authentication to work, you must be running the backend server and connected to a MongoDB database (whether it is the remote or local database). Once you have your database setup and configure (in the config.js), you can authenticate:

1) Start the backend server (make sure to do *npm install* before *npm start*)
2) Make the following POST request:
`http://localhost:5000/auth/login/user?username=pablo&password=123456`
Obviously, replace 'pablo' and '123456' with whatever user information your have in your database. However, if you have the seeding data, 'pablo' and '123456' are valid.
3) You will get a response like this:

>     {
>       "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjZiNTNiZjg5MDRiZDQzOGRkMThiMCIsImlhdCI6MTU4NDgyMDI2OH0.2OAph4K10ruhsJxZGMzMeysd2oNvv-SIiEg8Sx_hTk4",
>       "user": {
>         "_id": "5e66b53bf8904bd438dd18b0",
>         "username": "Pablo",
>         "password": "123456",
>         "address": {
>           "street": "5654 129th Ave N",
>           "city": "Miami",
>           "state": "Florida",
>           "zip": 44782
>         },
>         "birthDate": "09/20/1994",
>         "contact": {
>           "cellPhone": 123456789,
>           "email": "edward@gmail.com"
>         },
>         "firstName": "Pablo",
>         "middleName": "G.",
>         "secondName": "Estrada",
>         "imageUrl": "https://gonza99.s3.amazonaws.com/cmr_1563670923"
>       }
>     }
4) Get the 'token' from that response: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlNjZiNTNiZjg5MDRiZDQzOGRkMThiMCIsImlhdCI6MTU4NDgyMDI2OH0.2OAph4K10ruhsJxZGMzMeysd2oNvv-SIiEg8Sx_hTk4`
5) Now, whenever you access any routes, pass in the 'Bearer Auth' (this is found in the Authorization tab of Postman) and you will be authenticated!



### Seeding data
Seeding data is dummy data that we can use for testing. Seeding data is a file that contains a bunch of dummy users, admins, etc, so you can easily populate your local database with useful testing data.

#### How to populate your database with our seeding data?
1) Start your MongoDB local database
2) Go into the /server/ folder
3) Run `node seed/seed.js`
4) You should now have the database 'dashboard' with all the seeding data

#### Configuration
In order to run the backend, you must have a /server/config/config.js file, like this one:

    module.exports = {
     db: {
       uri:
           <MongoDB URI, ex"mongodb://127.0.0.1:27017/dashboard">
     },
     jwtSecret: "<Secure password, ex: "4688D7A784E4176F12DIDSJ7F00D5742225421">,
     AWS: {
       bucket: <AWS Bucket Name>,
       AWS_accessKeyId: <AWS Access Key ID>,
       AWS_secretKey: <AWS Secret Key>
     },
     mailGun:{
       domain: <MailGun Domain>,
       apiKey: <MailGun API Key>
     },
     QB: {
       intuitClientID: <Intuit Client ID>,
       intuitClientSecret: <Intuit Client Secret>,
       intuitRedirectURI: <Redirect url, ex: "http://localhost:5000/payments/callback"”>,
       intuitEnvironment: <”Sandbox” or “Production”>,
       intuitCompany: <Intuit Company id>,
       intuitItemId: <Intuit Item Id>
     }
    };

### Design

![enter image description here](https://i.ibb.co/7t2RnDY/Screen-Shot-2020-04-21-at-8-55-14-PM.png)

### Features

-   Users must be able to register accounts and be able to log in

-   Clients must be able to view their case information, its progress, and the lawyers assigned to work on the case

-   Admins must be able to view all their clients and be able to modify who is a client, and the case information for each client

-   Admins and users must be able to see and interact with their appointments/events through the calendar

-   Data must be stored in a central repository or database and accessed through the different APIs provided by the dashboard server.

-   Admins and clients must be able to view and interact with Quickbook invoices.

-   The interface must be intuitive to all types of potential users
