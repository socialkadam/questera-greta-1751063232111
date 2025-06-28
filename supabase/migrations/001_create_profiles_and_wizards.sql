-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum for user roles
CREATE TYPE user_role AS ENUM ('admin', 'seeker', 'wizard');

-- Create enum for wizard status
CREATE TYPE wizard_status AS ENUM ('pending', 'approved', 'rejected', 'suspended');

-- Create enum for session status
CREATE TYPE session_status AS ENUM ('scheduled', 'completed', 'cancelled', 'no_show');

-- Create enum for wizard specializations
CREATE TYPE wizard_specialization AS ENUM (
  'career', 'fitness', 'productivity', 'life', 'wellness', 'leadership',
  'business', 'strategy', 'marketing', 'operations', 'finance', 'startup',
  'stress', 'relationships', 'mental_health', 'trauma', 'grief', 'anxiety',
  'entrepreneurship', 'personal_growth'
);

-- Create enum for wizard types
CREATE TYPE wizard_type AS ENUM ('coach', 'consultant', 'counselor', 'mentor');

-- Create profiles table (linked to auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  role user_role DEFAULT 'seeker',
  avatar_url TEXT,
  bio TEXT,
  location TEXT,
  phone TEXT,
  timezone TEXT DEFAULT 'UTC',
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create wizards table (extended profile for wizard users)
CREATE TABLE wizards (
  id UUID REFERENCES profiles(id) PRIMARY KEY,
  wizard_type wizard_type NOT NULL,
  specialization wizard_specialization NOT NULL,
  title TEXT NOT NULL,
  experience_years INTEGER,
  hourly_rate DECIMAL(10,2),
  status wizard_status DEFAULT 'pending',
  languages TEXT[] DEFAULT ARRAY['English'],
  certifications TEXT[],
  education TEXT,
  availability_hours JSONB, -- Store availability schedule
  session_types TEXT[] DEFAULT ARRAY['video', 'phone', 'chat'],
  bio_detailed TEXT,
  why_wizard TEXT, -- Why they became a wizard
  approach TEXT, -- Their coaching/consulting approach
  success_stories TEXT,
  website_url TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  approved_at TIMESTAMP WITH TIME ZONE,
  approved_by UUID REFERENCES profiles(id),
  rejection_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create sessions table
CREATE TABLE sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  wizard_id UUID REFERENCES wizards(id) NOT NULL,
  seeker_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  session_type TEXT DEFAULT 'video', -- video, phone, chat
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL,
  duration_minutes INTEGER DEFAULT 60,
  status session_status DEFAULT 'scheduled',
  meeting_link TEXT,
  notes_wizard TEXT, -- Wizard's private notes
  notes_seeker TEXT, -- Seeker's private notes
  homework TEXT, -- Assigned homework/tasks
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  amount DECIMAL(10,2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create messages table for chat functionality
CREATE TABLE messages (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  session_id UUID REFERENCES sessions(id),
  sender_id UUID REFERENCES profiles(id) NOT NULL,
  recipient_id UUID REFERENCES profiles(id) NOT NULL,
  content TEXT NOT NULL,
  message_type TEXT DEFAULT 'text', -- text, image, file
  file_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create saved_wizards table (seeker bookmarks)
CREATE TABLE saved_wizards (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  seeker_id UUID REFERENCES profiles(id) NOT NULL,
  wizard_id UUID REFERENCES wizards(id) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(seeker_id, wizard_id)
);

-- Create wizard_reviews table
CREATE TABLE wizard_reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  wizard_id UUID REFERENCES wizards(id) NOT NULL,
  seeker_id UUID REFERENCES profiles(id) NOT NULL,
  session_id UUID REFERENCES sessions(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review TEXT,
  is_anonymous BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id) -- One review per session
);

-- Create notifications table
CREATE TABLE notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'general', -- general, session, message, system
  is_read BOOLEAN DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_wizards_type ON wizards(wizard_type);
CREATE INDEX idx_wizards_specialization ON wizards(specialization);
CREATE INDEX idx_wizards_status ON wizards(status);
CREATE INDEX idx_sessions_wizard_id ON sessions(wizard_id);
CREATE INDEX idx_sessions_seeker_id ON sessions(seeker_id);
CREATE INDEX idx_sessions_scheduled_at ON sessions(scheduled_at);
CREATE INDEX idx_messages_session_id ON messages(session_id);
CREATE INDEX idx_messages_sender_id ON messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON messages(recipient_id);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE wizards ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_wizards ENABLE ROW LEVEL SECURITY;
ALTER TABLE wizard_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- RLS Policies for wizards
CREATE POLICY "Approved wizards are viewable by everyone" ON wizards
  FOR SELECT USING (status = 'approved');

CREATE POLICY "Wizards can view their own profile" ON wizards
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view all wizard profiles" ON wizards
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Users can insert their own wizard profile" ON wizards
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Wizards can update their own profile" ON wizards
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can update wizard status" ON wizards
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

-- RLS Policies for sessions
CREATE POLICY "Users can view their own sessions" ON sessions
  FOR SELECT USING (
    auth.uid() = wizard_id OR 
    auth.uid() = seeker_id OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Seekers can create sessions" ON sessions
  FOR INSERT WITH CHECK (
    auth.uid() = seeker_id AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'seeker'
    )
  );

CREATE POLICY "Session participants can update sessions" ON sessions
  FOR UPDATE USING (
    auth.uid() = wizard_id OR 
    auth.uid() = seeker_id
  );

-- RLS Policies for messages
CREATE POLICY "Users can view their own messages" ON messages
  FOR SELECT USING (
    auth.uid() = sender_id OR 
    auth.uid() = recipient_id OR
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their own messages" ON messages
  FOR UPDATE USING (
    auth.uid() = sender_id OR 
    auth.uid() = recipient_id
  );

-- RLS Policies for saved_wizards
CREATE POLICY "Users can view their own saved wizards" ON saved_wizards
  FOR SELECT USING (auth.uid() = seeker_id);

CREATE POLICY "Seekers can save wizards" ON saved_wizards
  FOR INSERT WITH CHECK (
    auth.uid() = seeker_id AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'seeker'
    )
  );

CREATE POLICY "Seekers can remove saved wizards" ON saved_wizards
  FOR DELETE USING (auth.uid() = seeker_id);

-- RLS Policies for wizard_reviews
CREATE POLICY "Reviews are viewable by everyone" ON wizard_reviews
  FOR SELECT USING (true);

CREATE POLICY "Seekers can create reviews" ON wizard_reviews
  FOR INSERT WITH CHECK (
    auth.uid() = seeker_id AND
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'seeker'
    )
  );

CREATE POLICY "Users can update their own reviews" ON wizard_reviews
  FOR UPDATE USING (auth.uid() = seeker_id);

-- RLS Policies for notifications
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can create notifications" ON notifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- Create functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
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

-- Create trigger for automatic profile creation
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updating updated_at
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wizards_updated_at
  BEFORE UPDATE ON wizards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sessions_updated_at
  BEFORE UPDATE ON sessions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample admin user (you'll need to update this with actual admin user ID)
-- INSERT INTO profiles (id, full_name, email, role, is_verified)
-- VALUES (
--   'your-admin-user-id-here',
--   'Admin User',
--   'admin@wizardoo.com',
--   'admin',
--   true
-- );