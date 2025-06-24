export interface Location {
  name: string
  address?: string
  latitude?: number
  longitude?: number
  mapUrl?: string
}

export interface StuffedAnimal {
  id: string
  userId: string
  name: string
  familyDate: Date
  location: Location
  description?: string
  tags: string[]
  images: string[]
  mainImage: string
  isPublic: boolean
  createdAt: Date
  updatedAt: Date
}

export interface StuffedAnimalGroup {
  id: string
  userId: string
  name: string
  description?: string
  stuffedAnimalIds: string[]
  images: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Trip {
  id: string
  userId: string
  name: string
  startDate: Date
  endDate?: Date
  location: Location
  stuffedAnimalIds: string[]
  images: string[]
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface Post {
  id: string
  userId: string
  content: string
  images: string[]
  stuffedAnimalIds: string[]
  tripId?: string
  isPublic: boolean
  likes: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Comment {
  id: string
  postId: string
  userId: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  email: string
  username: string
  displayName: string
  avatar?: string
  bio?: string
  createdAt: Date
  updatedAt: Date
}