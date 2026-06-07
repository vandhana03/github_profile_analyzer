# GitHub Profile Analyzer API

A RESTful backend service built with Node.js, Express.js, and MySQL that analyzes GitHub user profiles using the GitHub Public API and stores useful insights in a database.

## Features

- Fetch GitHub user profile data using a username
- Store profile analysis results in MySQL
- Calculate and store additional insights:
  - Public repository count
  - Followers count
  - Following count
  - Total stars across repositories
  - Most starred repository
  - Top repository star count
- Fetch all analyzed profiles
- Fetch a single analyzed profile
- Pagination support for profile listing
- Prevent duplicate profile entries by updating existing records

## Tech Stack

- Node.js
- Express.js
- MySQL
- Axios
- GitHub REST API
- Railway (Database Hosting)
- Render (API Deployment)

---

## Project Structure

```text
github-profile-analyzer/
│
├── src/
│   ├── config/
│   │   └── db.js
│   │
│   ├── controllers/
│   │   └── profileControllers.js
│   │
│   ├── models/
│   │   └── profileModels.js
│   │
│   ├── routes/
│   │   └── profileRoutes.js
│   │
│   ├── services/
│   │   └── githubService.js
│   │
│   └── server.js
│
├── schema.sql
├── .env.example
├── package.json
├── README.md
└── github-profile-analyzer.postman_collection.json
```

---

## Installation

### Clone Repository

```bash
git clone <repository-url>
cd github-profile-analyzer
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory.

Example:

```env
PORT=5000

DB_HOST=your_host
DB_PORT=3306
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database
```

### Create Database Table

Run the SQL script from `schema.sql`.

### Start Server

Development:

```bash
npm run dev
```

Production:

```bash
npm start
```

---

## Database Schema

```sql
CREATE TABLE github_profiles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255),
  public_repos INT,
  followers INT,
  following INT,
  profile_url VARCHAR(255),
  account_created_at DATETIME,
  total_stars INT DEFAULT 0,
  top_repository VARCHAR(255),
  top_repository_stars INT DEFAULT 0,
  analyzed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints

### Analyze a GitHub Profile

Fetches profile data from GitHub, generates insights, and stores them in the database.

```http
GET /api/profiles/analyze/:username
```

Example:

```http
GET /api/profiles/analyze/octocat
```

Response:

```json
{
  "message": "Profile analyzed and stored successfully",
  "data": {
    "username": "octocat",
    "followers": 19000,
    "publicRepos": 8,
    "totalStars": 120
  }
}
```

---

### Get All Profiles

```http
GET /api/profiles
```

---

### Get Profiles with Pagination

```http
GET /api/profiles?page=1&limit=5
```

Response:

```json
{
  "page": 1,
  "limit": 5,
  "total": 10,
  "totalPages": 2,
  "profiles": []
}
```

---

### Get Single Profile

```http
GET /api/profiles/:username
```

Example:

```http
GET /api/profiles/octocat
```

---

## Insights Generated

For each GitHub user, the application stores:

- Username
- Name
- Public Repositories
- Followers
- Following
- Profile URL
- Account Creation Date
- Total Stars Across Repositories
- Most Starred Repository
- Most Starred Repository Star Count

---

## Error Handling

### User Not Found

```json
{
  "message": "GitHub user not found"
}
```

### Profile Not Found

```json
{
  "message": "Profile not found"
}
```

---

## Deployment

### Live API

```text
<your-render-url>
```

### Source Code Repository

```text
<your-github-repository-url>
```

---

## Postman Collection

The Postman collection is included in the repository:

```text
github-profile-analyzer.postman_collection.json
```

---

## Future Improvements

- GitHub API authentication using personal access tokens
- Repository language analysis
- Most used programming languages
- Profile search and filtering
- Swagger API documentation
- Rate limiting and caching

---

## Author

Vandhana Mulguri
