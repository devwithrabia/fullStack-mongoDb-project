'use server'

import { signIn, signOut } from '@/lib/auth'
import { connectDB } from './utils'
import { Post, User } from './models'
import bcrypt from 'bcryptjs'
import { revalidatePath } from 'next/cache'
export const handleGithubLogin = async () => {
  await signIn('github')
}

export const handleLogout = async () => {
  await signOut()
}

export const handleRegister = async (previousState: any, formData: any) => {
  const { username, email, password, passwordRepeat, img } = Object.fromEntries(formData)
  console.log(username, email, password)

  if (password !== passwordRepeat) {
    return { error: 'password do not match' }
  }

  try {
    connectDB()

    const user = await User.findOne({ username })

    if (user) {
      return { error: 'username already exists' }
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      img
    })

    await newUser.save()

    console.log('saved to database')

    return { success: true }
  } catch (error) {
    console.log(error)

    return { error: 'something went wrong' }
  }
}

export const handleCredentialLogin = async (prevState: any, formData: any) => {
  const { username, password } = Object.fromEntries(formData)
  console.log(username, password)

  try {
    await signIn('credentials', { username, password })
  } catch (err: any) {
    console.log(err)

    if (err.message.includes('CredentialsSignin')) {
      return { error: 'invalid username or password' }
    }

    throw err
  }
}

export const addPost = async (prevState: any, formData: any) => {
  const { userId, title, desc, slug,img } = Object.fromEntries(formData)

  try {
    connectDB()
    const newPost = new Post({
      userId,
      title,
      desc,
      slug,
      img,
    })

    await newPost.save()

    console.log('saved to db')
    revalidatePath('/blog')
    revalidatePath('/admin')
  } catch (err: any) {
    console.log(err)

    return { error: 'something went wrong' }
  }
}

export const addUser = async (prevState: any, formData: any) => {
  const { username, email, password, img,isAdmin } = Object.fromEntries(formData)

  try {
    connectDB()
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
      username,
      email,
      password:hashedPassword,
      img,
      isAdmin
    })

    await newUser.save()

    console.log('saved to db')
    revalidatePath('/admin')
  } catch (err: any) {
    console.log(err)

    return { error: 'something went wrong' }
  }
}

export const deletePost = async (formData: any) => {
  const { id } = Object.fromEntries(formData)

  try {
    connectDB()
    await Post.findByIdAndDelete(id)
    console.log('deleted from db')
    revalidatePath('/blog')
    revalidatePath('/admin')
  } catch (err: any) {
    console.log(err)

    return { error: 'something went wrong' }
  }
}

export const deleteUser = async (formData: any) => {
  const { id } = Object.fromEntries(formData)

  try {
    connectDB()
    await User.findByIdAndDelete(id)
    console.log('deleted from db')
    revalidatePath('/admin')
  } catch (err: any) {
    console.log(err)

    return { error: 'something went wrong' }
  }
}
