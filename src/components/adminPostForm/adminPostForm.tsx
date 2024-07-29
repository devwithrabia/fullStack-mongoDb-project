'use client'

import { useFormState } from 'react-dom'
import styles from './adminPostForm.module.css'
import { addPost } from '@/lib/action'

const AdminPostForm = (userId: any) => {
  const [state, formAction] = useFormState(addPost, undefined)
  console.log(userId)

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Post</h1>
      <input type='hidden' name='userId' value={userId} />
      <input type='text' name='title' placeholder='Title' />
      <input type='text' name='slug' placeholder='slug' />
      <input type='text' name='img' placeholder='img' />
      <textarea  name='desc' placeholder='desc' rows={10} />

      <button>Add</button>
      {state && state.error}
    </form>
  )
}

export default AdminPostForm
