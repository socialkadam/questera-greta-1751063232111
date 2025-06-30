-- Create seeker profiles table
CREATE TABLE seeker_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  quiz_answers JSONB NOT NULL,
  recommended_archetype wizard_type NOT NULL,
  quiz_score INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create quiz attempts table for tracking retakes
CREATE TABLE quiz_attempts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  quiz_type TEXT NOT NULL DEFAULT 'seeker_onboarding', -- 'seeker_onboarding', 'wizard_vetting'
  score INTEGER,
  answers JSONB,
  completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  next_attempt_allowed_at TIMESTAMP WITH TIME ZONE
);

-- Create academy enrollment table
CREATE TABLE academy_enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  enrolled_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  module_1_complete BOOLEAN DEFAULT FALSE,
  module_2_complete BOOLEAN DEFAULT FALSE,
  module_3_complete BOOLEAN DEFAULT FALSE,
  module_4_complete BOOLEAN DEFAULT FALSE,
  module_5_complete BOOLEAN DEFAULT FALSE,
  final_quiz_score INTEGER,
  certified_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id)
);

-- Add academy fields to wizard profiles
ALTER TABLE wizards ADD COLUMN academy_enrolled BOOLEAN DEFAULT FALSE;
ALTER TABLE wizards ADD COLUMN badge TEXT;
ALTER TABLE wizards ADD COLUMN booking_url TEXT;
ALTER TABLE wizards ADD COLUMN lapsula_id TEXT;

-- Create indexes
CREATE INDEX idx_seeker_profiles_user_id ON seeker_profiles(user_id);
CREATE INDEX idx_seeker_profiles_archetype ON seeker_profiles(recommended_archetype);
CREATE INDEX idx_quiz_attempts_user_id ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_type ON quiz_attempts(quiz_type);
CREATE INDEX idx_academy_enrollments_user_id ON academy_enrollments(user_id);

-- RLS Policies
ALTER TABLE seeker_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE academy_enrollments ENABLE ROW LEVEL SECURITY;

-- Seeker profiles policies
CREATE POLICY "Users can view their own seeker profile" ON seeker_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own seeker profile" ON seeker_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own seeker profile" ON seeker_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Quiz attempts policies
CREATE POLICY "Users can view their own quiz attempts" ON quiz_attempts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create quiz attempts" ON quiz_attempts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Academy enrollment policies
CREATE POLICY "Users can view their own academy enrollment" ON academy_enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own academy enrollment" ON academy_enrollments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own academy enrollment" ON academy_enrollments
  FOR UPDATE USING (auth.uid() = user_id);

-- Trigger for updating updated_at
CREATE TRIGGER update_seeker_profiles_updated_at 
  BEFORE UPDATE ON seeker_profiles 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();