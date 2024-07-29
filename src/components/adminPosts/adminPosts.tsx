
import { getPosts } from '@/lib/data'
import styles from './adminPosts.module.css'
import Image from 'next/image'
import { deletePost } from '@/lib/action'

const AdminPosts = async () => {
  const Posts = await getPosts()



  return (
    <div className={styles.container}>
      <h1>Posts</h1>

      {Posts.map(post => {
        return (
          <div className={styles.post} key={post.id}>
            <div className={styles.detail}>
              <Image src={post.img || '/noavatar.png'} alt='' width={50} height={50} />

              <span>{post.title}</span>
            </div>
            <form action={deletePost}>
                <input type="hidden" name="id" value={post.id}/>
              <button className={styles.postButton}>Delete</button>
            </form>
          </div>
        )
      })}
    </div>
  )
}

export default AdminPosts
