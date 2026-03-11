# Render Setup Instructions

## Required Environment Variables

في Render Dashboard، أضف هذه Environment Variables:

### Database Variables (Required)
```
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=ecommerce_db
```

### Optional Variables
```
DB_SSL=true          (Set to 'true' if using PlanetScale or similar)
JWT_SECRET=your-secret-key-here
NODE_ENV=production
```

## How to Get Database Credentials

### If using PlanetScale:
1. Go to your database dashboard
2. Click "Connect"
3. Copy the credentials:
   - Host
   - Username
   - Password
   - Database name

### If using Railway:
1. Go to your MySQL service
2. Click "Variables" tab
3. Copy:
   - MYSQLHOST → DB_HOST
   - MYSQLUSER → DB_USER
   - MYSQLPASSWORD → DB_PASSWORD
   - MYSQLDATABASE → DB_NAME

## Generate JWT_SECRET

Run this command to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output and use it as your JWT_SECRET.

## Troubleshooting

If deployment fails:
1. Check Render Logs for error messages
2. Verify all environment variables are set
3. Make sure database is accessible from Render's servers
4. Check that DB_NAME matches your actual database name

