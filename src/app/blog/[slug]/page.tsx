import { PostUser } from '@/components/postUser/postUser'
import styles from './singlePost.module.css'
import Image from 'next/image'
import { getPost } from '@/lib/data'
import { Suspense } from 'react'

//Fetch data with an API:
const getData = async (slug:any) => {
  const res = await fetch(`http://localhost:3000/api/blog/${slug}`)

  if (!res.ok) {
    throw new Error('something went wrong')
  }

  return res.json()
}

export const generateMetadata = async ({ params }: any) => {
  const { slug } = params

  const post: any = await getData(slug)

  return {
    title: post.title,
    description: post.desc
  }
}

const SinglePostPage = async ({ params }: any) => {
  const { slug } = params
  const post= await getData(slug);

  // const post: any = await getPost(slug)
  console.log(post)

  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <div className={styles.imgContainer}>
          <Image src={post.img} alt='logo' fill className={styles.img} />
        </div>
      </div>

      <div className={styles.textContainer}>
        <h1 className={styles.title}>{post.title}</h1>

        <div className={styles.detail}>
          <Suspense fallback={<div>Loading......</div>}>
            <PostUser userId={post.userID} />
          </Suspense>

          <div className={styles.detailText}>
            <span className={styles.detailTitle}>Published</span>

            <span className={styles.detailValue}>01.01.2024</span>
          </div>
        </div>

        <p className={styles.content}>{post.desc}</p>
      </div>
    </div>
  )
}
export default SinglePostPage
