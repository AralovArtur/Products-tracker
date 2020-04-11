# Project description

This project is a REST API application with which you can track products (add, modify, delete, categorize). The main objective of this project was to implement the required functionality. Styling was not given time. Also, tests are implemented with regards to the products API (tests with regards to categories API are not implemented, since they have to be implemented in the same way).

# Used technologies
When writing the project, various technologies were used. The following are the technologies that have been used.

## Express.js
For a back-end part, an Express.js framework was used. 

## React

For a front-end part, a React library was used.

## Mocha

To test asynchronous calls a Mocha framework was used.

## Chai

For assertion purposes, a Chai assertion library was used.

## MongoDB Atlas

For data storage MongoDB Atlas cloud database was used.

# Deploy

To connect to the database next steps need to be done:
 1. build a cluster;
 2. connect to the cluster using '.env' file (see /backend/.env file). 
 
To run an Express.js server following command should be executed:
  "npm server.js"
  
To run a Node.js server for React application following command should be executed:
  "npm start"
