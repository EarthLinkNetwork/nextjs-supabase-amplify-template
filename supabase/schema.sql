-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE,
  display_name TEXT,
  avatar TEXT,
  bio TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create stuffed_animals table
CREATE TABLE IF NOT EXISTS public.stuffed_animals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  family_date DATE NOT NULL,
  location_name TEXT,
  location_address TEXT,
  location_latitude DECIMAL(10, 8),
  location_longitude DECIMAL(11, 8),
  location_map_url TEXT,
  description TEXT,
  tags TEXT[],
  images TEXT[],
  main_image TEXT NOT NULL,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create stuffed_animal_groups table
CREATE TABLE IF NOT EXISTS public.stuffed_animal_groups (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create group_members table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.group_members (
  group_id UUID REFERENCES public.stuffed_animal_groups(id) ON DELETE CASCADE NOT NULL,
  stuffed_animal_id UUID REFERENCES public.stuffed_animals(id) ON DELETE CASCADE NOT NULL,
  added_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (group_id, stuffed_animal_id)
);

-- Create trips table
CREATE TABLE IF NOT EXISTS public.trips (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  location_name TEXT,
  location_address TEXT,
  location_latitude DECIMAL(10, 8),
  location_longitude DECIMAL(11, 8),
  location_map_url TEXT,
  images TEXT[],
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create trip_companions table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.trip_companions (
  trip_id UUID REFERENCES public.trips(id) ON DELETE CASCADE NOT NULL,
  stuffed_animal_id UUID REFERENCES public.stuffed_animals(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (trip_id, stuffed_animal_id)
);

-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  images TEXT[],
  trip_id UUID REFERENCES public.trips(id) ON DELETE SET NULL,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create post_stuffed_animals table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS public.post_stuffed_animals (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  stuffed_animal_id UUID REFERENCES public.stuffed_animals(id) ON DELETE CASCADE NOT NULL,
  PRIMARY KEY (post_id, stuffed_animal_id)
);

-- Create likes table
CREATE TABLE IF NOT EXISTS public.likes (
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  PRIMARY KEY (post_id, user_id)
);

-- Create comments table
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create indexes for better performance
CREATE INDEX idx_stuffed_animals_user_id ON public.stuffed_animals(user_id);
CREATE INDEX idx_stuffed_animals_is_public ON public.stuffed_animals(is_public);
CREATE INDEX idx_stuffed_animal_groups_user_id ON public.stuffed_animal_groups(user_id);
CREATE INDEX idx_trips_user_id ON public.trips(user_id);
CREATE INDEX idx_posts_user_id ON public.posts(user_id);
CREATE INDEX idx_posts_is_public ON public.posts(is_public);
CREATE INDEX idx_posts_created_at ON public.posts(created_at DESC);
CREATE INDEX idx_comments_post_id ON public.comments(post_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stuffed_animals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stuffed_animal_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trip_companions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_stuffed_animals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Stuffed Animals
CREATE POLICY "Public stuffed animals are viewable by everyone" ON public.stuffed_animals
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create own stuffed animals" ON public.stuffed_animals
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own stuffed animals" ON public.stuffed_animals
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own stuffed animals" ON public.stuffed_animals
  FOR DELETE USING (auth.uid() = user_id);

-- Groups
CREATE POLICY "Users can view own groups" ON public.stuffed_animal_groups
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own groups" ON public.stuffed_animal_groups
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own groups" ON public.stuffed_animal_groups
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own groups" ON public.stuffed_animal_groups
  FOR DELETE USING (auth.uid() = user_id);

-- Group Members
CREATE POLICY "Users can view own group members" ON public.group_members
  FOR SELECT USING (EXISTS (
    SELECT 1 FROM public.stuffed_animal_groups 
    WHERE id = group_id AND user_id = auth.uid()
  ));

CREATE POLICY "Users can manage own group members" ON public.group_members
  FOR ALL USING (EXISTS (
    SELECT 1 FROM public.stuffed_animal_groups 
    WHERE id = group_id AND user_id = auth.uid()
  ));

-- Trips
CREATE POLICY "Users can view own trips" ON public.trips
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own trips" ON public.trips
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trips" ON public.trips
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own trips" ON public.trips
  FOR DELETE USING (auth.uid() = user_id);

-- Posts
CREATE POLICY "Public posts are viewable by everyone" ON public.posts
  FOR SELECT USING (is_public = true OR auth.uid() = user_id);

CREATE POLICY "Users can create own posts" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts" ON public.posts
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts" ON public.posts
  FOR DELETE USING (auth.uid() = user_id);

-- Likes
CREATE POLICY "Likes are viewable by everyone" ON public.likes
  FOR SELECT USING (true);

CREATE POLICY "Users can create own likes" ON public.likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own likes" ON public.likes
  FOR DELETE USING (auth.uid() = user_id);

-- Comments
CREATE POLICY "Comments are viewable by everyone" ON public.comments
  FOR SELECT USING (true);

CREATE POLICY "Users can create own comments" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments" ON public.comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments" ON public.comments
  FOR DELETE USING (auth.uid() = user_id);

-- Create functions for updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER handle_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_stuffed_animals_updated_at BEFORE UPDATE ON public.stuffed_animals
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_stuffed_animal_groups_updated_at BEFORE UPDATE ON public.stuffed_animal_groups
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_trips_updated_at BEFORE UPDATE ON public.trips
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_posts_updated_at BEFORE UPDATE ON public.posts
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER handle_comments_updated_at BEFORE UPDATE ON public.comments
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();