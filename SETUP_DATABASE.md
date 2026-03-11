# 🔧 إعداد قاعدة البيانات على Render

## المشكلة الحالية
قاعدة البيانات غير متصلة، لذلك يظهر "Database error" عند محاولة تسجيل الدخول.

## 🆓 خيارات مجانية (اختر واحد)

### الخيار 1: Railway (الأسهل - $5 مجاني شهرياً) ⭐

**Railway يعطيك $5 مجاني كل شهر** - كافي تماماً لقاعدة بيانات صغيرة!

#### الخطوات:
1. اذهب إلى: https://railway.app
2. سجل دخول بحساب GitHub
3. اضغط "New Project"
4. اضغط "New" → "Database" → "MySQL"
5. Railway سينشئ قاعدة البيانات تلقائياً
6. اضغط على قاعدة البيانات → "Variables" tab
7. انسخ:
   - `MYSQLHOST` → هذا هو `DB_HOST`
   - `MYSQLUSER` → هذا هو `DB_USER`
   - `MYSQLPASSWORD` → هذا هو `DB_PASSWORD`
   - `MYSQLDATABASE` → هذا هو `DB_NAME`

---

### الخيار 2: Supabase (PostgreSQL - مجاني 100%) 🎉

**Supabase مجاني تماماً** - 500 MB مجاني + PostgreSQL قوي!

#### الخطوات:
1. اذهب إلى: https://supabase.com
2. سجل دخول بحساب GitHub
3. اضغط "New Project"
4. اختر:
   - **Name**: `ecommerce_db`
   - **Database Password**: اختر كلمة مرور قوية
   - **Region**: اختر الأقرب لك
5. بعد الإنشاء، اذهب إلى "Settings" → "Database"
6. انسخ "Connection string" أو البيانات:
   - **Host**: من Connection string
   - **User**: `postgres`
   - **Password**: اللي اخترته
   - **Database**: `postgres`

**ملاحظة**: Supabase يستخدم PostgreSQL، لكن الكود الحالي يستخدم MySQL. يمكنني مساعدتك في التحويل إذا أردت.

---

### الخيار 3: NeonDB (PostgreSQL - مجاني 3 GB) 🚀

**NeonDB مجاني تماماً** - 3 GB مجاني!

1. اذهب إلى: https://neon.tech
2. سجل دخول
3. اضغط "Create Project"
4. اختر الاسم والمنطقة
5. انسخ بيانات الاتصال

**ملاحظة**: يحتاج تحويل من MySQL إلى PostgreSQL.

---

### الخيار 4: Render PostgreSQL (مجاني - مدمج مع Render) 💡

**Render يوفر PostgreSQL مجاني** مع الخدمة!

1. في Render Dashboard، اضغط "New +" → "PostgreSQL"
2. اختر "Free" plan
3. Render سيعطيك Environment Variables تلقائياً

**ملاحظة**: يحتاج تحويل من MySQL إلى PostgreSQL.

---

## 🎯 التوصية: استخدم Railway

**Railway هو الأسهل** لأنه:
- ✅ $5 مجاني كل شهر (كافي تماماً)
- ✅ MySQL (يعمل مع الكود الحالي بدون تغيير)
- ✅ سهل الإعداد
- ✅ لا يحتاج تحويل كود

### الخطوة 1: إنشاء قاعدة بيانات على Railway

### الخطوة 2: الحصول على بيانات الاتصال (Railway)

1. في Railway، اضغط على قاعدة البيانات MySQL
2. اضغط "Variables" tab
3. انسخ:
   - `MYSQLHOST` → هذا هو `DB_HOST`
   - `MYSQLUSER` → هذا هو `DB_USER`
   - `MYSQLPASSWORD` → هذا هو `DB_PASSWORD`
   - `MYSQLDATABASE` → هذا هو `DB_NAME`

### الخطوة 3: إضافة Environment Variables في Render

1. اذهب إلى Render Dashboard: https://dashboard.render.com
2. اختر خدمتك (e-commerce-project)
3. اضغط "Environment" من القائمة الجانبية
4. أضف المتغيرات التالية:

```
DB_HOST=your-mysqlhost-from-railway
DB_USER=your-mysqluser-from-railway
DB_PASSWORD=your-mysqlpassword-from-railway
DB_NAME=your-mysqldatabase-from-railway
DB_SSL=false
JWT_SECRET=any-random-string-here-12345
```

**ملاحظة**: Railway لا يحتاج SSL، لذلك `DB_SSL=false`

5. اضغط "Save Changes"
6. Render سيعيد النشر تلقائياً

### الخطوة 4: إنشاء الجداول في قاعدة البيانات

#### إذا كنت تستخدم Railway:
1. في Railway، اضغط على قاعدة البيانات
2. اضغط "Data" tab أو "Query" tab
3. انسخ والصق هذا الكود:

#### إذا كنت تستخدم Supabase/NeonDB/PostgreSQL:
سأحتاج تحويل الكود من MySQL إلى PostgreSQL. أخبرني إذا أردت ذلك.

#### كود SQL (لـ MySQL/Railway):

```sql
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(500),
    stock INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    phone_number VARCHAR(20) DEFAULT NULL,
    address_street VARCHAR(255) DEFAULT NULL,
    address_district VARCHAR(100) DEFAULT NULL,
    address_city VARCHAR(100) DEFAULT NULL,
    address_postal VARCHAR(20) DEFAULT NULL,
    status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);
```

3. اضغط "Run" لتنفيذ الكود

## ✅ بعد ذلك

- انتظر دقيقة حتى ينتهي النشر
- جرب تسجيل الدخول مرة أخرى
- يجب أن يعمل الآن! 🎉

## 🆘 إذا استمرت المشكلة

1. افتح Render Dashboard → Logs
2. ابحث عن رسائل خطأ قاعدة البيانات
3. تأكد من أن Environment Variables صحيحة
4. تأكد من أن قاعدة البيانات نشطة

## 💰 معلومات الأسعار

- **Railway**: $5 مجاني شهرياً (كافي لمشروع صغير)
- **Supabase**: مجاني 100% (500 MB)
- **NeonDB**: مجاني 100% (3 GB)
- **Render PostgreSQL**: مجاني مع الخدمة

## 🎯 نصيحتي

**استخدم Railway** - الأسهل والأسرع، و$5 مجاني كافي تماماً!

