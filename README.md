# DomestiLink - Market Validation Landing Page

A modern SaaS landing page built with Next.js, React, and Tailwind CSS to validate the market demand for a domestic worker connection platform.

## Tech Stack

- **Framework:** [Next.js 15+](https://nextjs.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/) & CSS Keyframes

## Features

- **Hero Section:** Clear value proposition with dual CTAs.
- **Problem & Solution:** Narrative-driven sections explaining the "Why".
- **How It Works:** Step-by-step guide for both families and workers.
- **Dynamic Survey:** Multi-step questionnaire that adapts based on the user type (Family vs. Worker).
- **Waitlist:** Lead collection form with local storage persistence.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop.

## Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open the project:**
   Navigate to `http://localhost:3000` in your browser.

## Data Collection

Currently, survey responses and waitlist signups are stored in the browser's `localStorage` for demonstration:
- `survey_responses`: Stores JSON data from the market research survey.
- `waitlist_signups`: Stores JSON data from the waitlist form.

In a production environment, these would be connected to a backend (e.g., Supabase, Firebase, or a custom API).
