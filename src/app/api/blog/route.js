import { NextResponse } from 'next/server'
import { connectDB} from '@/lib/utils'
import { Post } from '@/lib/models'

export const GET = async req => {
  try {
    connectDB()
    const posts = await Post.find()
    return NextResponse.json(posts)
  } catch (err) {
    console.log(err)
    throw new Error('failed to fetch posts')
  }
}
