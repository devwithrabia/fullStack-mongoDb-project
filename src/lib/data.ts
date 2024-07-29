//our own created data:
// const posts = [
//     { id:1, title:'Post 1', body:'............', userID:1},
//     { id:2, title:'Post 2', body:'............', userID:1},
//     { id:3, title:'Post 3', body:'............', userID:2},
//     { id:4, title:'Post 4', body:'............', userID:2},
//     { id:5, title:'Post 5', body:'............', userID:3},
//     { id:6, title:'Post 6', body:'............', userID:3},
//     { id:7, title:'Post 7', body:'............', userID:1},
// ]

import { Post, User } from './models'
import { connectDB } from './utils';
import { unstable_noStore as noStore } from 'next/cache';


// const users = [
//     {id:1, username:'john' },
//     {id:2, username:'karan' },
//     {id:3, username:'wikram' },

// ]

// export const getPosts = async()=>{
//     return posts
// }

// export const getPost = async(id:any)=>{
//     return posts.find((post)=>post.id === parseInt(id));
// }

// export const getUser = async(id:any)=>{
//     return users.find((user)=>user.id === id);
// }

//data fetch from mongoDB:

export const getPosts = async () => {
  try {
    connectDB();
    const posts = await Post.find();
    return posts;
  } catch (err) {
    console.log(err)
   throw new  Error('failed to fetch posts');
  }
}

export const getPost = async (slug:any) => {
    try {
      connectDB();
      const post = await Post.findOne({slug:slug});
      return post;
    } catch (err) {
      console.log(err)
     throw new  Error('failed to fetch post');
    }
  }

  export const getUser = async (id:any) => {

    noStore();
    try {
      connectDB();
      const user = await User.findOne(id);
      return user;
    } catch (err) {
      console.log(err)
     throw new  Error('failed to fetch user');
    }
  }

  export const getUsers = async () => {

    noStore();
    try {
      connectDB();
      const users = await User.find();
      return users;
    } catch (err) {
      console.log(err)
     throw new  Error('failed to fetch user');
    }
  }

 