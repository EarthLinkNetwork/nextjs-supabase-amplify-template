# Tomodachi - Next.js + Supabase + Amplify Template

A modern web application template built with Next.js 15, Supabase authentication, and AWS Amplify deployment.

## Features

- ⚡ **Next.js 15** with App Router and TypeScript
- 🔐 **Supabase Authentication** with email/password
- 💅 **Tailwind CSS** for styling
- 📱 **Responsive Design** with mobile-first approach
- 🔒 **Row Level Security (RLS)** ready
- 🚀 **AWS Amplify** deployment configuration
- 🛠️ **Developer-friendly** setup

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Authentication**: Supabase Auth
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Deployment**: AWS Amplify

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account and project
- AWS account (for Amplify deployment)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd tomodachi
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## Project Structure

```
tomodachi/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # React components
│   ├── lib/              # Utility functions and configurations
│   ├── store/            # Zustand stores
│   ├── hooks/            # Custom React hooks
│   └── types/            # TypeScript type definitions
├── supabase/
│   └── migrations/       # Database migrations
├── public/               # Static assets
└── amplify.yml           # AWS Amplify configuration
```

## Deployment

### AWS Amplify

1. Push your code to GitHub
2. Connect your repository to AWS Amplify
3. Add environment variables in Amplify Console
4. Deploy!

The `amplify.yml` file is already configured for optimal Next.js deployment.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Authentication Flow

The template includes a complete authentication flow:
- Sign up with email/password
- Sign in with email/password
- Protected routes with middleware
- Persistent sessions

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.