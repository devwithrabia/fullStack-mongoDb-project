import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/utils'
import { Post } from '@/lib/models'

export const GET = async (req,{params}) => {
    const {slug} = params;
  try {
    connectDB();
    const post = await Post.findOne({slug:slug})
    return NextResponse.json(post)
  } catch (err) {
    console.log(err)
    throw new Error('failed to fetch post')
  }
}

export const DELETE = async (req,{params}) => {
  const {slug} = params;
try {
  connectDB();
  const post = await Post.findOne({slug:slug})
  return NextResponse.json(post)
} catch (err) {
  console.log(err)
  throw new Error('failed to fetch post')
}
}
