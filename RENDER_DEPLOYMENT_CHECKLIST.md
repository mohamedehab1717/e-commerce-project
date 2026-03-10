# Quick Deployment Checklist for Render

## ✅ Pre-Deployment (Already Done)
- [x] Updated server.js to use environment variables for PORT
- [x] Updated config/db.js to use environment variables for database
- [x] Updated routes/users.js to use JWT_SECRET from environment
- [x] Updated middleware/auth.js to use JWT_SECRET from environment
- [x] Updated frontend files to use relative URLs
- [x] Created render.yaml configuration file
- [x] Created .gitignore file

## 📋 Steps to Deploy

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push origin main
```

### 2. Set Up Database
Choose one:
- [ ] **Option A**: Create PostgreSQL database on Render
- [ ] **Option B**: Create MySQL database on PlanetScale/Railway
- [ ] **Option C**: Use external MySQL service

### 3. Deploy on Render
- [ ] Go to https://dashboard.render.com
- [ ] Click "New +" → "Blueprint"
- [ ] Connect your GitHub repository
- [ ] Render will auto-detect render.yaml
- [ ] Review and apply settings

**OR** Manual setup:
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repo
- [ ] Set Build Command: `npm install`
- [ ] Set Start Command: `npm start`
- [ ] Add environment variables (see below)

### 4. Environment Variables
Add these in Render dashboard:
- [ ] `NODE_ENV` = `production`
- [ ] `DB_HOST` = (from your database)
- [ ] `DB_USER` = (from your database)
- [ ] `DB_PASSWORD` = (from your database)
- [ ] `DB_NAME` = `ecommerce_db`
- [ ] `JWT_SECRET` = (generate strong random string)

### 5. Database Setup
- [ ] Create database tables (users, products, orders, order_items)
- [ ] Seed initial data (optional)

### 6. Test
- [ ] Visit your Render URL
- [ ] Test API endpoints
- [ ] Test frontend pages
- [ ] Test user registration/login
- [ ] Test product listing
- [ ] Test cart functionality

## 🔧 Important Notes

1. **Database**: Render free tier doesn't include MySQL. Use PostgreSQL or external MySQL.
2. **Spin-down**: Free tier services sleep after 15 min inactivity (first request will be slow)
3. **Image URLs**: Update product images to use absolute URLs (not file:// paths)
4. **CORS**: Consider restricting CORS to your domain in production

## 📚 Full Guide
See `DEPLOYMENT.md` for detailed instructions.

