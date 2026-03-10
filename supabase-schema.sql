-- Create waitlist table
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  city TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('family', 'worker')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create market_surveys table
CREATE TABLE IF NOT EXISTS market_surveys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_type TEXT NOT NULL CHECK (user_type IN ('family', 'worker')),
  current_method TEXT,
  verification_trust INTEGER,
  monthly_budget INTEGER,
  expected_salary INTEGER,
  availability TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_user_type ON waitlist(user_type);
CREATE INDEX IF NOT EXISTS idx_market_surveys_user_type ON market_surveys(user_type);
CREATE INDEX IF NOT EXISTS idx_market_surveys_created_at ON market_surveys(created_at);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_surveys ENABLE ROW LEVEL SECURITY;

-- Create policies for waitlist table
CREATE POLICY "Anyone can insert waitlist entries" ON waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view their own waitlist entry" ON waitlist
  FOR SELECT USING (true);

-- Create policies for market_surveys table
CREATE POLICY "Anyone can insert survey responses" ON market_surveys
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view survey responses" ON market_surveys
  FOR SELECT USING (true);
