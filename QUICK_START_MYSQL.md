# Quick Start: Deploy with MySQL to Render

## Step 1: Set Up External MySQL Database

**Recommended: PlanetScale (Free)**

1. Go to https://planetscale.com and sign up
2. Create a new database named `ecommerce_db`
3. In the database dashboard, click "Connect"
4. Copy your connection credentials:
   - Host
   - Username  
   - Password
   - Database name

5. Import your schema:
   - Click "Console" tab in PlanetScale
   - Copy the contents of `database_schema.sql`
   - Paste and run it

## Step 2: Deploy to Render

1. Go to https://dashboard.render.com
2. Click "New +" → "Blueprint"
3. Connect your GitHub repo: `mohamedehab1717/e-commerce-project`
4. Render will detect `render.yaml`

## Step 3: Add Environment Variables in Render

In your Render service dashboard, go to "Environment" and add:

```
DB_HOST=your-planetscale-host
DB_USER=your-planetscale-username  
DB_PASSWORD=your-planetscale-password
DB_NAME=ecommerce_db
DB_SSL=true
JWT_SECRET=generate-a-strong-random-string-here
```

**To generate JWT_SECRET**, run this in terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Step 4: Deploy!

Click "Apply" and Render will deploy your app. Once done, visit your app URL!

## That's It! 🎉

Your app should now be live. If you have issues:
- Check Render logs
- Verify database credentials
- See `MYSQL_SETUP_GUIDE.md` for detailed help

