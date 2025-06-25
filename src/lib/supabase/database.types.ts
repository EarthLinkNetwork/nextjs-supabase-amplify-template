export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          username: string | null
          display_name: string | null
          avatar: string | null
          bio: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          display_name?: string | null
          avatar?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          display_name?: string | null
          avatar?: string | null
          bio?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      stuffed_animals: {
        Row: {
          id: string
          user_id: string
          name: string
          family_date: string
          location_name: string | null
          location_address: string | null
          location_latitude: number | null
          location_longitude: number | null
          location_map_url: string | null
          description: string | null
          tags: string[] | null
          images: string[] | null
          main_image: string
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          family_date: string
          location_name?: string | null
          location_address?: string | null
          location_latitude?: number | null
          location_longitude?: number | null
          location_map_url?: string | null
          description?: string | null
          tags?: string[] | null
          images?: string[] | null
          main_image: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          family_date?: string
          location_name?: string | null
          location_address?: string | null
          location_latitude?: number | null
          location_longitude?: number | null
          location_map_url?: string | null
          description?: string | null
          tags?: string[] | null
          images?: string[] | null
          main_image?: string
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      stuffed_animal_groups: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          images: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          description?: string | null
          images?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          description?: string | null
          images?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      group_members: {
        Row: {
          group_id: string
          stuffed_animal_id: string
          added_at: string
        }
        Insert: {
          group_id: string
          stuffed_animal_id: string
          added_at?: string
        }
        Update: {
          group_id?: string
          stuffed_animal_id?: string
          added_at?: string
        }
      }
      trips: {
        Row: {
          id: string
          user_id: string
          name: string
          start_date: string
          end_date: string | null
          location_name: string | null
          location_address: string | null
          location_latitude: number | null
          location_longitude: number | null
          location_map_url: string | null
          images: string[] | null
          description: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          start_date: string
          end_date?: string | null
          location_name?: string | null
          location_address?: string | null
          location_latitude?: number | null
          location_longitude?: number | null
          location_map_url?: string | null
          images?: string[] | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          start_date?: string
          end_date?: string | null
          location_name?: string | null
          location_address?: string | null
          location_latitude?: number | null
          location_longitude?: number | null
          location_map_url?: string | null
          images?: string[] | null
          description?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      trip_companions: {
        Row: {
          trip_id: string
          stuffed_animal_id: string
        }
        Insert: {
          trip_id: string
          stuffed_animal_id: string
        }
        Update: {
          trip_id?: string
          stuffed_animal_id?: string
        }
      }
      posts: {
        Row: {
          id: string
          user_id: string
          content: string
          images: string[] | null
          trip_id: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: string
          images?: string[] | null
          trip_id?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: string
          images?: string[] | null
          trip_id?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      post_stuffed_animals: {
        Row: {
          post_id: string
          stuffed_animal_id: string
        }
        Insert: {
          post_id: string
          stuffed_animal_id: string
        }
        Update: {
          post_id?: string
          stuffed_animal_id?: string
        }
      }
      likes: {
        Row: {
          post_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          post_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          post_id?: string
          user_id?: string
          created_at?: string
        }
      }
      comments: {
        Row: {
          id: string
          post_id: string
          user_id: string
          content: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          post_id: string
          user_id: string
          content: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          post_id?: string
          user_id?: string
          content?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}