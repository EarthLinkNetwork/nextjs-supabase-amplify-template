# Next.js + Supabase + Amplify Template

A production-ready template for building web applications with Next.js 15, Supabase authentication, and AWS Amplify deployment.

## Features

- 🚀 **Next.js 15** with App Router and TypeScript
- 🔐 **Supabase Authentication** with email/password login
- 🎨 **Tailwind CSS** for styling
- 📱 **Responsive Design** out of the box
- 🔒 **Row Level Security (RLS)** configured
- 🚢 **AWS Amplify** deployment ready
- 🛠️ **Developer Experience** with ESLint, TypeScript, and hot reload

## Quick Start

### 1. Use this template

Click the "Use this template" button or clone this repository:

```bash
git clone https://github.com/yourusername/nextjs-supabase-amplify-template.git my-app
cd my-app
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key from the API settings
3. Run the SQL migrations in `supabase/` folder in your Supabase SQL editor

### 4. Configure environment variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Project Structure

```
├── src/
│   ├── app/              # Next.js app router pages
│   ├── components/       # React components
│   ├── contexts/         # React contexts
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and clients
│   ├── store/            # Zustand store for state management
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
├── supabase/            # Database migrations and setup
└── amplify.yml          # AWS Amplify build configuration
```

## Deployment

### Deploy to AWS Amplify

1. Push your code to GitHub
2. Connect your repository to AWS Amplify
3. Add environment variables in Amplify console:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy!

The `amplify.yml` file is pre-configured for optimal Next.js deployments.

## Customization

### Adding new pages

Create new pages in `src/app/` following Next.js App Router conventions:

```tsx
// src/app/dashboard/page.tsx
export default function DashboardPage() {
  return <div>Dashboard</div>
}
```

### Protected routes

Use the `useAuth` hook to protect pages:

```tsx
'use client'

import { useAuth } from '@/hooks/useAuth'

export default function ProtectedPage() {
  const { user, loading } = useAuth(true) // requireAuth: true

  if (loading) return <div>Loading...</div>
  
  return <div>Welcome, {user?.email}!</div>
}
```

### Database schema

Modify the Supabase schema in `supabase/schema.sql` and run migrations in your Supabase dashboard.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon key | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Your Supabase service role key | Yes (for server-side operations) |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run setup` - Initial project setup

## Tech Stack

- [Next.js 15](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend as a Service
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [AWS Amplify](https://aws.amazon.com/amplify/) - Deployment platform

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.# nextjs-supabase-amplify-template
