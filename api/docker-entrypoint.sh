#!/bin/sh
set -e

echo "🔔 API entrypoint started (NODE_ENV=${NODE_ENV:-development})"

echo "🧩 Running Prisma migrations..."
npx prisma migrate deploy

echo "🛠 Generating Prisma client..."
npx prisma generate

if [ "$NODE_ENV" = "production" ] || [ "$NODE_ENV" = "staging" ]; then
  echo "🚀 Starting app (production mode)"
  exec npm run start:prod
else
  echo "🚀 Starting app (development mode)"
  exec npm run start:dev
fi
