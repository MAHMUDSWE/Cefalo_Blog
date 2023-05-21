# <p align="center">Cefalo_Blog Web Service Documentation</p>

Cefalo Blog is a web application backend that allows users to read and manage blogs. It provides a seamless experience for users to explore, create, update, and delete their own blogs, as well as view blogs posted by other users. Users can express their thoughts, ideas, and stories through engaging written content, creating an immersive reading experience.

</br>

## <h2> Tools and Technologies </h2>

<details>

- [Express.js](https://expressjs.com/) - A web application framework for Node.js. Used for designing and building web applications quickly and easily.

- [Sequelize](https://sequelize.org/) - A Node. js-based Object Relational Mapper (ORM).

- [MySQL](https://www.mysql.com/) - Database that implements the SQL standard.

- [Filess.io](https://filess.io/) - For hosting database.

<!-- - [Cloudinary](https://cloudinary.com/documentation) - For image hosting. -->

- [Express-Validator](https://express-validator.github.io/docs) - An express.js middleware for validation and sanitization.

- [JSON Web Token](https://jwt.io/) - used for authentication.

- [bcrypt](https://www.npmjs.com/package/bcrypt) - A library to help you hash passwords.

<!-- - [Multer](https://github.com/expressjs/multer) - A node.js middleware for handling multipart/form-data. -->

- [SQLite](https://www.npmjs.com/package/sqlite) - Database to enable testing mutiple files together.

- [JEST](https://jestjs.io/) - For unit testing.

- [SuperTest](https://github.com/ladjs/supertest) - For integration testing.

<br>
</details>

## <h2> How to Run this Project </h2>

<details>

- ### Step 1

  Make you you have Node installed in your machine . If not then install node in your machine first .


- ### Step 2

  Clone this Github Repository <br>

  <pre>git clone https://github.com/MAHMUDSWE/Cefalo_Blog.git</pre>

- ### Step 3

  This command installs any packages that the project depends on. <br>

  <pre> npm install</pre>

- ### Step 4

  Create a database in filess.io 

- ### Step 5

  create a file called .env and write all the values of corresponding environment variable : <br>
  <br>
  A sample .env file can be like this , <br>

  <pre>

  PORT=your server port number
  API_URL="/api/v1" //Api Versioning
  DB_NAME="Your database name"
  DB_USER="Your database username"
  DB_PASSWORD="Your database password"
  DB_DIALECT="Your database (like mysql/postgres/sqlite etc)"
  DB_HOST="Your database host"

  JWT_SECRET_KEY="Your access token secret"
  JWT_ACCESS_EXPIRE_TIME="Valid time for jwt token"

  STORAGE=":memory:" //for testing purpose
  </pre>

- ### Step 6

  after doing all the steps now you can run the following command <br>

  <pre>npm start</pre>

  if there is no error then it should run perfectly!!

 </details >

## <h2>API Documentation </h2>

<h3>Auth Related Endpoints </h3>

<details>

- ### <h2>**POST /api/v1/user/signup** </h2>

  Creates a new user profile with the provided information.

  **<h2>Conditions for a valid signup request</h2>**
  - Name is required and must not exceed 30 characters .
  - Email is required and must be a valid email address.
  - Usernmae is required and must be between 4-20 characters.
  - Password is required and must be between 4-20 characters.
  - Confirm password is optional but if given must matches the given password

  **<h2>Request</h2>**
  - Method: POST
  - Endpoint: `/api/v1/user/signup`
  - Body: 
    ```json
    {
      "name": "Mahmudur Rahman",
      "email": "mahmudur69@student.sust.edu",
      "username": "mahmudswe",
      "password": "1234",
      "confirmPassword": "1234"
    }
    ```

  **<h2>Successful Response</h2>**
  - Status Code: 201 Created
  - Body:
    ```json
    {
      "message": "Profile for Mahmudur Rahman with username mahmudswe created successfully",
      "user": {
        "name": "Mahmudur Rahman",
        "email": "mahmudur69@student.sust.edu",
        "username": "mahmudswe",
        "createdAt": "2023-05-20T19:30:06.808Z",
        "updatedAt": "2023-05-20T19:30:06.808Z"
      }
    }
    ```

  **<h2>Error Responses</h2>**
  Request having an email address which is already used by an user
  - Status Code: 409 Conflict
  - Body: 
    ```json
    {
      "message": "Email already in use"
    }
    ```
  Request having an username which is already taken by an user
  - Status Code: 409 Conflict
  - Body: 
    ```json
    {
      "message": "Username already in use"
    }
    ```
  Following are the validation error response when a user do not follow the above signup request conditions
  - Status Code: 400 Bad Request
  - Body:
    <!-- ```json
    {
      "message": "Name is required"
    }
    //Email, Username, Password is required also
    ```
    OR
    ```json
    {
      "message": "Invalid email address"
    }
    ```
    OR
    ```json
    {
      "message": "Username must be at least 4 characters"
    }
    ```
    OR
    ```json
    {
      "message": "Password must be at max 20 characters"
    }
    ```
    OR
    ```json
    {
      "message": "Password do not match"
    }
    ``` -->

    ```json
    {
      "message": "Name is required,
                  Invalid email address,
                  Username must be at least 4 characters,
                  Password must be at max 20 characters,
                  Passwords do not match"
      //Email, Username and Password is required also
    }
    ```

- ### <h2>**POST /api/v1/user/login** </h2>
  Logs in a user with the provided username and password and returns an access token.

  **<h2>Conditions for a valid login request</h2>**
  - Usernmae is required and must be between 4-20 characters.
  - Password is required and must be between 4-20 characters.

  **<h2>Request</h2>**
  - Method: POST
  - Endpoint: `/api/v1/user/login`
  - Body: 
    ```json
    {
      "username": "mahmudswe",
      "password": "1234"
    }
    ```

  **<h2>Successful Response</h2>**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJmZGUxMWIwZS00OTgyLTQ2OWItODY5NS0yM2I4NTAxMDliMTAiLCJpYXQiOjE2ODQ2NTkwMzUsImV4cCI6MTY4NDc0NTQzNX0.l5W5orY7IVpb_PgcpAUvkMZsuBAWLO3Ct-w7E6BBrhQ"
    }
    ```
  **<h2>Error Responses</h2>**
  In case the provided username and password are incorrect.
  - Status Code: 401 Unauthorized
  - Body:
    ```json
    {
      "message": "Invalid username or password"
    }
    ```
  &nbsp;
  In case the request is invalid or missing required parameters
  - Status Code: 400 Bad Request
  - Body: 
    ```json
    {
      "message": "Username is required"
    }
    //Password is also required
    ```

</details>

<h3>User Related Endpoints </h3>

<details>

- ### <h2>**GET /api/v1/user** </h2>
  Retrieves a list of users with pagination.

  **<h2>Request</h2>**
  - Method: GET
  - Endpoint: `/api/v1/user?page=1&limit=2`
  - Headers
    - Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI3NmIzZmRlMS05YTliLTQxMmEtOGQ5OC00MTRhMmVmN2MwN2QiLCJpYXQiOjE2ODMzNzEzMTAsImV4cCI6MTY4MzM3NDkxMH0.y4KCzdXksNfLwQBbw7rJgz8eDbU849VwWGs8_UuEFWE"

  **<h2>Successful Response</h2>**
  - Status Code: 200 OK
  - Content-Type: application/json
  - Body:
    ```json
    {
    "users": [
        {
            "name": "Mahmudur Rahman",
            "email": "mahmudur69@student.sust.edu",
            "username": "mahmudswe",
            "createdAt": "2023-05-20T19:30:06.000Z",
            "updatedAt": "2023-05-20T19:30:06.000Z"
        },
        {
            "name": "Abu Salman Hossain",
            "email": "salman67@student.sust.edu",
            "username": "salmanswe",
            "createdAt": "2023-05-20T16:05:48.000Z",
            "updatedAt": "2023-05-20T16:05:48.000Z"
        }
    ],
    "currentPage": 1,
    "totalPages": 1,
    "totalUsers": 2
    }
    ```

- ### <h2>**GET /api/v1/user/:username** </h2>
  Retrieves information of an user with username.

  **<h2>Request</h2>**
  - Method: GET
  - Endpoint: `/api/v1/user/mahmudswe`
  - Headers
    - Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI3NmIzZmRlMS05YTliLTQxMmEtOGQ5OC00MTRhMmVmN2MwN2QiLCJpYXQiOjE2ODMzNzEzMTAsImV4cCI6MTY4MzM3NDkxMH0.y4KCzdXksNfLwQBbw7rJgz8eDbU849VwWGs8_UuEFWE"

  **<h2>Successful Response</h2>**
  - Status Code: 200 OK
  - Content-Type: application/json
  - Body:
    ```json
    {
      "name": "Mahmudur Rahman",
      "email": "mahmudur69@student.sust.edu",
      "username": "mahmudswe",
      "createdAt": "2023-05-20T19:30:06.000Z",
      "updatedAt": "2023-05-20T19:30:06.000Z"
    }
    ```
  **<h2>Error Response</h2>**
  If the specified user is not found
  - Status Code: 404 Not Found
  - Body:
    ```json
    {
      "message": "User not found"
    }
    ```
- ### <h2>**PUT /api/v1/user/:username** </h2>
  Updates the user information and returns the updated information

  **<h2>Request</h2>**
  - Method: GET
  - Endpoint: `/api/v1/user/mahmudswe`
  - Headers 
    - Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI3NmIzZmRlMS05YTliLTQxMmEtOGQ5OC00MTRhMmVmN2MwN2QiLCJpYXQiOjE2ODMzNzEzMTAsImV4cCI6MTY4MzM3NDkxMH0.y4KCzdXksNfLwQBbw7rJgz8eDbU849VwWGs8_UuEFWE"
  - Body: 
    ```json
    {
      "name": "Mahmudur Rahman Sardar"
    }
    ```

  **<h2>Successful Response</h2>**
  - Status Code: 200 OK
  - Content-Type: application/json
  - Body:
    ```json
    {
      "name": "Mahmudur Rahman Sardar",
      "email": "mahmudur69@student.sust.edu",
      "username": "mahmudswe",
      "createdAt": "2023-05-20T19:30:06.000Z",
      "updatedAt": "2023-05-21T11:42:54.997Z"
    }
    ```
  **<h2>Error Responses</h2>**
  If the specified user is not found
  - Status Code: 404 Not Found
  - Body:
    ```json
    {
      "message": "User with id 98682456-6e37-4729-ba74-017d7170a9b1 not found"
    }
    ```
  In case the request is missing or has an invalid or expired token.
  - Status Code: 401 Unauthorized
  - Body: 
    ```json
    {
      "message": "invalid token"
    }
    ```
    OR
    ```json
    {
      "message": "invalid signature"
    }
    ```

- ### <h2>**DELETE /api/v1/user/:username** </h2>

  Deletes a user with the specified ID.

  **<h2>Request</h2>**
  - Method: DELETE
  - Endpoint: `/api/v1/user/mahmudswe`
  - Headers: 
      - Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJmZGUxMWIwZS00OTgyLTQ2OWItODY5NS0yM2I4NTAxMDliMTAiLCJpYXQiOjE2ODQ2MTIyNTUsImV4cCI6MTY4NDY5ODY1NX0.Ljwhe4aBmPYkp0fEp8bYCrm21VCGsIakYwW0c5zNGQw"

  **<h2>Successful Response</h2>**
  - Status Code: 200 OK
  - Body:
    ```json
    {
    "message": "User with id 98682456-6e37-4729-ba74-017d7170a9b1 has been deleted successfully"
    }
    ```

  **<h2>Error Responses</h2>**
  If the specified user is not found
  - Status Code: 404 Not Found
  - Body:
    ```json
    {
      "message": "User with id 98682456-6e37-4729-ba74-017d7170a9b1 not found"
    }
    ```
  In case the request is missing or has an invalid or expired token.
  - Status Code: 401 Unauthorized
  - Body: 
    ```json
    {
      "message": "invalid token"
    }
    ```
    OR
    ```json
    {
      "message": "invalid signature"
    }
    ```

</details>

 <h3>Blog Related Endpoints </h3>

<details>

- ### <h2>**GET /api/v1/blog** </h2>
  Retrieves a list of blogs with pagination.

  **<h2>Request</h2>**
  - Method: GET
  - Endpoint: `/api/v1/blog?page1=1&limit=2`

  **<h2>Successful Response</h2>**
  - Status Code: 200 OK
  - Content-Type: application/json
  - Body:
    ```json
    {
    "blogs": [
        {
            "blogid": "6d230cb4-ace6-48cd-a4e8-ac29cfb0137f",
            "name": "Mahmudur Rahman Sardar",
            "username": "mahmudswe",
            "title": "SUST",
            "content": "Shahjalal University of Science and Technology. It is a public university",
            "createdAt": "2023-05-21T13:33:49.000Z",
            "updatedAt": "2023-05-21T13:33:49.000Z"
        },
        {
            "blogid": "ce4b617a-a7bb-405b-9e75-1f81aed1938a",
            "name": "Mahmudur Rahman Sardar",
            "username": "mahmudswe",
            "title": "Cefalo Bangladesh",
            "content": "Cefalo is a software company based in Bangladesh that specializes in developing digital solutions for various industries.",
            "createdAt": "2023-05-21T13:15:39.000Z",
            "updatedAt": "2023-05-21T13:15:39.000Z"
        }
    ],
    "currentPage": 1,
    "totalPages": 1,
    "totalBlogs": 2
    }
    ```

- ### <h2>**POST /api/v1/blog** </h2>

  Creates a new blog.

  **<h2>Conditions for a valid blog post request</h2>**
  - Title is required and must be at most 50 characters .
  - Content is required and must be at most 1000 characters

  **<h2>Request</h2>**
  - Method: POST
  - Endpoint: `/api/v1/blog`
  - Headers: 
      - Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJmZGUxMWIwZS00OTgyLTQ2OWItODY5NS0yM2I4NTAxMDliMTAiLCJpYXQiOjE2ODQ2MTIyNTUsImV4cCI6MTY4NDY5ODY1NX0.Ljwhe4aBmPYkp0fEp8bYCrm21VCGsIakYwW0c5zNGQw"
  - Body:
    ```json
    {
      "title": "Cefalo Bangladesh",
      "content": "Cefalo is a software company based in Bangladesh that specializes in developing digital solutions for various industries."
    }
    ```

  **<h2>Successful Response</h2>**
  - Status Code: 201 Created
  - Body
    ```json
    {
      "blogid": "ce4b617a-a7bb-405b-9e75-1f81aed1938a",
      "name": "Mahmudur Rahman Sardar",
      "username": "mahmudswe",
      "title": "Cefalo Bangladesh",
      "content": "Cefalo is a software company based in Bangladesh that specializes in developing digital solutions for various industries.",
      "createdAt": "2023-05-21T13:15:39.000Z",
      "updatedAt": "2023-05-21T13:15:39.000Z"
    }

  **<h2>Error Response</h2>**
  In case the request is invalid or missing required parameters
  - Status Code: 400 Bad Request
  - Body: 
    ```json
    {
      "message": "title is required"
    }
    // content is required as well
    ```
- ### <h2>**GET /api/v1/blog/:blogid** </h2>
  Retrieves blog with blogid.

  **<h2>Request</h2>**
  - Method: GET
  - Endpoint: `/api/v1/blog/ce4b617a-a7bb-405b-9e75-1f81aed1938a`

  **<h2>Successful Response</h2>**
  - Status Code: 200 OK
  - Content-Type: application/json
  - Body:
    ```json
    {
      "blogid": "ce4b617a-a7bb-405b-9e75-1f81aed1938a",
      "name": "Mahmudur Rahman Sardar",
      "username": "mahmudswe",
      "title": "Cefalo Bangladesh",
      "content": "Cefalo is a software company based in Bangladesh that specializes in developing digital solutions for various industries.",
      "createdAt": "2023-05-21T13:15:39.000Z",
      "updatedAt": "2023-05-21T13:15:39.000Z"
    }
    ```
  **<h2>Error Response</h2>**
  If the requested blog is not found
  - Status Code: 404 Not Found
  - Body:
    ```json
    {
      "message": "blog not found"
    }
    ```
- ### <h2>**PUT /api/v1/blog/:blogid** </h2>
  Updates the blog and returns the updated blog

  **<h2>Request</h2>**
  - Method: GET
  - Endpoint: `/api/v1/blog/ce4b617a-a7bb-405b-9e75-1f81aed1938a`
  - Headers 
    - Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI3NmIzZmRlMS05YTliLTQxMmEtOGQ5OC00MTRhMmVmN2MwN2QiLCJpYXQiOjE2ODMzNzEzMTAsImV4cCI6MTY4MzM3NDkxMH0.y4KCzdXksNfLwQBbw7rJgz8eDbU849VwWGs8_UuEFWE"
  - Body: 
    ```json
    {
      "title": "Cefalo Bangladesh Ltd",
      "content": "Cefalo Bangladesh is known for their expertise in technologies such as Java, .NET, PHP, Python, and mobile app development frameworks"
    }
    ```

  **<h2>Successful Response</h2>**
  - Status Code: 200 OK
  - Content-Type: application/json
  - Body:
    ```json
    {
      "blogid": "ce4b617a-a7bb-405b-9e75-1f81aed1938a",
      "name": "Mahmudur Rahman Sardar",
      "username": "mahmudswe",
      "title": "Cefalo Bangladesh Ltd",
      "content": "Cefalo Bangladesh is known for their expertise in technologies such as Java, .NET, PHP, Python, and mobile app development frameworks",
      "createdAt": "2023-05-21T13:15:39.000Z",
      "updatedAt": "2023-05-21T14:05:01.414Z"
    }
    ```
  **<h2>Error Responses</h2>**
  If the specified blog is not found
  - Status Code: 404 Not Found
  - Body:
    ```json
    {
      "message": "Blog not found"
    }
    ```
  If user does not have permission to update the blog
  - Status Code: 403 Forbidden
  - Body:
    ```json
    {
      "message": "You are not authorized to update this blog"
    }
    ```

- ### <h2>**DELETE /api/v1/blog/:blogid** </h2>

  Deletes a blog with the specified ID.

  **<h2>Request</h2>**
  - Method: DELETE
  - Endpoint: `/api/v1/blog/2f433c6b-6fcf-48df-a11e-9615049d8b3d`
  - Headers: 
      - Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJmZGUxMWIwZS00OTgyLTQ2OWItODY5NS0yM2I4NTAxMDliMTAiLCJpYXQiOjE2ODQ2MTIyNTUsImV4cCI6MTY4NDY5ODY1NX0.Ljwhe4aBmPYkp0fEp8bYCrm21VCGsIakYwW0c5zNGQw"

  **<h2>Successful Response</h2>**
  - Status Code: 200 OK
  - Body:
    ```json
    {
      "message": "Blog successfully deleted"
    }
    ```

  **<h2>Error Responses</h2>**
  If the specified blog is not found
  - Status Code: 404 Not Found
  - Body:
    ```json
    {
      "message": "Blog not found"
    }
    ```
  If user does not have permission to delete the blog
  - Status Code: 403 Forbidden
  - Body:
    ```json
    {
      "message": "You are not authorized to delete this blog"
    }
    ```
- ### <h2>**GET /api/v1/blog/author/:username** </h2>
  Retrieves a list of blogs of a specific user with pagination.

  **<h2>Request</h2>**
  - Method: GET
  - Endpoint: `/api/v1/blog/author/mahmudswe?page=1&limit=3`

  **<h2>Successful Response</h2>**
  - Status Code: 200 OK
  - Content-Type: application/json
  - Body:
    ```json
    {
    "blogs": [
        {
            "blogid": "6d230cb4-ace6-48cd-a4e8-ac29cfb0137f",
            "name": "Mahmudur Rahman Sardar",
            "username": "mahmudswe",
            "title": "SUST",
            "content": "Shahjalal University of Science and Technology. It is a public university",
            "createdAt": "2023-05-21T13:33:49.000Z",
            "updatedAt": "2023-05-21T13:33:49.000Z"
        },
        {
            "blogid": "ce4b617a-a7bb-405b-9e75-1f81aed1938a",
            "name": "Mahmudur Rahman Sardar",
            "username": "mahmudswe",
            "title": "Cefalo Bangladesh Ltd",
            "content": "Cefalo Bangladesh is known for their expertise in technologies such as Java, .NET, PHP, Python, and mobile app development frameworks",
            "createdAt": "2023-05-21T13:15:39.000Z",
            "updatedAt": "2023-05-21T14:05:01.000Z"
        }
    ],
    "currentPage": 1,
    "totalPages": 1,
    "totalBlogs": 2
    }
    ```
  **<h2>Error Responses</h2>**
  If the specified author is not found
  - Status Code: 404 Not Found
  - Body:
    ```json
    {
      "message": "User not found"
    }
    ```
</details>
