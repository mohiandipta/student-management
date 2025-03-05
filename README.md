# Student Management System

## Features
- Manage Institutes, Students, Courses, and Results.
- User authentication with JWT.
- Optimized database queries using indexes.
- GraphQL-based API for efficient data retrieval.

## Technologies Used
- **Backend:** Node.js
- **Database:** PostgreSQL, Sequelize ORM
- **Authentication:** JWT (JSON Web Token)
- **API:** GraphQL
- **Containerization:** Docker (Optional)

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16)
- PostgreSQL (>= 13)
- Docker (optional, for containerized deployment)

### Steps to Set Up the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/student-management-system.git
   cd student-management-system
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Create a `.env` file and configure the database connection:
   ```env
   # Database configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=institute_management
   DB_USER=postgres
   DB_PASSWORD=postgres
   
   # Server configuration
   SERVER_PORT=4000
   
   # JWT Secret
   JWT_SECRET=your_jwt_secret_key_should_be_long_and_complex
   JWT_EXPIRES_IN=1d
   ```
4. Run database migrations and seed data:
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all or npm run seed-up

   For seed down ---> npm run seed-down
   ```
5. Start the server:
   ```bash
   npm run start
   ```

## Database Schema
### Tables
- **Institutes** (id, name, createdAt, updatedAt)
- **Courses** (id, title, instituteId, createdAt, updatedAt)
- **Students** (id, name, instituteId, createdAt, updatedAt)
- **Results** (id, studentId, courseId, grade, createdAt, updatedAt)
- **Users** (id, username, email, password, createdAt, updatedAt)

## API Documentation
### Queries
#### Get all Institutes
```graphql
query {
  institutes {
    id
    name
  }
}
```
#### Get all Students
```graphql
query {
  students {
    id
    name
    institute {
      id
      name
    }
  }
}
```

### Mutations
#### Create Institute
```graphql
mutation {
  createInstitute(name: "Tech University") {
    id
    name
  }
}
```
#### Register User
```graphql
mutation {
  register(username: "admin", email: "admin@example.com", password: "securepassword")
}
```

## Performance Optimization
- Indexes added to optimize queries:
```sql
CREATE INDEX idx_students_institute ON Students(instituteId);
CREATE INDEX idx_courses_institute ON Courses(instituteId);
CREATE INDEX idx_results_student ON Results(studentId);
CREATE INDEX idx_results_course ON Results(courseId);
```

