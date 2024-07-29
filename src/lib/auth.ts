import NextAuth from 'next-auth'
import GitHub from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

import { connectDB } from './utils'
import { User } from './models'
import { authConfig } from './auth.config'

const login = async (credentials: any) => {
  try {
    connectDB()

    const user = await User.findOne({ username: credentials.username })

    if (!user) {
      throw new Error('wrong credentials')
    }

    const ispasswordCorrect = await bcrypt.compare(credentials.password, user.password)

    if (!ispasswordCorrect) {
      throw new Error('wrong credentials')
    }

    return user
  } catch (error) {
    console.log(error)
    throw new Error('Failed to login')
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({

  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    CredentialsProvider({
      async authorize(credentials) {

        try{
          const user= await login(credentials)
          return user;

        }catch(err){
          return null;

        }

      }
    })
  ],

  callbacks:{
    async signIn({ user, account, profile }: any) {
      console.log(user, account, profile)
      if (account.provider === 'github') {
        connectDB()
        try {
          const user = await User.findOne({ email: profile.email })
          if (!user) {
            const newUser = new User({
              username: profile.login,
              email: profile.email,
              Image: profile.image
            })

            await newUser.save()
          }
        } catch (err) {
          console.log(err)
          return false
        }
      }

      return true
    },

    ...authConfig.callbacks,

    


  }
})
