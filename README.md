# School Management API

This project is built for the Node.js assignment using:

- Node.js
- Express.js
- MySQL

It provides two APIs:

- `POST /addSchool` to add a new school
- `GET /listSchools?latitude=...&longitude=...` to fetch schools sorted by distance

## Project Structure

```text
src/
  config/
    db.js
  controllers/
    schoolController.js
  routes/
    schoolRoutes.js
  utils/
    distance.js
    validators.js
  app.js
  server.js
database/
  schema.sql
postman/
  School-Management-API.postman_collection.json
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root.

Example:

```env
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=school_management
```

3. Create the MySQL database and table using:

```sql
SOURCE database/schema.sql;
```

Or copy and run the SQL manually in MySQL Workbench.

4. Start the server:

```bash
npm run dev
```

Server runs on:

```text
http://localhost:5000
```

## Deployment

This project is ready to be deployed on any Node.js hosting platform that supports:

- Node.js runtime
- Environment variables
- Access to a MySQL database

For submission, you can deploy the API and then update the Postman collection `baseUrl` from `http://localhost:5000` to your live URL.

## API Details

### 1. Add School

- Method: `POST`
- Endpoint: `/addSchool`

Sample request body:

```json
{
  "name": "Green Valley School",
  "address": "Sector 10, Noida",
  "latitude": 28.5902,
  "longitude": 77.3267
}
```

Sample success response:

```json
{
  "success": true,
  "message": "School added successfully",
  "data": {
    "id": 1,
    "name": "Green Valley School",
    "address": "Sector 10, Noida",
    "latitude": 28.5902,
    "longitude": 77.3267
  }
}
```

### 2. List Schools

- Method: `GET`
- Endpoint: `/listSchools`
- Query params: `latitude`, `longitude`

Example:

```text
/listSchools?latitude=28.6139&longitude=77.2090
```

Sample success response:

```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "id": 1,
      "name": "Green Valley School",
      "address": "Sector 10, Noida",
      "latitude": 28.5902,
      "longitude": 77.3267,
      "distance": 11.96
    }
  ]
}
```

## Validation Rules

- `name` must be a non-empty string
- `address` must be a non-empty string
- `latitude` must be a valid number between `-90` and `90`
- `longitude` must be a valid number between `-180` and `180`

## Notes

- Distance is calculated using the Haversine formula.
- Schools are returned in ascending order of proximity to the user location.
- The Postman collection is available in the `postman` folder and includes example requests and sample responses.
