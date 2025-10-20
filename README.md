# 📝 Mini Jira

A **full-stack task management application** inspired by Jira.  
Built with **NestJS, Prisma, PostgreSQL, React, TypeScript, TailwindCSS**, and **Docker**.  
It allows users to **register, log in, and manage tasks** in a kanban-style UI.

---

## 🚀 Tech Stack

### Backend (API)

- [NestJS](https://nestjs.com/) — Node.js framework
- [Prisma](https://www.prisma.io/) — ORM for PostgreSQL
- [PostgreSQL](https://www.postgresql.org/) — database
- [Passport.js + JWT](http://www.passportjs.org/) — authentication
- [Swagger](https://swagger.io/) — API documentation
- [Docker](https://www.docker.com/) — containerization & orchestration
- [Adminer](https://www.adminer.org/) — database management

### Frontend (Web)

- [React](https://react.dev/) with [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Query](https://tanstack.com/query/latest) — API caching & data fetching
- [TailwindCSS](https://tailwindcss.com/) — styling
- [react-router-dom](https://reactrouter.com/) — routing
- [react-hot-toast](https://react-hot-toast.com/) — notifications
- [Nginx](https://nginx.org/) — web server & reverse proxy

---

## 🛠️ Getting Started

### � Using Docker (Recommended)

1. Create environment files in the `api` folder (`.env.production` for production, `.env.development` for development, `.env.staging` for staging):

   ```env
   PORT=3000
   DATABASE_PORT=5432
   DATABASE_USER=your_username
   DATABASE_PASSWORD=your_password
   DATABASE_HOST=db
   DATABASE_NAME=mini_jira
   DATABASE_URL=postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}?schema=public
   JWT_SECRET=your_secret
   JWT_EXPIRATION=20m
   ```

2. Create a `.env` file into the root dir besides docker-compose files and copy your desired env variables into it (`.env.development`|`.env.staging`|`.env.production`).

3. Start the application:

   ```bash
   # For production
   docker-compose up -d

   # For development
   docker-compose -f docker-compose.dev.yml up -d

   # For staging
   docker-compose -f docker-compose.staging.yml up -d
   ```

4. Access the application:
   - Frontend: http://localhost:80 (production), http://localhost (dev/staging)
   - API & Swagger docs: http://localhost:3000/swagger
   - Database management (Adminer): http://localhost:8080
     - System: PostgreSQL
     - Server: db
     - Username: (from DATABASE_USER)
     - Password: (from DATABASE_PASSWORD)
     - Database: (from DATABASE_NAME)

### 📌 Manual Setup (Development)

If you prefer to run the applications directly on your machine:

1. Navigate to the backend folder and install dependencies:

   ```bash
   cd api && npm install
   ```

2. Set up your environment variables as shown in step 1 above (use `localhost` for DATABASE_HOST)

3. Start the database:

   ```bash
   docker-compose -f docker-compose.dev.yml up -d db
   ```

4. Run migrations and start the API:

   ```bash
   npx prisma migrate dev
   npx prisma generate
   npm run start:dev
   ```

5. In a new terminal, navigate to the frontend folder and start the development server:
   ```bash
   cd web
   npm install
   npm run dev
   ```

The app will be available at http://localhost:5173
