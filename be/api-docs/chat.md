@baseUrl = http://localhost:3000/chat

# Chat APIs Documentation

---

## Create or Get Chat
`POST {{baseUrl}}/`

### Request
**Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "user_id": "6741c9c5cbbb62a720962151",
  "driver_id": "673c03f5b77ab9ce05b33b0f"
}
```

**Parameters:**
- `user_id` (string, required): Unique identifier for the user
- `driver_id` (string, required): Unique identifier for the driver

### Responses

**Success Response:**
- **Code:** 200 OK
- **Content:** 
```json
{
  "success": true,
  "chat": {
    "_id": "674c6577f9c13e7cdc11a19b",
    "user_id": "6741c9c5cbbb62a720962151",
    "driver_id": "673c03f5b77ab9ce05b33b0f",
    "last_message": null,
    "created_at": "2024-02-15T10:30:45Z",
    "__v": 0
  }
}
```

**Error Responses:**
- **Code:** 400 Bad Request
```json
{
  "success": false,
  "message": "user_id and driver_id are required."
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

## Send a Message
`POST {{baseUrl}}/message`

### Request
**Headers:**
- `Content-Type: application/json`

**Request Body:**
```json
{
  "chat_id": "674c6577f9c13e7cdc11a19b",
  "sender_id": "6741c9c5cbbb62a720962151",
  "content": "bao gio ban den"
}
```

**Parameters:**
- `chat_id` (string, required): Unique identifier of the chat
- `sender_id` (string, required): Unique identifier of the message sender
- `content` (string, required): Message content

### Responses

**Success Response:**
- **Code:** 200 OK
- **Content:**
```json
{
  "success": true,
  "message": "Message sent successfully.",
  "data": {
    "_id": "675d7688g0d24f8dde22b20c",
    "chat_id": "674c6577f9c13e7cdc11a19b",
    "sender_id": "6741c9c5cbbb62a720962151",
    "content": "bao gio ban den",
    "created_at": "2024-02-15T10:35:22Z",
    "__v": 0
  }
}
```

**Error Responses:**
- **Code:** 400 Bad Request
```json
{
  "success": false,
  "message": "chat_id, sender_id, and content are required."
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

## Retrieve Chat Messages
`GET {{baseUrl}}/{chat_id}/messages`

### Request
**Headers:**
- `Content-Type: application/json`

**Path Parameters:**
- `chat_id` (string, required): Unique identifier of the chat

### Responses

**Success Response:**
- **Code:** 200 OK
- **Content:**
```json
{
  "success": true,
  "messages": [
    {
      "_id": "675d7688g0d24f8dde22b20c",
      "chat_id": "674c6577f9c13e7cdc11a19b",
      "sender_id": "6741c9c5cbbb62a720962151",
      "content": "bao gio ban den",
      "created_at": "2024-02-15T10:35:22Z",
      "__v": 0
    },
    {
      "_id": "675d7689h1e35g9ef33c31d",
      "chat_id": "674c6577f9c13e7cdc11a19b",
      "sender_id": "673c03f5b77ab9ce05b33b0f",
      "content": "Toi se den sau 10 phut nua",
      "created_at": "2024-02-15T10:40:15Z",
      "__v": 0
    }
  ]
}
```

**Error Responses:**
- **Code:** 400 Bad Request
```json
{
  "success": false,
  "message": "chat_id is required."
}
```
- **Code:** 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error."
}
```

## Notes
- All responses follow a consistent structure with `success` boolean and either `chat`, `data`, or `messages` field
- Error responses include a `success: false` flag and descriptive `message`
- Timestamps use ISO 8601 format
- Additional Mongoose-specific fields like `_id` and `__v` are included in the responses