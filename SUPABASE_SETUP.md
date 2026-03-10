# Supabase Setup Instructions for DomestiLink

## 1. Environment Configuration

Create a `.env.local` file in your project root with the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=https://dtalyulfanphubibbxrb.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_EX_6xStpsTwMUXMOhumlsg_FoV2xCt3
DATABASE_URL=postgresql://postgres:Ngonglirelle1@db.dtalyulfanphubibbxrb.supabase.co:5432/postgres
```

## 2. Database Schema Setup

Execute the SQL commands in `supabase-schema.sql` in your Supabase project:

1. Go to your Supabase project dashboard
2. Navigate to the SQL Editor
3. Copy and paste the contents of `supabase-schema.sql`
4. Run the SQL commands

## 3. Tables Created

### waitlist table
- Stores user information for the waitlist
- Fields: id, name, email, phone, city, user_type, created_at
- Unique constraint on email

### market_surveys table
- Stores questionnaire responses
- Fields: id, user_type, current_method, verification_trust, monthly_budget, expected_salary, availability, location, created_at

## 4. Security Policies

Row Level Security (RLS) is enabled with policies allowing:
- Anyone to insert waitlist entries
- Anyone to insert survey responses
- Public read access for analytics

## 5. Integration Points

The following components are now connected to Supabase:

### Waitlist Component (`src/components/sections/Waitlist.tsx`)
- Saves form submissions to the `waitlist` table
- Handles loading states and error management
- Validates email uniqueness through database constraint

### Market Survey Component (`src/components/sections/MarketSurvey.tsx`)
- Saves questionnaire responses to the `market_surveys` table
- Handles both family and worker survey types
- Async submission with error handling

### Supabase Client (`src/lib/supabase.ts`)
- Configured client with environment variables
- TypeScript interfaces for type safety
- Exported for use across components

## 6. Testing

To test the integration:

1. Start your development server: `npm run dev`
2. Navigate to the landing page
3. Complete the questionnaire
4. Fill out the waitlist form
5. Check your Supabase dashboard to verify data insertion

## 7. Data Management

You can view and manage your data in the Supabase dashboard:
- Table Editor for manual data inspection
- SQL Editor for custom queries
- Authentication settings for user management (future use)

## 8. Production Considerations

For production deployment:
- Ensure your environment variables are set in your hosting platform
- Consider adding service role key for server-side operations
- Monitor database usage and implement appropriate limits
- Set up proper backup strategies
