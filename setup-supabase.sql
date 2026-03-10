-- Création des tables pour DomestiLink
-- Exécuter ce script dans l'éditeur SQL de votre projet Supabase

-- Table waitlist
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  city TEXT,
  user_type TEXT NOT NULL CHECK (user_type IN ('family', 'worker')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table market_surveys
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

-- Index pour optimiser les performances
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_user_type ON waitlist(user_type);
CREATE INDEX IF NOT EXISTS idx_market_surveys_user_type ON market_surveys(user_type);
CREATE INDEX IF NOT EXISTS idx_market_surveys_created_at ON market_surveys(created_at);

-- Activer Row Level Security (RLS)
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_surveys ENABLE ROW LEVEL SECURITY;

-- Politiques pour la table waitlist
CREATE POLICY "Anyone can insert waitlist entries" ON waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view their own waitlist entry" ON waitlist
  FOR SELECT USING (true);

-- Politiques pour la table market_surveys
CREATE POLICY "Anyone can insert survey responses" ON market_surveys
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view survey responses" ON market_surveys
  FOR SELECT USING (true);
