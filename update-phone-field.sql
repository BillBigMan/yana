-- Update phone field type in waitlist table to accommodate new format (+237 6XX XXX XXX)
-- The new format is: +237 6XX XXX XXX (15 characters with spaces)

-- Option 1: Keep as TEXT (recommended for flexibility with spaces)
ALTER TABLE waitlist 
ALTER COLUMN phone TYPE TEXT;

-- Option 2: If you prefer VARCHAR with specific length
ALTER TABLE waitlist 
ALTER COLUMN phone TYPE VARCHAR(20);

-- Option 3: Add constraint to ensure proper format (optional)
ALTER TABLE waitlist 
ADD CONSTRAINT check_phone_format 
CHECK (phone ~ '^ \+237 6 \d{3} \d{3} \d{2}$');

-- Update existing records to match new format (if needed)
-- This will format existing phone numbers to the new +237 6XX XXX XXX format
UPDATE waitlist 
SET phone = 
  CASE 
    -- If already in correct format, keep as is
    WHEN phone ~ '^ \+237 6 \d{3} \d{3} \d{2}$' THEN phone
    
    -- If format is +237XXXXXXXXX (no spaces), add spaces
    WHEN phone ~ '^ \+237\d{9}$' THEN 
      '+237 ' || SUBSTRING(phone, 5, 3) || ' ' || SUBSTRING(phone, 8, 3) || ' ' || SUBSTRING(phone, 11, 2)
    
    -- If format is 237XXXXXXXXX (no + and no spaces), add + and spaces
    WHEN phone ~ '^237\d{9}$' THEN 
      '+237 ' || SUBSTRING(phone, 4, 3) || ' ' || SUBSTRING(phone, 7, 3) || ' ' || SUBSTRING(phone, 10, 2)
    
    -- If format is 9 digits starting with 6, add +237 6 and spaces
    WHEN phone ~ '^6\d{8}$' THEN 
      '+237 6 ' || SUBSTRING(phone, 2, 3) || ' ' || SUBSTRING(phone, 5, 3) || ' ' || SUBSTRING(phone, 8, 2)
    
    -- Otherwise, keep as is (manual review needed)
    ELSE phone
  END;

-- Verify the changes
SELECT phone FROM waitlist LIMIT 5;
