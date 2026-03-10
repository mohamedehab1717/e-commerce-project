# Deploying to Render - Step by Step Guide

This guide will help you deploy your E-commerce project to Render.

## Prerequisites

1. A GitHub account
2. Your project pushed to a GitHub repository
3. A Render account (sign up at https://render.com)

## Step 1: Prepare Your Project

Your project has been configured with:
- ✅ Environment variables for database and JWT secret
- ✅ Dynamic PORT configuration
- ✅ Relative URLs in frontend files
- ✅ `render.yaml` configuration file

## Step 2: Push to GitHub

If you haven't already, push your project to GitHub:

```bash
git init
git add .
git commit -m "Prepare for Render deployment"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

## Step 3: Create Database on Render

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"PostgreSQL"** (Note: Render doesn't offer MySQL on free tier, but you can use PostgreSQL or use an external MySQL service)
   
   **OR** use an external MySQL service like:
   - **PlanetScale** (free tier available)
   - **Aiven** (free trial)
   - **Railway** (free tier available)

### Option A: Using PostgreSQL (Recommended for Render)

If you want to use PostgreSQL instead of MySQL:

1. Update your `package.json` to use `pg` instead of `mysql2`:
   ```bash
   npm uninstall mysql2
   npm install pg
   ```

2. Update `config/db.js` to use PostgreSQL connection

### Option B: Using External MySQL Service

If you prefer to keep MySQL, use PlanetScale or Railway:

1. Sign up at https://planetscale.com (or Railway)
2. Create a new database
3. Get your connection credentials

## Step 4: Deploy Web Service on Render

### Method 1: Using render.yaml (Recommended)

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Blueprint"**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and configure everything
5. Review the settings and click **"Apply"**

### Method 2: Manual Setup

1. Go to https://dashboard.render.com
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `ecommerce-app`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

5. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `DB_HOST` = (from your database)
   - `DB_USER` = (from your database)
   - `DB_PASSWORD` = (from your database)
   - `DB_NAME` = `ecommerce_db`
   - `JWT_SECRET` = (generate a strong random string)

6. Click **"Create Web Service"**

## Step 5: Set Up Database Schema

After deployment, you need to create your database tables. You have two options:

### Option A: Run SQL Scripts Manually

Connect to your database and run the SQL commands to create tables:
- `users` table
- `products` table
- `orders` table
- `order_items` table

### Option B: Use a Database Migration Script

Create a script that runs on first deployment to set up the database schema.

## Step 6: Seed Initial Data (Optional)

If you want to seed initial product data, you can:
1. Update `seed.js` to use environment variables
2. Run it manually after deployment, or
3. Create an admin endpoint to seed data

## Step 7: Verify Deployment

1. Once deployed, Render will provide you with a URL like: `https://ecommerce-app.onrender.com`
2. Visit the URL to verify your app is running
3. Test the API endpoints
4. Test the frontend pages

## Environment Variables Reference

Create a `.env` file locally (don't commit it) with:

```env
PORT=7000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=ecommerce_db
JWT_SECRET=your-strong-secret-key-here
```

On Render, these will be set through the dashboard or `render.yaml`.

## Important Notes

1. **Free Tier Limitations**: 
   - Render free tier services spin down after 15 minutes of inactivity
   - First request after spin-down may take 30-60 seconds
   - Consider upgrading for production use

2. **Database Connection**:
   - Make sure your database allows connections from Render's IP addresses
   - Use SSL connections if available

3. **CORS**: 
   - Your app uses `cors()` middleware which allows all origins
   - Consider restricting this in production to your domain only

4. **JWT Secret**:
   - Use a strong, random secret key in production
   - Never commit secrets to Git

5. **Static Files**:
   - Your frontend files are served from the `frontend` folder
   - Make sure all image URLs in your database use absolute URLs (not file:// paths)

## Troubleshooting

### Database Connection Issues
- Verify environment variables are set correctly
- Check database credentials
- Ensure database is accessible from Render's servers

### Build Failures
- Check build logs in Render dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### Application Errors
- Check application logs in Render dashboard
- Verify all environment variables are set
- Test database connection separately

## Next Steps

1. Set up a custom domain (optional)
2. Enable HTTPS (automatic on Render)
3. Set up monitoring and alerts
4. Configure backups for your database
5. Set up CI/CD for automatic deployments

## Support

- Render Documentation: https://render.com/docs
- Render Community: https://community.render.com

