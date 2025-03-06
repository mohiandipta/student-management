# Student Management System

## Features
- Manage Institutes, Students, Courses, and Results.
- User authentication with JWT.
- Optimized database queries using indexes.
- GraphQL-based API for efficient data retrieval.
- ER Diagram also provided in root path
- Commitizen added

- Deployed on AWS EC2 instance using terraform and docker
   ```bash
   http://3.147.6.58:4000/graphql
   ```

## Technologies Used
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL, Sequelize ORM
- **Authentication:** JWT (JSON Web Token)
- **API:** GraphQL, Apollo Server
- **Containerization:** Docker

## Installation
### Prerequisites
Ensure you have the following installed:
- Node.js (>= 16)
- PostgreSQL (>= 13)
- Docker (optional, for containerized deployment)

### Steps to Set Up the Project
1. Clone the repository:
   ```bash
   git clone https://github.com/mohiandipta/student-management.git
   cd student-management
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
6. Hit on the browser at:
   ```bash
   http://localhost:4000/graphql
   ```

## Database Schema
### Tables
- **Institutes** (id, name, createdAt, updatedAt)
- **Courses** (id, title, instituteId, createdAt, updatedAt)
- **Students** (id, name, instituteId, courseId, createdAt, updatedAt)
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
#### Get all Courses
```graphql
query Courses {
  courses {
    id
    title
  }
}
```
#### Get all ResultsByInstitute
```graphql
query ResultsByInstitute($instituteId: ID!) {
  resultsByInstitute(instituteId: $instituteId) {
    institute {
      id
      name
    }
    students {
      results {
        id
        grade
        course {
          id
          title
        }
      }
      student {
        id
        name
      }
    }
  }
}
```
#### Get all TopCoursesByYear
```graphql
query TopCoursesByYear($year: Int!) {
  topCoursesByYear(year: $year) {
    course {
      id
      title
      institute {
        id
        name
      }
    }
    enrollmentCount
  }
}
```
#### Get all TopCoursesByYear
```graphql
query TopRangkingStudents($limit: Int!) {
  topRangkingStudents(limit: $limit) {
    student {
      id
      name
      institute {
        id
        name
      }
    }
    totalMarks
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
#### Create Course
```graphql
mutation CreateCourse($title: String!, $instituteId: ID!) {
  createCourse(title: $title, instituteId: $instituteId) {
    id
    title
    institute {
      id
      name
    }
  }
}
```
#### Create Result
```graphql
mutation CreateResult($studentId: ID!, $courseId: ID!, $grade: String!) {
  createResult(studentId: $studentId, courseId: $courseId, grade: $grade) {
    id
    grade
    student {
      id
      name
      institute {
        id
        name
      }
    }
    course {
      id
      title
      institute {
        id
        name
      }
    }
  }
}
```
#### Create Student
```graphql
mutation CreateStudent($name: String!, $instituteId: ID!) {
  createStudent(name: $name, instituteId: $instituteId) {
    id
    name
    institute {
      id
      name
    }
  }
}
```
#### Register User
```graphql
mutation {
  register(username: "admin", email: "admin@example.com", password: "securepassword")
}
```
#### Login User
```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
    user {
      id
      email
      username
    }
  }
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

