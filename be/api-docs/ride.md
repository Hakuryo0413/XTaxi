# Ride APIs Documentation

`@baseUrl = http://localhost:3000/ride`

---

## Create a New Ride

`POST {{baseUrl}}/`

### Request

**Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "user_id": "6741c9c5cbbb62a720962151",
  "pickup_location": {
    "address": "123 Pickup Street",
    "lat": 40.7128,
    "lng": -74.006
  },
  "dropoff_location": {
    "address": "456 Dropoff Avenue",
    "lat": 40.73061,
    "lng": -73.935242
  },
  "distance": 10.5,
  "start_time": "2024-12-01T08:00:00Z"
}
```

**Parameters:**

- `user_id` (string, required): Unique identifier for the user requesting the ride
- `pickup_location` (object, required): Details of the pickup location
  - `address` (string): Street address of pickup location
  - `lat` (number): Latitude of pickup location
  - `lng` (number): Longitude of pickup location
- `dropoff_location` (object, required): Details of the dropoff location
  - `address` (string): Street address of dropoff location
  - `lat` (number): Latitude of dropoff location
  - `lng` (number): Longitude of dropoff location
- `distance` (number, required): Ride distance in miles or kilometers
- `start_time` (string, optional): Proposed start time of the ride in ISO 8601 format

### Responses

**Success Response:**

- **Code:** 201 Created
- **Content:**

```json
{
  "success": true,
  "message": "Ride created successfully",
  "ride": {
    "ride_id": "674c62a04cb8d68a1843030f",
    "user_id": "6741c9c5cbbb62a720962151",
    "pickup_location": {
      "address": "123 Pickup Street",
      "lat": 40.7128,
      "lng": -74.006
    },
    "dropoff_location": {
      "address": "456 Dropoff Avenue",
      "lat": 40.73061,
      "lng": -73.935242
    },
    "distance": 10.5,
    "start_time": "2024-12-01T08:00:00Z",
    "fare": 25.5,
    "status": "created"
  }
}
```

**Error Responses:**

- **Code:** 400 Bad Request

```json
{
  "success": false,
  "message": "All fields (user_id, pickup_location, dropoff_location, distance) are required."
}
```

- **Code:** 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error."
}
```

---

## Update Ride Status

`PUT {{baseUrl}}`

### Request

**Headers:**

- `Content-Type: application/json`

**Request Body:**

```json
{
  "ride_id": "674c62a04cb8d68a1843030f",
  "driver_id": "673c03f5b77ab9ce05b33b0f",
  "status": "accepted"
}
```

**Parameters:**

- `ride_id` (string, required): Unique identifier of the ride
- `driver_id` (string, required): Unique identifier of the driver
- `status` (string, required): New status of the ride
  - Possible values: `created`, `pending`, `accepted`, `in_progress`, `completed`, `cancelled`

### Responses

**Success Response:**

- **Code:** 200 OK
- **Content:**

```json
{
  "success": true,
  "message": "Ride status updated successfully",
  "ride": {
    "ride_id": "674c62a04cb8d68a1843030f",
    "status": "accepted",
    "driver_id": "673c03f5b77ab9ce05b33b0f",
    "updated_at": "2024-02-15T10:30:45Z"
  }
}
```

**Error Responses:**

- **Code:** 400 Bad Request

```json
{
  "success": false,
  "message": "Invalid ride status or missing required fields."
}
```

- **Code:** 404 Not Found

```json
{
  "success": false,
  "message": "Ride not found."
}
```

- **Code:** 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error."
}
```

---

## Get Requested Rides

`GET {{baseUrl}}/requested`

### Request

**Headers:**

- `Content-Type: application/json`

**Query Parameters:**

- `driver_id` (string, optional): Filter rides for a specific driver
- `status` (string, optional): Filter rides by specific status
  - Possible values: `created`, `pending`, `accepted`, `in_progress`

### Responses

**Success Response:**

- **Code:** 200 OK
- **Content:**

```json
{
  "success": true,
  "total_rides": 1,
  "rides": [
    {
      "ride_id": "674c62a04cb8d68a1843030f",
      "user_id": "6741c9c5cbbb62a720962151",
      "pickup_location": {
        "address": "123 Pickup Street",
        "lat": 40.7128,
        "lng": -74.006
      },
      "dropoff_location": {
        "address": "456 Dropoff Avenue",
        "lat": 40.73061,
        "lng": -73.935242
      },
      "distance": 10.5,
      "start_time": "2024-12-01T08:00:00Z",
      "fare": 25.5,
      "status": "pending",
      "created_at": "2024-02-15T10:25:30Z"
    }
  ]
}
```

**Error Responses:**

- **Code:** 400 Bad Request

```json
{
  "success": false,
  "message": "Invalid query parameters."
}
```

- **Code:** 404 Not Found

```json
{
  "success": false,
  "message": "No rides found matching the specified criteria."
}
```

- **Code:** 500 Internal Server Error

```json
{
  "success": false,
  "message": "Internal server error."
}
```

## Get Ride by ID

`GET {{baseUrl}}/{ride_id}`

### Request

**Headers:**

- `Content-Type: application/json`

**Parameters:**

- `ride_id` (string, required): Unique identifier of the ride

### Example Request

```http
GET http://localhost:3000/ride/674c62a04cb8d68a1843030f
```

### Example Response

```json
{
  "ride_id": "674c62a04cb8d68a1843030f",
  "user_id": "6741c9c5cbbb62a720962151",
  "pickup_location": {
    "address": "123 Pickup Street",
    "lat": 40.7128,
    "lng": -74.006
  },
  "dropoff_location": {
    "address": "456 Dropoff Avenue",
    "lat": 40.73061,
    "lng": -73.935242
  },
  "distance": 10.5,
  "start_time": "2024-12-01T08:00:00Z",
  "status": "requested",
  "fare": 155,
  "created_at": "2024-12-01T13:25:24.772Z",
  "updated_at": "2024-12-01T13:25:24.772Z"
}
```

## Notes on Ride Statuses

- `created`: Ride has been initially created by the user
- `pending`: Ride is awaiting driver assignment
- `accepted`: Driver has accepted the ride
- `in_progress`: Ride is currently ongoing
- `completed`: Ride has been successfully finished
- `cancelled`: Ride has been cancelled by user or driver
