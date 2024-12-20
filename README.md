# Blogging Platform Backend

## Overview
Building a backend system for a blogging platform that allows users to carry out CRUD operations on their blogs is the goal of this project. Two different roles are supported by the platform:

- **Admin:** Admin can Manages users and their blogs with special permissions.
- **User:** User can create, update, and delete their own blogs.

The system offers a public API for browsing blogs with search, sorting, and filtering features, secure login, and role-based access management.

## Feather

## User Roles

- **Admin:**
    - Created manually using preset credentials in the database.
    - Can delete any blog or block any users.
    - Cannot edit any blogs.
- **User:**
    - Can register and log in.
    - Create, update, get all blogs and delete their own blogs.
    - Cannot access admin-level actions

## Authentication and Authorization

- **Authentication:**
    - **JWT**-based token system secure login.
- **Authorization:**
    - Divided between Admin and User roles.
    - Protects resources using role-based access.

## Blog Management

- CRUD operations for user-created blogs.
- Admin can delete any blog and block any users.

## Public API
- Public endpoints to view blogs with:
    - You can search by content or title.
    - Sort by title, creation date, etc.
    - Filter by author or publication status.
    - Large datasets can benefit from pagination.

## Technologies Used

- **Programming Language:** TypeScript
- **Framework:** Node.js with Express.js
- **Database:** MongoDB using Mongoose
- **Validation:** Zod for data validation
- **Authentication:** JSON Web Tokens (JWT)

## Setup Installation

### 1. Clone the Repository

```bash
git clone https://github.com/Moniruzzaman2525/L-2-assignment-3.git

cd L-2-assignment-3

npm install
```
### 2. .env file

Provide the `PORT`, `DATABASE_URL`, `BCRYPT_SALT_ROUNDS`, `NODE_ENV`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `JWT_ACCESS_EXPIRES_IN` and `JWT_REFRESH_EXPIRES_IN` inside the `.env` file.

### 3. Start the Server

```bash
npm run start:dev
```
To start the production mode:

```bash
npm run start:prod
```

format code:

```bash
npm run format
```

Automatically fix linting:

```bash
npm run lint:fix
```

## API Endpoints

1. Register User: `POST` `/api/auth/register`
2. Login User: `POST` `/api/auth/login`
3. Create Blog: `POST` `/api/blogs`
4. Update Blog: `PATCH` `/api/blogs/:id`
5. Delete Blog: `DELETE` `/api/blogs/:id`
6. Get All Blogs (Public): `GET` `/api/blogs`
7. Block User: `PATCH` `/api/admin/users/:userId/block`
8. Delete Blog: `GET` `/api/admin/blogs/:id`

## Contact

For any questions or support, please reach out to: [web.moniruzzaman1@gmail.com]