-- 🔥 FRESH SUPABASE SETUP - SIMPLIFIED & BULLETPROOF
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create simple enums
CREATE TYPE user_role AS ENUM ('admin', 'seeker', 'wizard');
CREATE TYPE wizard_status AS ENUM ('pending', 'approved', 'rejected');
CREATE TYPE wizard_type AS ENUM ('coach', 'consultant', 'counselor', 'mentor');

-- 1. PROFILES TABLE (Auto-created from auth trigger)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT,
  email TEXT,
  role user_role DEFAULT 'seeker',
  avatar_url TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. WIZARDS TABLE (Simple and clean)
CREATE TABLE wizards (
  id UUID REFERENCES profiles(id) PRIMARY KEY,
  wizard_type wizard_type NOT NULL,
  specialization TEXT NOT NULL,
  title TEXT NOT NULL,
  experience_years INTEGER,
  hourly_rate DECIMAL(10,2),
  bio_detailed TEXT,
  why_wizard TEXT,
  certifications TEXT[],
  education TEXT,
  languages TEXT[] DEFAULT ARRAY['English'],
  session_types TEXT[] DEFAULT ARRAY['video'],
  status wizard_status DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. SESSIONS TABLE (For bookings)
CREATE TABLE sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  wizard_id UUID REFERENCES wizards(id) NOT NULL,
  seeker_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status TEXT DEFAULT 'scheduled',
  meeting_link TEXT,
  amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_wizards_type ON wizards(wizard_type);
CREATE INDEX idx_wizards_status ON wizards(status);
CREATE INDEX idx_sessions_wizard_id ON sessions(wizard_id);
CREATE INDEX idx_sessions_seeker_id ON sessions(seeker_id);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wizards ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;

-- 🔥 SIMPLE RLS POLICIES

-- Profiles: Everyone can read, users can update their own
CREATE POLICY "Public read access" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);

-- Wizards: Approved wizards visible to all, users can manage their own
CREATE POLICY "Approved wizards public" ON wizards FOR SELECT USING (status = 'approved' OR auth.uid() = id);
CREATE POLICY "Users can insert own wizard profile" ON wizards FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own wizard profile" ON wizards FOR UPDATE USING (auth.uid() = id);

-- Sessions: Users can see their own sessions
CREATE POLICY "Users can see own sessions" ON sessions FOR SELECT USING (
  auth.uid() = wizard_id OR auth.uid() = seeker_id
);
CREATE POLICY "Seekers can create sessions" ON sessions FOR INSERT WITH CHECK (auth.uid() = seeker_id);

-- 🔥 AUTO-PROFILE CREATION TRIGGER
CREATE OR REPLACE FUNCTION handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.email,
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'seeker')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 🔥 UPDATED_AT TRIGGER
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wizards_updated_at BEFORE UPDATE ON wizards 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 🎯 SUCCESS MESSAGE
DO $$
BEGIN
  RAISE NOTICE '🎉 FRESH SUPABASE SETUP COMPLETE! 
  
✅ Tables created: profiles, wizards, sessions
✅ RLS policies enabled
✅ Auto-profile creation trigger active
✅ Ready for wizard signups!

Next steps:
1. Update Supabase credentials in src/lib/supabase.js
2. Test wizard signup
3. 🚀 Launch!';
END $$;