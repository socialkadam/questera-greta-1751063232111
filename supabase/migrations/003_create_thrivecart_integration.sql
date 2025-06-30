-- Create ThriveCart integration tables
CREATE TABLE thrivecart_products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  thrivecart_product_id TEXT NOT NULL UNIQUE,
  product_name TEXT NOT NULL,
  product_type TEXT NOT NULL, -- 'academy_course', 'certification', 'individual_module'
  archetype wizard_type, -- For archetype-specific courses
  price DECIMAL(10,2),
  currency TEXT DEFAULT 'USD',
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create ThriveCart transactions table
CREATE TABLE thrivecart_transactions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  thrivecart_transaction_id TEXT NOT NULL UNIQUE,
  thrivecart_product_id TEXT REFERENCES thrivecart_products(thrivecart_product_id),
  user_id UUID REFERENCES profiles(id) NOT NULL,
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT NOT NULL, -- 'completed', 'pending', 'refunded', 'cancelled'
  payment_method TEXT,
  transaction_date TIMESTAMP WITH TIME ZONE NOT NULL,
  refund_date TIMESTAMP WITH TIME ZONE,
  refund_amount DECIMAL(10,2),
  webhook_data JSONB, -- Store full webhook payload
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create course enrollments table (links users to ThriveCart courses)
CREATE TABLE course_enrollments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  thrivecart_product_id TEXT REFERENCES thrivecart_products(thrivecart_product_id),
  thrivecart_transaction_id TEXT REFERENCES thrivecart_transactions(thrivecart_transaction_id),
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completion_date TIMESTAMP WITH TIME ZONE,
  progress_percentage INTEGER DEFAULT 0 CHECK (progress_percentage >= 0 AND progress_percentage <= 100),
  last_accessed TIMESTAMP WITH TIME ZONE,
  certificate_issued BOOLEAN DEFAULT FALSE,
  certificate_url TEXT,
  status TEXT DEFAULT 'active', -- 'active', 'completed', 'suspended', 'expired'
  thrivecart_student_id TEXT, -- ThriveCart's internal student ID
  learn_plus_access_url TEXT, -- Direct link to course in Learn Plus
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, thrivecart_product_id)
);

-- Create course progress tracking table
CREATE TABLE course_progress (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  enrollment_id UUID REFERENCES course_enrollments(id) NOT NULL,
  user_id UUID REFERENCES profiles(id) NOT NULL,
  lesson_id TEXT NOT NULL, -- ThriveCart Learn Plus lesson ID
  lesson_name TEXT,
  module_id TEXT, -- ThriveCart Learn Plus module ID
  module_name TEXT,
  completed BOOLEAN DEFAULT FALSE,
  completion_date TIMESTAMP WITH TIME ZONE,
  time_spent_seconds INTEGER DEFAULT 0,
  quiz_score INTEGER, -- If lesson has a quiz
  quiz_attempts INTEGER DEFAULT 0,
  last_accessed TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  progress_data JSONB, -- Additional progress data from ThriveCart
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(enrollment_id, lesson_id)
);

-- Create ThriveCart webhook logs table
CREATE TABLE thrivecart_webhook_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  webhook_type TEXT NOT NULL, -- 'purchase', 'refund', 'progress_update', 'completion'
  event_data JSONB NOT NULL,
  processed BOOLEAN DEFAULT FALSE,
  error_message TEXT,
  user_id UUID REFERENCES profiles(id),
  transaction_id TEXT,
  received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  processed_at TIMESTAMP WITH TIME ZONE
);

-- Update academy_enrollments to link with ThriveCart
ALTER TABLE academy_enrollments ADD COLUMN thrivecart_enrollment_id UUID REFERENCES course_enrollments(id);
ALTER TABLE academy_enrollments ADD COLUMN access_granted_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE academy_enrollments ADD COLUMN access_expires_at TIMESTAMP WITH TIME ZONE;

-- Update wizards table for certification tracking
ALTER TABLE wizards ADD COLUMN certification_course_id TEXT;
ALTER TABLE wizards ADD COLUMN certification_completed_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE wizards ADD COLUMN continuing_education_hours INTEGER DEFAULT 0;

-- Create indexes for performance
CREATE INDEX idx_thrivecart_products_type ON thrivecart_products(product_type);
CREATE INDEX idx_thrivecart_products_archetype ON thrivecart_products(archetype);
CREATE INDEX idx_thrivecart_transactions_user_id ON thrivecart_transactions(user_id);
CREATE INDEX idx_thrivecart_transactions_status ON thrivecart_transactions(status);
CREATE INDEX idx_thrivecart_transactions_date ON thrivecart_transactions(transaction_date);
CREATE INDEX idx_course_enrollments_user_id ON course_enrollments(user_id);
CREATE INDEX idx_course_enrollments_status ON course_enrollments(status);
CREATE INDEX idx_course_progress_enrollment_id ON course_progress(enrollment_id);
CREATE INDEX idx_course_progress_user_id ON course_progress(user_id);
CREATE INDEX idx_webhook_logs_processed ON thrivecart_webhook_logs(processed);
CREATE INDEX idx_webhook_logs_type ON thrivecart_webhook_logs(webhook_type);

-- Enable RLS
ALTER TABLE thrivecart_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE thrivecart_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE thrivecart_webhook_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for thrivecart_products (public read for active products)
CREATE POLICY "Active products are viewable by everyone" ON thrivecart_products
  FOR SELECT USING (is_active = true);

CREATE POLICY "Admins can manage products" ON thrivecart_products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- RLS Policies for thrivecart_transactions
CREATE POLICY "Users can view their own transactions" ON thrivecart_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all transactions" ON thrivecart_transactions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "System can create transactions" ON thrivecart_transactions
  FOR INSERT WITH CHECK (true);

-- RLS Policies for course_enrollments
CREATE POLICY "Users can view their own enrollments" ON course_enrollments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all enrollments" ON course_enrollments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "System can manage enrollments" ON course_enrollments
  FOR ALL WITH CHECK (true);

-- RLS Policies for course_progress
CREATE POLICY "Users can view their own progress" ON course_progress
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress" ON course_progress
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "System can manage progress" ON course_progress
  FOR ALL WITH CHECK (true);

-- RLS Policies for webhook_logs (admin only)
CREATE POLICY "Admins can view webhook logs" ON thrivecart_webhook_logs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Create triggers for updated_at
CREATE TRIGGER update_thrivecart_products_updated_at 
  BEFORE UPDATE ON thrivecart_products 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_thrivecart_transactions_updated_at 
  BEFORE UPDATE ON thrivecart_transactions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_enrollments_updated_at 
  BEFORE UPDATE ON course_enrollments 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_progress_updated_at 
  BEFORE UPDATE ON course_progress 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample ThriveCart products (you'll update these with actual product IDs)
INSERT INTO thrivecart_products (thrivecart_product_id, product_name, product_type, archetype, price, description) VALUES
('tc_academy_coach', 'Wizardoo Academy - Coach Certification', 'academy_course', 'coach', 297.00, 'Complete coaching certification program'),
('tc_academy_mentor', 'Wizardoo Academy - Mentor Certification', 'academy_course', 'mentor', 297.00, 'Complete mentoring certification program'),
('tc_academy_counselor', 'Wizardoo Academy - Counselor Certification', 'academy_course', 'counselor', 397.00, 'Complete counseling certification program'),
('tc_academy_consultant', 'Wizardoo Academy - Consultant Certification', 'academy_course', 'consultant', 497.00, 'Complete consulting certification program'),
('tc_continuing_ed', 'Continuing Education Package', 'certification', NULL, 97.00, 'Annual continuing education requirements');