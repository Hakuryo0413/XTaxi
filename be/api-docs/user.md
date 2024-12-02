# Drivers APIs Documentation

`@baseUrl = http://localhost:3000/users`

## Get All Users 
`GET {{baseUrl}}/all`

### Request
**Query Parameters:**
- `role` (string, optional): Filter users by role
  - Allowed values: `admin`, `user`, `driver`

### Responses

**Success Response:** 
- **Code:** 200 OK
- **Content:** 
```json
{
  "success": true,
  "data": [
    {
      "_id": "6741c9c5cbbb62a720962151",
      "username": "johndoe",
      "email": "john@example.com",
      "role": "driver",
      "vehicle_info": {
        "make": "Toyota",
        "model": "Camry",
        "year": 2020,
        "license_plate": "ABC123"
      }
    }
  ],
  "message": "Users with role driver fetched successfully"
}
```

**Error Responses:**
- **Code:** 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid role. Valid roles are: admin, user, driver"
}
```

- **Code:** 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

### Notes
- Requires authentication
- Accessible only to admin users
- Returns all users without passwords
- Optional `role` query parameter for filtering
- Includes populated vehicle information