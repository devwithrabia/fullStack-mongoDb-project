import { Metadata } from 'next'
import styles from './about.module.css'
import Image from 'next/image'

export const metadata: Metadata = {
  title: ' About Page',
  description: 'About description'
}

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Agency</h2>

        <h1 className={styles.title}>we create digital ideas that create a bigger,bolder,braver and better.</h1>

        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, consequuntur. Nesciunt natus aperiam, quia
          labore, nemo possimus unde in ab tempora necessitatibus velit et ut iure accusamus, recusandae ipsum dicta.
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim, consequuntur. Nesciunt natus aperiam, quia
          labore, nemo possimus unde in ab tempora necessitatibus velit et ut iure accusamus, recusandae ipsum dicta.
        </p>

        <div className={styles.boxes}>
          <div className={styles.box}>
            <h1>10 K+</h1>

            <p>years of experience</p>
          </div>

          <div className={styles.box}>
            <h1>10 K+</h1>

            <p>years of experience</p>
          </div>

          <div className={styles.box}>
            <h1>10 K+</h1>

            <p>years of experience</p>
          </div>
        </div>
      </div>

      <div className={styles.imgContainer}>
        <Image src='/about.png' alt='logo' fill className={styles.img}/>
      </div>
    </div>
  )
}
export default About
