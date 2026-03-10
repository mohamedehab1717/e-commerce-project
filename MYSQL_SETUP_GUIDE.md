# MySQL Setup Guide for Render Deployment

Since you're using phpMyAdmin (MySQL) and Render doesn't offer MySQL on the free tier, you'll need to use an external MySQL service. Here are the best options:

## Option 1: PlanetScale (Recommended - Free Tier Available) ⭐

PlanetScale offers a free tier with MySQL compatibility.

### Steps:

1. **Sign up at PlanetScale**
   - Go to https://planetscale.com
   - Sign up with GitHub (easiest)

2. **Create a Database**
   - Click "Create database"
   - Name it: `ecommerce_db`
   - Choose the free "Hobby" plan
   - Select a region closest to you

3. **Get Connection Credentials**
   - Go to your database dashboard
   - Click "Connect"
   - Copy the connection string or credentials:
     - Host
     - Username
     - Password
     - Database name

4. **Import Your Database Schema**
   - Option A: Use PlanetScale's web console
     - Go to "Console" tab
     - Copy and paste the SQL from `database_schema.sql`
     - Run it
   
   - Option B: Export from phpMyAdmin and import
     - Export your current database from phpMyAdmin
     - Use PlanetScale's import feature

5. **Set Environment Variables in Render**
   - Go to your Render service dashboard
   - Add these environment variables:
     ```
     DB_HOST=your-planetscale-host
     DB_USER=your-planetscale-username
     DB_PASSWORD=your-planetscale-password
     DB_NAME=ecommerce_db
     ```

---

## Option 2: Railway (Free Tier Available)

Railway offers MySQL databases with a free tier.

### Steps:

1. **Sign up at Railway**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create MySQL Database**
   - Click "New Project"
   - Click "New" → "Database" → "MySQL"
   - Railway will automatically create the database

3. **Get Connection Info**
   - Click on your MySQL service
   - Go to "Variables" tab
   - You'll see:
     - `MYSQLHOST`
     - `MYSQLUSER`
     - `MYSQLPASSWORD`
     - `MYSQLDATABASE`

4. **Import Schema**
   - Use Railway's MySQL console or connect via MySQL client
   - Run the SQL from `database_schema.sql`

5. **Set Environment Variables in Render**
   ```
   DB_HOST=<MYSQLHOST>
   DB_USER=<MYSQLUSER>
   DB_PASSWORD=<MYSQLPASSWORD>
   DB_NAME=<MYSQLDATABASE>
   ```

---

## Option 3: Aiven (Free Trial)

Aiven offers MySQL with a free trial.

1. Sign up at https://aiven.io
2. Create a MySQL service
3. Get connection credentials
4. Import your schema
5. Set environment variables in Render

---

## Option 4: Keep Using Local MySQL (For Testing Only)

If you want to test locally first, you can:

1. Use a service like **ngrok** to expose your local MySQL
2. Or use **Cloudflare Tunnel** (free)
3. **Not recommended for production**

---

## Exporting from phpMyAdmin

To export your current database:

1. Open phpMyAdmin
2. Select your `ecommerce_db` database
3. Click "Export" tab
4. Choose "SQL" format
5. Click "Go" to download
6. Import this file to your new MySQL service

---

## Setting Up Database Schema

After creating your external MySQL database, you need to create the tables:

### Method 1: Using the SQL File
1. Use the provided `database_schema.sql` file
2. Run it in your new database's SQL console

### Method 2: Export from phpMyAdmin
1. Export your current database structure
2. Import it to the new database

### Method 3: Run Migration Scripts
You can also use the provided scripts:
- `update_db.js` - Updates orders table schema
- `seed.js` - Seeds initial product data (update image URLs first!)

---

## Important Notes

1. **SSL Connection**: Most external MySQL services require SSL. Update `config/db.js` if needed:
   ```javascript
   const db = mysql.createConnection({
       host: process.env.DB_HOST,
       user: process.env.DB_USER,
       password: process.env.DB_PASSWORD,
       database: process.env.DB_NAME,
       ssl: {
           rejectUnauthorized: false  // For PlanetScale and similar services
       }
   });
   ```

2. **Image URLs**: Update product images in your database to use absolute URLs (not `file://` paths)

3. **Connection Limits**: Free tiers usually have connection limits - your app should handle this well with connection pooling

4. **Backup**: Set up regular backups if using a free tier

---

## Testing the Connection

After setting up, test your connection:

1. Update your local `.env` file with the new credentials
2. Run: `node server.js`
3. Check if it connects successfully

---

## Recommended: PlanetScale

I recommend **PlanetScale** because:
- ✅ Free tier available
- ✅ Easy to use
- ✅ Good documentation
- ✅ MySQL compatible
- ✅ Web console for managing data
- ✅ Automatic backups

---

## Quick Setup Checklist

- [ ] Choose MySQL service (PlanetScale recommended)
- [ ] Create database
- [ ] Import schema (use `database_schema.sql`)
- [ ] Get connection credentials
- [ ] Set environment variables in Render
- [ ] Test connection
- [ ] Update product image URLs to absolute URLs
- [ ] Deploy!

---

## Need Help?

- PlanetScale Docs: https://planetscale.com/docs
- Railway Docs: https://docs.railway.app
- Check Render logs if connection fails

