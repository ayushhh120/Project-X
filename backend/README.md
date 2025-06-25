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

---

# /captains/register Endpoint Documentation

## Description
The `/captains/register` endpoint allows new captains to register. It validates the provided data and, on success, returns a token along with the captain object.

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
  "password": "string (min. 6 characters)",
  "vehicle": {
    "color": "string (min. 3 characters)",
    "plate": "string (min. 3 characters)",
    "capacity": 3,
    "vehicleType": "car"
  }
}
```

## Responses

### Success
- **Status Code:** 201 Created  
- **Body:**  
```json
{
  "token": "authentication token",
  "captain": {
    "_id": "60ad0cedf8d1f80015ecd9ac",
    "fullname": {
      "firstname": "Ayush",
      "lastname": "Dwivedi"
    },
    "email": "ayush@gmail.com",
    "vehicle": {
      "color": "blue",
      "plate": "UP 32 AS 8484",
      "capacity": 3,
      "vehicleType": "car"
    },
    "status": "inactive"
    // ...other fields
  }
}
```

### Error
- **Status Code:** 400 Bad Request  
- **Body:**  
```json
{
  "errors": [
    {
      "type": "field",
      "msg": "Capacity must be a number",
      "path": "vehicle.capacity",
      "location": "body"
    }
  ]
}
```
or
```json
{
  "message": "Captain already exists"
}
```

---

# /captains/login Endpoint Documentation

## Description
The `/captains/login` endpoint allows existing captains to log in by validating their credentials. On success, it returns an authentication token and the captain object.

## Method
**POST**

## Request Body
The endpoint expects a JSON payload with the following structure:
```json
{
  "email": "string, required, valid email address",
  "password": "string, required, min. 6 characters"
}
```

## Responses

### Success
- **Status Code:** 200 OK  
- **Body:**  
```json
{
  "token": "authentication token",
  "captain": {
    "_id": "60ad0cedf8d1f80015ecd9ac",
    "fullname": {
      "firstname": "Ayush", // string, min. 3 characters
      "lastname": "Dwivedi" // string, optional, min. 3 characters
    },
    "email": "ayush@gmail.com", // string, valid email
    "vehicle": {
      "color": "blue", // string, min. 3 characters
      "plate": "UP 32 AS 8484", // string, min. 3 characters
      "capacity": 3, // number
      "vehicleType": "car" // string, min. 3 characters
    },
    "status": "inactive"
    // ...other fields
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
or
```json
{
  "message": "Invalid email or password"
}
```

---

# /captains/profile Endpoint Documentation

## Description
The `/captains/profile` endpoint retrieves the authenticated captain's profile information. Requires authentication.

## Method
**GET**

## Headers
```
Authorization: Bearer <token>
```

### Success
- **Status Code:** 200 OK
- **Body:**
```json
{
  "captain": {
    "_id": "60ad0cedf8d1f80015ecd9ac",
    "fullname": {
      "firstname": "Ayush", // string, min. 3 characters
      "lastname": "Dwivedi" // string, optional, min. 3 characters
    },
    "email": "ayush@gmail.com", // string, valid email
    "vehicle": {
      "color": "blue", // string, min. 3 characters
      "plate": "UP 32 AS 8484", // string, min. 3 characters
      "capacity": 3, // number
      "vehicleType": "car" // string, min. 3 characters
    },
    "status": "inactive"
    // ...other fields
  }
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

# /captains/logout Endpoint Documentation

## Description
The `/captains/logout` endpoint logs out the current captain by clearing their authentication token and blacklisting it. Requires authentication.

## Method
**GET**

## Headers
```
Authorization: Bearer <token>
```

### Success
- **Status Code:** 200 OK
- **Body:**
```json
{
  "message": "Logged out successfully"
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

# /rides/get-fare Endpoint Documentation

## Description
The `/rides/get-fare` endpoint calculates and returns the estimated fare for a ride based on the provided pickup and destination locations. Requires authentication.

## Method
**GET**

## Headers
```
Authorization: Bearer <token>
```

## Query Parameters
- `pickup`: `string` (required, min. 3 characters) — The pickup location address.
- `destination`: `string` (required, min. 3 characters) — The destination address.

### Example Request
```
GET /rides/get-fare?pickup=Lucknow%20Station&destination=Hazratganj
Authorization: Bearer <token>
```

## Responses

### Success
- **Status Code:** 200 OK  
- **Body:**  
```json
{
  "auto": 54.5,
  "car": 82.25,
  "motorcycle": 41.75
}
```
*(The values are examples; actual fare depends on distance and duration.)*

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
- **Status Code:** 500 Internal Server Error  
- **Body:**  
```json
{
  "message": "Internal Server Error"
}
```

