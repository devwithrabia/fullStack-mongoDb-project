"use client"
import Link from 'next/link'
import styles from './navlink.module.css'
import { usePathname } from 'next/navigation'

const Navlink = ({ item }: any) => {
  const pathName = usePathname()
  return (
    <div>
      <Link href={item.path} className={`${styles.container} ${pathName === item.path && styles.active}`}>
        {item.title}
      </Link>
    </div>
  )
}
export default Navlink
