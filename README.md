Gigih Full Stack Track Midterm Submission
by Muhammad Rizky Khairullah
---

# Database Design
### 1. User Model  
    | Key      | Type      | Description                                       |
    |----------|-----------|---------------------------------------------------|
    | _id      | Object Id | User Id                                           |
    | name     | String    | User name                                         |
    | Email    | String    | User Email                                        |
    | Phone    | String    | User Phone Number                                 |
    | Password | String    | User password that already encrypted using bcrypt |

### 2. Video Model
    | Key          | Type      | Description                                                     |
    |--------------|-----------|-----------------------------------------------------------------|
    | _id          | Object Id | Video Id                                                        |
    | title        | String    | Video title                                                     |
    | thumbnailURL | String    | Video thumbnail URL                                             |
    | videoOwner   | String    | an id taken from userId. As a mark which user create the Video. |

### 3. Product Model
    | Key          | Type      | Description                                                   |
    |--------------|-----------|---------------------------------------------------------------|
    | _id          | Object Id | Product Id                                                    |
    | name         | String    | Product name                                                  |
    | price        | String    | Product price                                                 |
    | stock        | String    | product stock                                                 |
    | videoId      | Object Id | an id as identifier in which video this product will be shown |
    | productOwner | Object Id | an id as identifier which user post this product              |

### 4. Comment Model
    | Key      | Type      | Description                                       |
    |----------|-----------|---------------------------------------------------|
    | _id      | Object Id | Comment Id                                        |
    | userId   | Object Id | an id as identifier which user make the comment   |
    | username | String    | username of user who comment                      |
    | Comment  | String    | The comment                                       |
    | stock    | String    | product stock                                     |
    | videoId  | Object Id | an id as identifier which video has this comment  |

---
# Api Design

## Authentication API
## 1. Register
**URL** : `/api/register/`
**Method** : `POST`
**Auth required** : NO
**req.param**: -
**req.body**:
```json
{
    "name": "[User name]",
    "email":"[user email address]",
    "phone number": "[user phone number]",
    "password": "[user passowrd]"
}
```

This api will make a new User based on user input. The user input will be hashed using bcrypt. The return value will be a json with a key `message` which contain the information the register process success or not.

### 2. Registe (/register) - Post
**URL** : `/api/login/`
**Method** : `POST`
**Auth required** : NO
**req.param**: -
**req.body**:
```json
{
    "name": "[User name]",
    "password": "[user passowrd]"
}
```

This api will find in the User database if the username found or not, if found than the api will try to compare the password. If match so the login process will be success.

If the login above process failed, the api will return an error message as `message` in json. If the login process success, the api will return `message`, `token` and `refreshToken`. `token` will be used in other api to autheticate the user. 

## Video API
### 1. Get All Video 
**URL** : `/`
**Method** : `GET`
**Auth required** : NO
**req.param**: -
**req.body**: -
**api return** :
```json
{
    "data": "[array of video or NULL]",
    "message":"[either success or error message]",
    "error": "[NULL or error]",
}
```
This api will return the all video from the database using the format above

### 2. Add  Video 
**URL** : `/`
**Method** : `POST`
**Auth required** : YES
**req.param**: -
**req.body**:
```json
{
    "thumbnailUrl": "[image link of the video thumbanil]",
    "title":"[video title]",
}
```
**api return** :
```json
{
    "data": "[a new created video object or NULL]",
    "message":"[either success or error message]",
    "error": "[NULL or error]",
}
```
This api create a new video based on the user input. You need to authenticate yourself to use this api with put your `token` that you get from login in `req.headers` with `authorization` as the key.The authentication process will be do in middleware.From the middleware the controller will get userId.

The api will return your new video object or error message that follow above format.


## Product API

### 1. Get All Product 
**URL** : `/product/`
**Method** : `GET`
**Auth required** : NO
**req.param**: -
**req.body**: -
**api return** :
```json
{
    "data": "[an array of product or NULL]",
    "message":"[either success or error message]",
    "error": "[NULL or error]",
}
```
This api will query all the video from the database.

### 2. Add  Product 
**URL** : `/product/addProduct`
**Method** : `POST`
**Auth required** : YES
**req.param**: -
**req.body**:
```json
{
    "name": "[product name]",
    "title":"[video title]",
}
```
**api return** :
```json
{
    "data": "[a new created video object or NULL]",
    "message":"[either success or error message]",
    "error": "[NULL or error]",
}
```
This api create a new video based on the user input. You need to authenticate yourself to use this api with put your `token` that you get from login in `req.headers` with `authorization` as the key.The authentication process will be do in middleware.From the middleware the controller will get userId.

The api will return your new video object or error message that follow above format.

### 3. Get Product by Video Id 
**URL** : `/product/:id`
**Method** : `GET`
**Auth required** : NO
**req.param**: id
**req.body**: -
**api return** :
```json
{
    "data": "[an array of product or NULL]",
    "message":"[either success or error message]",
    "error": "[NULL or error]",
}
```
This api will query the video which have the specific video id from req.param.


## Comment Api

### 1. Get All Comment 
**URL** : `/comment/:id`
**Method** : `GET`
**Auth required** : NO
**req.param**: id
**req.body**: -
**api return** :
```json
{
    "data": "[an array of product or NULL]",
    "message":"[either success or error message]",
    "error": "[NULL or error]",
}
```
This api will query all the comment which have the specific video id from req.param.

### 2. Add  Comment 
**URL** : `/comment/;id`
**Method** : `POST`
**Auth required** : YES
**req.param**: id
**req.body**:
```json
{
    "comment": "[user comment]",
}
```
**api return** :
```json
{
    "data": "[a new created video object or NULL]",
    "message":"[either success or error message]",
    "error": "[NULL or error]",
}
```
This api create create a comment based on user input. You need to authenticate yourself to use this api with put your `token` that you get from login responsse in `req.headers` with `authorization` as the key. The authentication process will be do in middleware. from the middleware the controller will get userId and username.

The api will return your new comment object or error message that follow above format.


----
# How To Run
1.  Clone this github into your local machine using gitc clone https://github.com/Rzkykhrllh/GG3.0-Midterm.git
2.  Run npm install to install all the dependencies
3.  Run the project using npm run dev commend
4.  Create a new user using register api
5.  Login and get authorization token using login api
6.  Put the authorization into request headers
7.  Now you can post video, product, and comment
8.  After post a video, product, and comment, now you can query the video, product and comment
