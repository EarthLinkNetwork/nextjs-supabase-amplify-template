import { createClient } from '@/lib/supabase/client'
import { Database } from '@/lib/supabase/database.types'
import { StuffedAnimal, StuffedAnimalGroup, Trip, Post, Comment } from '@/types'

type StuffedAnimalRow = Database['public']['Tables']['stuffed_animals']['Row']
type StuffedAnimalInsert = Database['public']['Tables']['stuffed_animals']['Insert']

export const supabaseDataService = {
  stuffedAnimals: {
    async getAll(userId: string): Promise<StuffedAnimal[]> {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('stuffed_animals')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return (data || []).map(row => ({
        id: row.id,
        userId: row.user_id,
        name: row.name,
        familyDate: new Date(row.family_date),
        location: {
          name: row.location_name || '',
          address: row.location_address,
          latitude: row.location_latitude || undefined,
          longitude: row.location_longitude || undefined,
          mapUrl: row.location_map_url,
        },
        description: row.description,
        tags: row.tags || [],
        images: row.images || [],
        mainImage: row.main_image,
        isPublic: row.is_public,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
      }))
    },

    async getById(id: string): Promise<StuffedAnimal | null> {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('stuffed_animals')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        if (error.code === 'PGRST116') return null
        throw error
      }

      if (!data) return null

      return {
        id: data.id,
        userId: data.user_id,
        name: data.name,
        familyDate: new Date(data.family_date),
        location: {
          name: data.location_name || '',
          address: data.location_address,
          latitude: data.location_latitude || undefined,
          longitude: data.location_longitude || undefined,
          mapUrl: data.location_map_url,
        },
        description: data.description,
        tags: data.tags || [],
        images: data.images || [],
        mainImage: data.main_image,
        isPublic: data.is_public,
        createdAt: new Date(data.created_at),
        updatedAt: new Date(data.updated_at),
      }
    },

    async create(data: Omit<StuffedAnimal, 'id' | 'createdAt' | 'updatedAt'>): Promise<StuffedAnimal> {
      const supabase = createClient()
      
      const insertData: StuffedAnimalInsert = {
        user_id: data.userId,
        name: data.name,
        family_date: data.familyDate.toISOString().split('T')[0],
        location_name: data.location.name,
        location_address: data.location.address,
        location_latitude: data.location.latitude,
        location_longitude: data.location.longitude,
        location_map_url: data.location.mapUrl,
        description: data.description,
        tags: data.tags,
        images: data.images,
        main_image: data.mainImage,
        is_public: data.isPublic,
      }

      const { data: newData, error } = await supabase
        .from('stuffed_animals')
        .insert(insertData)
        .select()
        .single()

      if (error) throw error

      return {
        id: newData.id,
        userId: newData.user_id,
        name: newData.name,
        familyDate: new Date(newData.family_date),
        location: {
          name: newData.location_name || '',
          address: newData.location_address,
          latitude: newData.location_latitude || undefined,
          longitude: newData.location_longitude || undefined,
          mapUrl: newData.location_map_url,
        },
        description: newData.description,
        tags: newData.tags || [],
        images: newData.images || [],
        mainImage: newData.main_image,
        isPublic: newData.is_public,
        createdAt: new Date(newData.created_at),
        updatedAt: new Date(newData.updated_at),
      }
    },

    async update(id: string, data: Partial<StuffedAnimal>): Promise<StuffedAnimal | null> {
      const supabase = createClient()
      
      const updateData: any = {}
      
      if (data.name !== undefined) updateData.name = data.name
      if (data.familyDate !== undefined) updateData.family_date = data.familyDate.toISOString().split('T')[0]
      if (data.location !== undefined) {
        updateData.location_name = data.location.name
        updateData.location_address = data.location.address
        updateData.location_latitude = data.location.latitude
        updateData.location_longitude = data.location.longitude
        updateData.location_map_url = data.location.mapUrl
      }
      if (data.description !== undefined) updateData.description = data.description
      if (data.tags !== undefined) updateData.tags = data.tags
      if (data.images !== undefined) updateData.images = data.images
      if (data.mainImage !== undefined) updateData.main_image = data.mainImage
      if (data.isPublic !== undefined) updateData.is_public = data.isPublic

      const { data: updatedData, error } = await supabase
        .from('stuffed_animals')
        .update(updateData)
        .eq('id', id)
        .select()
        .single()

      if (error) {
        if (error.code === 'PGRST116') return null
        throw error
      }

      if (!updatedData) return null

      return {
        id: updatedData.id,
        userId: updatedData.user_id,
        name: updatedData.name,
        familyDate: new Date(updatedData.family_date),
        location: {
          name: updatedData.location_name || '',
          address: updatedData.location_address,
          latitude: updatedData.location_latitude || undefined,
          longitude: updatedData.location_longitude || undefined,
          mapUrl: updatedData.location_map_url,
        },
        description: updatedData.description,
        tags: updatedData.tags || [],
        images: updatedData.images || [],
        mainImage: updatedData.main_image,
        isPublic: updatedData.is_public,
        createdAt: new Date(updatedData.created_at),
        updatedAt: new Date(updatedData.updated_at),
      }
    },

    async delete(id: string): Promise<boolean> {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('stuffed_animals')
        .delete()
        .eq('id', id)

      if (error) throw error

      return true
    }
  },

  groups: {
    async getAll(userId: string): Promise<StuffedAnimalGroup[]> {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('stuffed_animal_groups')
        .select(`
          *,
          group_members (
            stuffed_animal_id
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false })

      if (error) throw error

      return (data || []).map(row => ({
        id: row.id,
        userId: row.user_id,
        name: row.name,
        description: row.description,
        stuffedAnimalIds: row.group_members?.map((m: any) => m.stuffed_animal_id) || [],
        images: row.images || [],
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
      }))
    },

    async create(data: Omit<StuffedAnimalGroup, 'id' | 'createdAt' | 'updatedAt'>): Promise<StuffedAnimalGroup> {
      const supabase = createClient()
      
      const { data: newGroup, error: groupError } = await supabase
        .from('stuffed_animal_groups')
        .insert({
          user_id: data.userId,
          name: data.name,
          description: data.description,
          images: data.images,
        })
        .select()
        .single()

      if (groupError) throw groupError

      if (data.stuffedAnimalIds.length > 0) {
        const { error: membersError } = await supabase
          .from('group_members')
          .insert(
            data.stuffedAnimalIds.map(stuffedAnimalId => ({
              group_id: newGroup.id,
              stuffed_animal_id: stuffedAnimalId,
            }))
          )

        if (membersError) throw membersError
      }

      return {
        id: newGroup.id,
        userId: newGroup.user_id,
        name: newGroup.name,
        description: newGroup.description,
        stuffedAnimalIds: data.stuffedAnimalIds,
        images: newGroup.images || [],
        createdAt: new Date(newGroup.created_at),
        updatedAt: new Date(newGroup.updated_at),
      }
    }
  },

  trips: {
    async getAll(userId: string): Promise<Trip[]> {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('trips')
        .select(`
          *,
          trip_companions (
            stuffed_animal_id
          )
        `)
        .eq('user_id', userId)
        .order('start_date', { ascending: false })

      if (error) throw error

      return (data || []).map(row => ({
        id: row.id,
        userId: row.user_id,
        name: row.name,
        startDate: new Date(row.start_date),
        endDate: row.end_date ? new Date(row.end_date) : undefined,
        location: {
          name: row.location_name || '',
          address: row.location_address,
          latitude: row.location_latitude || undefined,
          longitude: row.location_longitude || undefined,
          mapUrl: row.location_map_url,
        },
        stuffedAnimalIds: row.trip_companions?.map((c: any) => c.stuffed_animal_id) || [],
        images: row.images || [],
        description: row.description,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
      }))
    },

    async create(data: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Promise<Trip> {
      const supabase = createClient()
      
      const { data: newTrip, error: tripError } = await supabase
        .from('trips')
        .insert({
          user_id: data.userId,
          name: data.name,
          start_date: data.startDate.toISOString().split('T')[0],
          end_date: data.endDate?.toISOString().split('T')[0],
          location_name: data.location.name,
          location_address: data.location.address,
          location_latitude: data.location.latitude,
          location_longitude: data.location.longitude,
          location_map_url: data.location.mapUrl,
          images: data.images,
          description: data.description,
        })
        .select()
        .single()

      if (tripError) throw tripError

      if (data.stuffedAnimalIds.length > 0) {
        const { error: companionsError } = await supabase
          .from('trip_companions')
          .insert(
            data.stuffedAnimalIds.map(stuffedAnimalId => ({
              trip_id: newTrip.id,
              stuffed_animal_id: stuffedAnimalId,
            }))
          )

        if (companionsError) throw companionsError
      }

      return {
        id: newTrip.id,
        userId: newTrip.user_id,
        name: newTrip.name,
        startDate: new Date(newTrip.start_date),
        endDate: newTrip.end_date ? new Date(newTrip.end_date) : undefined,
        location: {
          name: newTrip.location_name || '',
          address: newTrip.location_address,
          latitude: newTrip.location_latitude || undefined,
          longitude: newTrip.location_longitude || undefined,
          mapUrl: newTrip.location_map_url,
        },
        stuffedAnimalIds: data.stuffedAnimalIds,
        images: newTrip.images || [],
        description: newTrip.description,
        createdAt: new Date(newTrip.created_at),
        updatedAt: new Date(newTrip.updated_at),
      }
    }
  },

  posts: {
    async getTimeline(userId?: string): Promise<Post[]> {
      const supabase = createClient()
      
      let query = supabase
        .from('posts')
        .select(`
          *,
          post_stuffed_animals (
            stuffed_animal_id
          ),
          likes (
            user_id
          ),
          profiles!posts_user_id_fkey (
            username,
            display_name,
            avatar
          )
        `)
        .order('created_at', { ascending: false })

      if (!userId) {
        query = query.eq('is_public', true)
      } else {
        query = query.or(`is_public.eq.true,user_id.eq.${userId}`)
      }

      const { data, error } = await query

      if (error) throw error

      return (data || []).map(row => ({
        id: row.id,
        userId: row.user_id,
        content: row.content,
        images: row.images || [],
        stuffedAnimalIds: row.post_stuffed_animals?.map((psa: any) => psa.stuffed_animal_id) || [],
        tripId: row.trip_id,
        isPublic: row.is_public,
        likes: row.likes?.map((l: any) => l.user_id) || [],
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
      }))
    },

    async create(data: Omit<Post, 'id' | 'likes' | 'createdAt' | 'updatedAt'>): Promise<Post> {
      const supabase = createClient()
      
      const { data: newPost, error: postError } = await supabase
        .from('posts')
        .insert({
          user_id: data.userId,
          content: data.content,
          images: data.images,
          trip_id: data.tripId,
          is_public: data.isPublic,
        })
        .select()
        .single()

      if (postError) throw postError

      if (data.stuffedAnimalIds.length > 0) {
        const { error: animalsError } = await supabase
          .from('post_stuffed_animals')
          .insert(
            data.stuffedAnimalIds.map(stuffedAnimalId => ({
              post_id: newPost.id,
              stuffed_animal_id: stuffedAnimalId,
            }))
          )

        if (animalsError) throw animalsError
      }

      return {
        id: newPost.id,
        userId: newPost.user_id,
        content: newPost.content,
        images: newPost.images || [],
        stuffedAnimalIds: data.stuffedAnimalIds,
        tripId: newPost.trip_id,
        isPublic: newPost.is_public,
        likes: [],
        createdAt: new Date(newPost.created_at),
        updatedAt: new Date(newPost.updated_at),
      }
    },

    async toggleLike(postId: string, userId: string): Promise<boolean> {
      const supabase = createClient()
      
      const { data: existingLike } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', userId)
        .single()

      if (existingLike) {
        const { error } = await supabase
          .from('likes')
          .delete()
          .eq('post_id', postId)
          .eq('user_id', userId)

        if (error) throw error
        return false
      } else {
        const { error } = await supabase
          .from('likes')
          .insert({
            post_id: postId,
            user_id: userId,
          })

        if (error) throw error
        return true
      }
    }
  },

  comments: {
    async getByPostId(postId: string): Promise<Comment[]> {
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('comments')
        .select(`
          *,
          profiles!comments_user_id_fkey (
            username,
            display_name,
            avatar
          )
        `)
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

      if (error) throw error

      return (data || []).map(row => ({
        id: row.id,
        postId: row.post_id,
        userId: row.user_id,
        content: row.content,
        createdAt: new Date(row.created_at),
        updatedAt: new Date(row.updated_at),
      }))
    },

    async create(data: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Comment> {
      const supabase = createClient()
      
      const { data: newComment, error } = await supabase
        .from('comments')
        .insert({
          post_id: data.postId,
          user_id: data.userId,
          content: data.content,
        })
        .select()
        .single()

      if (error) throw error

      return {
        id: newComment.id,
        postId: newComment.post_id,
        userId: newComment.user_id,
        content: newComment.content,
        createdAt: new Date(newComment.created_at),
        updatedAt: new Date(newComment.updated_at),
      }
    }
  }
}