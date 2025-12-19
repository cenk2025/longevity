# Supabase Database Setup Instructions

## Quick Setup (Copy & Paste)

1. **Open Supabase SQL Editor**
   - Go to: https://hqyzvyiqnsxhqzbihrxo.supabase.co
   - Navigate to: **SQL Editor** (left sidebar)
   - Click: **New Query**

2. **Run the Schema**
   - Copy the entire SQL code below
   - Paste into the SQL Editor
   - Click **Run** or press `Ctrl/Cmd + Enter`

3. **Verify Tables Created**
   - Go to **Table Editor** (left sidebar)
   - You should see:
     - ✅ `user_profiles`
     - ✅ `test_results`

---

## Complete SQL Schema

```sql
-- Longevity IQ Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  age INTEGER,
  gender TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Test Results Table
CREATE TABLE IF NOT EXISTS test_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  test_type TEXT NOT NULL,
  score INTEGER NOT NULL,
  data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_test_results_user_id ON test_results(user_id);
CREATE INDEX IF NOT EXISTS idx_test_results_test_type ON test_results(test_type);
CREATE INDEX IF NOT EXISTS idx_test_results_created_at ON test_results(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_results ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view their own profile"
  ON user_profiles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own profile"
  ON user_profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON user_profiles FOR UPDATE
  USING (auth.uid() = user_id);

-- Test Results Policies
CREATE POLICY "Users can view their own test results"
  ON test_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own test results"
  ON test_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own test results"
  ON test_results FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own test results"
  ON test_results FOR DELETE
  USING (auth.uid() = user_id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_test_results_updated_at
  BEFORE UPDATE ON test_results
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

---

## What This Schema Does

### Tables Created:

1. **user_profiles**
   - Stores additional user information
   - Linked to Supabase Auth users
   - Fields: age, gender, country
   - Automatically tracks creation and update times

2. **test_results**
   - Stores all longevity test results
   - Links to users via user_id
   - Stores test type, score, and detailed data (JSONB)
   - Automatically tracks creation and update times

### Security Features:

- **Row Level Security (RLS)**: Enabled on all tables
- **User Isolation**: Users can only access their own data
- **Automatic Cleanup**: Data is deleted when user account is deleted
- **Secure Policies**: Separate policies for SELECT, INSERT, UPDATE, DELETE

### Performance Optimizations:

- **Indexes**: Created on frequently queried columns
- **Efficient Queries**: Optimized for dashboard and history views
- **Timestamp Triggers**: Automatic update tracking

---

## Verification Steps

After running the SQL:

1. **Check Tables**
   ```sql
   SELECT table_name 
   FROM information_schema.tables 
   WHERE table_schema = 'public';
   ```

2. **Check RLS Policies**
   ```sql
   SELECT tablename, policyname 
   FROM pg_policies 
   WHERE schemaname = 'public';
   ```

3. **Test Insert** (after creating a user)
   ```sql
   -- This should work for authenticated users
   INSERT INTO user_profiles (user_id, age, gender, country)
   VALUES (auth.uid(), 30, 'other', 'Finland');
   ```

---

## Troubleshooting

### Error: "permission denied for table"
- **Solution**: Make sure RLS policies are created
- Run the policy creation SQL again

### Error: "relation already exists"
- **Solution**: Tables already exist, this is fine
- You can skip table creation or use `DROP TABLE IF EXISTS` first

### Error: "function auth.uid() does not exist"
- **Solution**: Make sure you're using Supabase, not plain PostgreSQL
- auth.uid() is a Supabase-specific function

---

## Next Steps

After database setup:

1. ✅ Database is ready
2. 🚀 Deploy the application
3. 👤 Create a test user account
4. 📊 Complete a longevity test
5. 📈 View results in dashboard

---

## Support

If you encounter issues:
- Check Supabase logs in Dashboard → Logs
- Review RLS policies in Authentication → Policies
- Test queries in SQL Editor
- Check browser console for errors

---

**Database Setup Complete!** 🎉

Your Longevity IQ platform is now ready to store user data securely.
