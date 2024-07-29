import { getUser } from '@/lib/data'
import styles from './postUser.module.css'
import Image from 'next/image'

// const getData = async (userId:any) => {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { next: { revalidate: 3600 } })

//     if (!res.ok) {
//       throw new Error('something went wrong')
//     }

//     return res.json()
//   }

export const PostUser = async ({ userId }: any) => {
  const user: any = await getUser(userId)
  console.log(user)

  return (
    <>
      <div className={styles.container}>
        <Image
          src={user.img ? user.img : '/noavatar.png'}
          alt='logo'
          width={50}
          height={50}
          className={styles.avatar}
        />

        <div className={styles.texts}>
          <span className={styles.title}>Author</span>

          <span className={styles.username}>{user.username}</span>
        </div>
      </div>
    </>
  )
}
