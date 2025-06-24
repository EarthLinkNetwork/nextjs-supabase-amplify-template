import { StuffedAnimal, StuffedAnimalGroup, Trip, Post, Comment, User } from '@/types'

export const mockUsers: User[] = [
  {
    id: 'user1',
    email: 'user@example.com',
    username: 'tomodachi_lover',
    displayName: 'ぬいぐるみ大好き',
    avatar: '/images/avatars/user1.jpg',
    bio: 'ぬいぐるみと一緒に世界中を旅しています',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
]

export const mockStuffedAnimals: StuffedAnimal[] = [
  {
    id: 'sa1',
    userId: 'user1',
    name: 'くまちゃん',
    familyDate: new Date('2023-05-15'),
    location: {
      name: '東京ディズニーランド',
      address: '千葉県浦安市舞浜1-1',
      latitude: 35.6329,
      longitude: 139.8804,
      mapUrl: 'https://maps.google.com/?q=35.6329,139.8804'
    },
    description: '初めて家族になったくまのぬいぐるみ。とても大切な友達です。',
    tags: ['くま', 'ディズニー', '茶色'],
    images: ['/images/stuffed-animals/bear1.jpg', '/images/stuffed-animals/bear2.jpg'],
    mainImage: '/images/stuffed-animals/bear1.jpg',
    isPublic: true,
    createdAt: new Date('2023-05-15'),
    updatedAt: new Date('2023-05-15')
  },
  {
    id: 'sa2',
    userId: 'user1',
    name: 'うさぴょん',
    familyDate: new Date('2023-08-20'),
    location: {
      name: '原宿キディランド',
      address: '東京都渋谷区神宮前6-1-9',
      latitude: 35.6695,
      longitude: 139.7052
    },
    description: 'ふわふわの白いうさぎ。いつも一緒に寝ています。',
    tags: ['うさぎ', '白', 'ふわふわ'],
    images: ['/images/stuffed-animals/rabbit1.jpg'],
    mainImage: '/images/stuffed-animals/rabbit1.jpg',
    isPublic: true,
    createdAt: new Date('2023-08-20'),
    updatedAt: new Date('2023-08-20')
  },
  {
    id: 'sa3',
    userId: 'user1',
    name: 'ペンペン',
    familyDate: new Date('2024-01-10'),
    location: {
      name: '旭山動物園',
      address: '北海道旭川市東旭川町倉沼',
      latitude: 43.7675,
      longitude: 142.4792
    },
    description: '北海道旅行で出会ったペンギンのぬいぐるみ',
    tags: ['ペンギン', '北海道', '旅行'],
    images: ['/images/stuffed-animals/penguin1.jpg'],
    mainImage: '/images/stuffed-animals/penguin1.jpg',
    isPublic: false,
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-10')
  }
]

export const mockGroups: StuffedAnimalGroup[] = [
  {
    id: 'group1',
    userId: 'user1',
    name: 'くまファミリー',
    description: 'くまのぬいぐるみたち',
    stuffedAnimalIds: ['sa1'],
    images: ['/images/groups/bears.jpg'],
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01')
  }
]

export const mockTrips: Trip[] = [
  {
    id: 'trip1',
    userId: 'user1',
    name: '北海道旅行',
    startDate: new Date('2024-01-08'),
    endDate: new Date('2024-01-12'),
    location: {
      name: '北海道',
      latitude: 43.0642,
      longitude: 141.3469
    },
    stuffedAnimalIds: ['sa1', 'sa3'],
    images: ['/images/trips/hokkaido1.jpg', '/images/trips/hokkaido2.jpg'],
    description: 'くまちゃんと一緒に北海道を満喫！ペンペンと出会った思い出の旅',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
]

export const mockPosts: Post[] = [
  {
    id: 'post1',
    userId: 'user1',
    content: '今日はくまちゃんと公園でピクニック！天気も良くて最高の一日でした🐻',
    images: ['/images/posts/picnic1.jpg'],
    stuffedAnimalIds: ['sa1'],
    isPublic: true,
    likes: ['user2', 'user3'],
    createdAt: new Date('2024-03-01T10:00:00'),
    updatedAt: new Date('2024-03-01T10:00:00')
  },
  {
    id: 'post2',
    userId: 'user1',
    content: '北海道旅行から帰ってきました！新しい家族のペンペンも一緒です🐧',
    images: ['/images/posts/hokkaido-return.jpg'],
    stuffedAnimalIds: ['sa1', 'sa3'],
    tripId: 'trip1',
    isPublic: true,
    likes: ['user2'],
    createdAt: new Date('2024-01-13T18:30:00'),
    updatedAt: new Date('2024-01-13T18:30:00')
  }
]

export const mockComments: Comment[] = [
  {
    id: 'comment1',
    postId: 'post1',
    userId: 'user2',
    content: 'くまちゃんかわいい！素敵な写真ですね',
    createdAt: new Date('2024-03-01T11:00:00'),
    updatedAt: new Date('2024-03-01T11:00:00')
  },
  {
    id: 'comment2',
    postId: 'post2',
    userId: 'user3',
    content: '北海道いいなー！ペンペンもかわいい',
    createdAt: new Date('2024-01-13T19:00:00'),
    updatedAt: new Date('2024-01-13T19:00:00')
  }
]