import { Metadata } from 'next'
import styles from './contact.module.css'
import Image from 'next/image'

export const metadata: Metadata = {
  title: ' Contact Page',
  description: 'Contact description'
}

const Contact = () => {
  console.log('it works here')
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src='/contact.jpg' alt='logo' fill className={styles.img} />
      </div>

      <div className={styles.formContainer}>
        <form className={styles.form}>
          <input type='text' placeholder='Name and Surname' />

          <input type='text' placeholder='Email Address' />

          <input type='text' placeholder='phone Number (Optional)' />

          <textarea name='' id='' cols={30} rows={10} placeholder='Message'></textarea>

          <button>Send</button>
        </form>
      </div>
    </div>
  )
}
export default Contact
