-- Recréation complète de la table market_surveys avec toutes les colonnes nécessaires
-- Exécuter ce script dans l'éditeur SQL Supabase

-- Supprimer l'ancienne table si elle existe
DROP TABLE IF EXISTS market_surveys CASCADE;

-- Recréer la table avec toutes les colonnes du questionnaire
CREATE TABLE market_surveys (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_type TEXT NOT NULL CHECK (user_type IN ('family', 'worker')),
  
  -- Colonnes spécifiques au questionnaire
  budget TEXT,
  discovery TEXT,
  fee TEXT,
  frequency TEXT,
  services TEXT,
  trust TEXT,
  
  -- Colonnes standard pour compatibilité
  current_method TEXT,
  verification_trust INTEGER,
  monthly_budget INTEGER,
  expected_salary INTEGER,
  availability TEXT,
  location TEXT,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour optimiser les performances
CREATE INDEX idx_market_surveys_user_type ON market_surveys(user_type);
CREATE INDEX idx_market_surveys_created_at ON market_surveys(created_at);

-- Activer Row Level Security (RLS)
ALTER TABLE market_surveys ENABLE ROW LEVEL SECURITY;

-- Politiques pour la table market_surveys
CREATE POLICY "Anyone can insert survey responses" ON market_surveys
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view survey responses" ON market_surveys
  FOR SELECT USING (true);
