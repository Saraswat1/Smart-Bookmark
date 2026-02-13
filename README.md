🔖Smart Bookmark App
A real-time, secure bookmark manager built with Next.js and Supabase. This application allows users to authenticate via Google and manage their personal links with instant UI updates across all devices.

🚀 Live Demo
Link: [Insert Your Vercel URL Here]

GitHub: [Insert Your Repo Link Here]

🛠 Tech Stack
Frontend: Next.js (App Router)

Database: Supabase (PostgreSQL)

Auth: Google OAuth via Supabase Auth

Real-time: Supabase Postgres Changes Listener

Styling: Tailwind CSS

✨ Key Features
One-Tap Login: Integrated Google OAuth for a frictionless onboarding experience.

Real-time Sync: Uses Supabase Channels to listen for database changes (INSERT, DELETE) and update the UI without a page refresh.

Secure Access: Client-side route protection using getUser() and router.push() to ensure only logged-in users see their dashboard.

Responsive UI: A clean, mobile-first design using Tailwind CSS gradients and transitions.

🧠 Challenges & Solutions
1. Handling Real-time Data Sync
Problem: I wanted the bookmark list to update immediately if a user added a link from a different tab or device, but calling fetchBookmarks manually every time was inefficient.
Solution: I implemented a Supabase Realtime Channel. By subscribing to postgres_changes on the bookmarks table, the app listens for any event (*) and triggers a fresh fetch only when the database actually changes.

2. Protecting the Dashboard Route
Problem: Unauthorized users could potentially see the dashboard layout before being redirected to login.
Solution: In my Dashboard component, I used a loading state paired with an init() function. The app checks for a valid session using supabase.auth.getUser() immediately on mount. If no user is found, they are redirected before the loading state is set to false.

3. Database Privacy (RLS)
Problem: Ensuring that one user cannot see another user's bookmarks.
Solution: I enabled Row Level Security (RLS) in Supabase. I configured a policy that only allows users to SELECT and DELETE rows where the user_id matches auth.uid(). This moves security from the frontend to the database level.

⚙️ Local Setup
Clone the Repository: git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

Install Dependencies: npm install

Environment Variables: Create a .env.local and add your keys:
Code snippet
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

Run the App: npm run dev
