export interface BehancePost {
  id: string
  pieceNumber: number
  title: string
  description: string
  imageUrl: string
  behanceUrl: string
  publishedDate: Date
  tags?: string[]
}

export interface TimelineProps {
  posts: BehancePost[]
}

export interface PostCardProps {
  post: BehancePost
  index: number
}
