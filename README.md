# 📝 Mini Jira

A **full-stack task management application** inspired by Jira.  
Built with **NestJS, Prisma, PostgreSQL, React, TypeScript, TailwindCSS**, and **Docker**.  
It allows users to **register, log in, and manage tasks** (To Do, In Progress, Done) in a kanban-style UI.

---

## 🚀 Tech Stack

### Backend (API)

- [NestJS](https://nestjs.com/) — Node.js framework
- [Prisma](https://www.prisma.io/) — ORM for PostgreSQL
- [PostgreSQL](https://www.postgresql.org/) — database
- [Passport.js + JWT](http://www.passportjs.org/) — authentication
- [Swagger](https://swagger.io/) — API documentation
- [Docker](https://www.docker.com/) — containerized database

### Frontend (Web)

- [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Query](https://tanstack.com/query/latest) — API caching & data fetching
- [TailwindCSS](https://tailwindcss.com/) — styling
- [react-router-dom](https://reactrouter.com/) — routing
- [react-hot-toast](https://react-hot-toast.com/) — notifications

---

## 🛠️ Getting Started

### 📌 Backend (API)

1. Navigate to the backend folder:

   ```
   cd api
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create environment files (.env, .env.development, enter values you want):

   ```
   PORT=3000
   DATABASE_PORT=5432
   DATABASE_USER=postgres
   DATABASE_PASSWORD=postgres
   DATABASE_HOST=localhost
   DATABASE_NAME=mini_jira
   DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=public
   JWT_SECRET=supersecret
   JWT_EXPIRATION=20m
   ```

4. Start PostgreSQL using Docker:

   ```
   docker-compose up -d
   ```

5. Run Prisma migrations and generate the client:

   ```
   npx prisma migrate dev
   npx prisma generate
   ```

6. Run the app in development mode:

   ```
   npm run start:dev
   ```

7. Open Swagger docs in the browser:
   ```
   http://localhost:3000/swagger
   ```

### Frontend (Web)

1. Navigate to the frontend folder:

   ```
   cd web
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm run dev
   ```

4. Open the app in the browser:

   ```
   http://localhost:5173
   ```
