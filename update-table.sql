-- Mise à jour de la table market_surveys pour correspondre aux données du questionnaire
-- Exécuter ce script dans l'éditeur SQL Supabase

-- Ajouter les colonnes manquantes
ALTER TABLE market_surveys 
ADD COLUMN IF NOT EXISTS budget TEXT,
ADD COLUMN IF NOT EXISTS discovery TEXT,
ADD COLUMN IF NOT EXISTS fee TEXT,
ADD COLUMN IF NOT EXISTS frequency TEXT,
ADD COLUMN IF NOT EXISTS services TEXT,
ADD COLUMN IF NOT EXISTS trust TEXT;

-- Pour compatibilité, garder aussi les anciennes colonnes
-- monthly_budget et expected_salary existent déjà
