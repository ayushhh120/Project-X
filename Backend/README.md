# /users/register Endpoint Documentation

## Description
The `/users/register` endpoint allows new users to register. It validates the provided data and, on success, returns a token along with the user object.

## Method
**POST**

## Request Body
The endpoint expects a JSON payload with the following structure:

```json
{
  "fullname": {
    "firstname": "string (min. 3 characters)",
    "lastname": "string (optional, min. 3 characters)"
  },
  "email": "valid email address (min. 5 characters)",
  "password": "string (min. 6 characters)"
}
```

## Responses


### Success
- **Status Code:** 201 Created  
- **Body:**  
```json
{
  "token": "authentication token",
  "user": {
    // ...user data excluding sensitive information
  }
}
```

### Example Success Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60ad0cedf8d1f80015ecd9ab",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error
- **Status Code:** 400 Bad Request  
- **Body:**  
```json
{
  "errors": [
    // list of validation errors if request data is invalid
  ]
}
```

---

# /users/login Endpoint Documentation

## Description
The `/users/login` endpoint allows existing users to log in by validating their credentials. On success, it returns an authentication token and the user object.

## Method
**POST**

## Request Body
The endpoint expects a JSON payload with the following structure:

```json
{
  "email": "valid email address",
  "password": "string (min. 6 characters)"
}
```

## Responses

### Success
- **Status Code:** 200 OK  
- **Body:**  
```json
{
  "token": "authentication token",
  "user": {
    // ...user data excluding sensitive information
  }
}
```

### Example Success Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60ad0cedf8d1f80015ecd9ab",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Error
- **Status Code:** 400 Bad Request  
- **Body:**  
```json
{
  "errors": [
    // list of validation errors if request data is invalid
  ]
}
```

- **Status Code:** 401 Unauthorized  
- **Body:**  
```json
{
  "message": "Invalid email or password"
}
```

---

# /users/profile Endpoint Documentation

## Description
The `/users/profile` endpoint retrieves the authenticated user's profile information. Requires authentication.

## Method
**GET**

## Headers
```
Authorization: Bearer <token>
```

### Example Success Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60ad0cedf8d1f80015ecd9ab",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Success
- **Status Code:** 200 OK
- **Body:**
```json
{
  "id": "60ad0cedf8d1f80015ecd9ab",
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com"
}
```

### Error
- **Status Code:** 401 Unauthorized
- **Body:**
```json
{
  "message": "Authentication required"
}
```

---

# /users/logout Endpoint Documentation

## Description
The `/users/logout` endpoint logs out the current user by clearing their authentication token and blacklisting it. Requires authentication.

## Method
**GET**

## Headers
```
Authorization: Bearer <token>
```

### Example Success Response
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "60ad0cedf8d1f80015ecd9ab",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  }
}
```

### Success
- **Status Code:** 200 OK
- **Body:**
```json
{
  "message": "User logged out successfully"
}
```

### Error
- **Status Code:** 401 Unauthorized
- **Body:**
```json
{
  "message": "Authentication required"
}
```
