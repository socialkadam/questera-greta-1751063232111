-- 🔥 FIX WIZARD RLS POLICIES - Allow wizard profile creation

-- First, drop the existing restrictive policies
DROP POLICY IF EXISTS "Approved wizards public" ON wizards;
DROP POLICY IF EXISTS "Users can insert own wizard profile" ON wizards;
DROP POLICY IF EXISTS "Users can update own wizard profile" ON wizards;

-- Create new, more permissive policies for wizard management

-- 1. SELECT: Allow users to see approved wizards + their own profile + admins see all
CREATE POLICY "Public can view approved wizards and own profile" ON wizards 
FOR SELECT USING (
  status = 'approved' 
  OR auth.uid() = id 
  OR EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- 2. INSERT: Allow authenticated users to create their own wizard profile
CREATE POLICY "Users can create own wizard profile" ON wizards 
FOR INSERT WITH CHECK (
  auth.uid() = id
  AND EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid()
  )
);

-- 3. UPDATE: Allow users to update their own profile + admins can update any
CREATE POLICY "Users can update own wizard profile and admins can update any" ON wizards 
FOR UPDATE USING (
  auth.uid() = id 
  OR EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- 4. DELETE: Only admins can delete wizard profiles
CREATE POLICY "Only admins can delete wizard profiles" ON wizards 
FOR DELETE USING (
  EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.role = 'admin'
  )
);

-- Also ensure the profiles table allows wizard role creation
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Updated profiles policies
CREATE POLICY "Anyone can insert profile" ON profiles 
FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles 
FOR UPDATE USING (auth.uid() = id);

-- Grant necessary permissions for the wizard creation function
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated;
GRANT ALL ON TABLE profiles TO postgres, anon, authenticated;
GRANT ALL ON TABLE wizards TO postgres, anon, authenticated;

-- Add a helper function to debug RLS issues (temporary)
CREATE OR REPLACE FUNCTION debug_wizard_creation(user_id UUID)
RETURNS TABLE (
  user_exists BOOLEAN,
  profile_exists BOOLEAN,
  user_role TEXT,
  can_insert BOOLEAN
) 
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    EXISTS(SELECT 1 FROM auth.users WHERE id = user_id) as user_exists,
    EXISTS(SELECT 1 FROM profiles WHERE id = user_id) as profile_exists,
    COALESCE((SELECT role::TEXT FROM profiles WHERE id = user_id), 'none') as user_role,
    (auth.uid() = user_id AND EXISTS(SELECT 1 FROM profiles WHERE id = user_id)) as can_insert;
END;
$$;

-- Success message
DO $$ 
BEGIN 
  RAISE NOTICE '🎉 WIZARD RLS POLICIES FIXED!
  ✅ More permissive INSERT policy created
  ✅ Users can now create wizard profiles
  ✅ Proper authentication checks in place
  ✅ Admin override capabilities maintained
  
  Next: Test wizard signup again!';
END $$;