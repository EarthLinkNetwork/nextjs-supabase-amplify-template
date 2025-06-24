import { StuffedAnimal, StuffedAnimalGroup, Trip, Post, Comment } from '@/types'
import { mockStuffedAnimals, mockGroups, mockTrips, mockPosts, mockComments } from '@/data/mockData'

let stuffedAnimals = [...mockStuffedAnimals]
let groups = [...mockGroups]
let trips = [...mockTrips]
let posts = [...mockPosts]
let comments = [...mockComments]

export const dataService = {
  stuffedAnimals: {
    getAll: async (userId: string): Promise<StuffedAnimal[]> => {
      return stuffedAnimals.filter(sa => sa.userId === userId)
    },
    
    getById: async (id: string): Promise<StuffedAnimal | null> => {
      return stuffedAnimals.find(sa => sa.id === id) || null
    },
    
    create: async (data: Omit<StuffedAnimal, 'id' | 'createdAt' | 'updatedAt'>): Promise<StuffedAnimal> => {
      const newStuffedAnimal: StuffedAnimal = {
        ...data,
        id: `sa${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      stuffedAnimals.push(newStuffedAnimal)
      return newStuffedAnimal
    },
    
    update: async (id: string, data: Partial<StuffedAnimal>): Promise<StuffedAnimal | null> => {
      const index = stuffedAnimals.findIndex(sa => sa.id === id)
      if (index === -1) return null
      
      stuffedAnimals[index] = {
        ...stuffedAnimals[index],
        ...data,
        updatedAt: new Date()
      }
      return stuffedAnimals[index]
    },
    
    delete: async (id: string): Promise<boolean> => {
      const index = stuffedAnimals.findIndex(sa => sa.id === id)
      if (index === -1) return false
      
      stuffedAnimals.splice(index, 1)
      return true
    }
  },
  
  groups: {
    getAll: async (userId: string): Promise<StuffedAnimalGroup[]> => {
      return groups.filter(g => g.userId === userId)
    },
    
    create: async (data: Omit<StuffedAnimalGroup, 'id' | 'createdAt' | 'updatedAt'>): Promise<StuffedAnimalGroup> => {
      const newGroup: StuffedAnimalGroup = {
        ...data,
        id: `group${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      groups.push(newGroup)
      return newGroup
    }
  },
  
  trips: {
    getAll: async (userId: string): Promise<Trip[]> => {
      return trips.filter(t => t.userId === userId)
    },
    
    create: async (data: Omit<Trip, 'id' | 'createdAt' | 'updatedAt'>): Promise<Trip> => {
      const newTrip: Trip = {
        ...data,
        id: `trip${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      trips.push(newTrip)
      return newTrip
    }
  },
  
  posts: {
    getTimeline: async (userId?: string): Promise<Post[]> => {
      let timelinePosts = posts.filter(p => p.isPublic)
      if (userId) {
        const privatePosts = posts.filter(p => !p.isPublic && p.userId === userId)
        timelinePosts = [...timelinePosts, ...privatePosts]
      }
      return timelinePosts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    },
    
    create: async (data: Omit<Post, 'id' | 'likes' | 'createdAt' | 'updatedAt'>): Promise<Post> => {
      const newPost: Post = {
        ...data,
        id: `post${Date.now()}`,
        likes: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      posts.push(newPost)
      return newPost
    },
    
    toggleLike: async (postId: string, userId: string): Promise<Post | null> => {
      const post = posts.find(p => p.id === postId)
      if (!post) return null
      
      const likeIndex = post.likes.indexOf(userId)
      if (likeIndex === -1) {
        post.likes.push(userId)
      } else {
        post.likes.splice(likeIndex, 1)
      }
      post.updatedAt = new Date()
      return post
    }
  },
  
  comments: {
    getByPostId: async (postId: string): Promise<Comment[]> => {
      return comments.filter(c => c.postId === postId)
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
    },
    
    create: async (data: Omit<Comment, 'id' | 'createdAt' | 'updatedAt'>): Promise<Comment> => {
      const newComment: Comment = {
        ...data,
        id: `comment${Date.now()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      comments.push(newComment)
      return newComment
    }
  }
}