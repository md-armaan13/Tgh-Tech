[![npm version](https://badge.fury.io/js/angular2-expandable-list.svg)](https://badge.fury.io/js/angular2-expandable-list)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)


# Student Management System

# Environment vars
This project uses the following environment variables:

| Name                          | Description                         | Default Value                                  |
| ----------------------------- | ------------------------------------| -----------------------------------------------|
|PORT          | Specify Port to run app            | 8000     |
|MONGO_URL     | Mongodb url to connect to databse  | mongodb+srv://MdArmaan13:1372001a@cluster0.7ynusyc.mongodb.net/?retryWrites=true&w=majority
|JWT_SECRET_KEY | secret key for jwt authentication | hD4XUKetCwrQCAWeaMHCa7Pu1AtvwtzBiU5zmd6oJjFwxYWflIbbgmQWsyc98VnI
|ExpiresIn     | Expire time for Jwt token | 1h
# Pre-requisites
- Install [Node.js](https://nodejs.org/en/) version 8.0.0


# Getting started
- Clone the repository
```
git clone  https://github.com/md-armaan13/Tgh-Tech.git
```
- Install dependencies
```
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:8000`

- API Document endpoints

  Postman Doc : http://localhost:8001/api-docs 

## Project Structure
The folder structure of this app is explained below:

| Name | Description |
| ------------------------ | --------------------------------------------------------------------------------------------- |
| **dist**                 | Contains the distributable (or output) from your TypeScript build.  |
| **node_modules**         | Contains all  npm dependencies                                                            |
| **src**                  | Contains  source code that will be compiled to the dist dir                               |
| **src/config**        | Application configuration including environment-specific configs 
| **src/controllers**      | Controllers define functions to serve various express routes.  
| **src/middlewares**      | Express middlewares which process the incoming requests before handling them down to the routes
| **src/routes**           | Contain all express routes, separated by module/area of application                       
| **src/models**           | Models define schemas that will be used in storing and retrieving data from Application database  |
| **src**/index.ts         | Entry point to express app                                                               |
| package.json             | Contains npm dependencies as well as [build scripts]                                                 |

# API Endpoints

These endpoints allow you to make request to the backend from the client side.

## POST
`POST /login`<br/>
A route to loggedIn admin and student

**Paramters**
| Name | Required | Type | Description |
| -------------:|:--------:|:-------:|------------- |
| `email` | required | string | It requires valid email of the user|
| `password` | required | string | A valid non empty 6 digit password |
**Response**


```
{
    "status": 201,
    "msg": "Login Succesully",
    "hasError": false,
    "data": {
      access_token : token
    }
}
```

`POST /admin/add-student`<br/>
A protected route only access by admin to add students

**Paramters**
| Name | Required | Type | Description |
| -------------:|:--------:|:-------:|------------- |
| `name` | required | string |It requires full name of user , only alphabets ( Lowercase and Uppercase Both ).|
| `email` | required | string | It requires valid email of the user |
| `department` | required | string | It require name of department|
| `password` | required | string | A valid non empty 6 digit password |
**Response**


```
{
    "status": 201,
    "msg": "User Created Successfully",
    "hasError": false,
    "data": user
}
```

---

`POST /admin/assign-task`<br/>
A protected route only accessed by admin to assign task to students.

**Paramters**
| Name | Required | Type | Description |
| -------------:|:--------:|:-------:|------------- |
| `profileId` | required | string |It require profile id of student|
| `title` | requires | string | title of the task |
| `description` | requires | string | description of the task|
| `dueDate` | requires | string | due date to complete the task |


**Response**

```
{
    "status": 201,
    "msg": "Task Assign Successfully",
    "hasError": false,
    "data": task
}

```
## GET
`GET /student/view-task`<br/>
A protected route  accessed by students to get all the task assigned to them

**Response**

```
{
    "status": 201,
    "msg": "Task fetched Successfully",
    "hasError": false,
    "data": tasks
}
```
`GET /student/update-task-status/:id`<br/>
A protected route  accessed by students to update the status of the task

**Response**

```
{
    "status": 201,
    "msg": "Task status updated successfully",
    "hasError": false,
    "data": task
}
---
