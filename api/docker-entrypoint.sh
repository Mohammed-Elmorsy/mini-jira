#!/bin/sh

# Wait for database to be ready
echo "Waiting for database to be ready..."
sleep 5

# Run migrations
echo "Running database migrations..."
npx prisma migrate deploy

# Generate Prisma Client
echo "Generating Prisma Client..."
npx prisma generate

# Start the application
echo "Starting the application..."
npm run start:prod