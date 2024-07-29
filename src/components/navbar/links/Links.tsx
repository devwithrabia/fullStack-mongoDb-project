'use client'
import styles from './links.module.css';
import Navlink from '../navlink/Navlink';
import Image from 'next/image';
import { useState } from 'react'
import { handleLogout } from '@/lib/action';

const links = [
  {
    title: 'HomePage',
    path: '/'
  },
  {
    title: 'About',
    path: '/about'
  },
  {
    title: 'Contact',
    path: '/contact'
  },
  {
    title: 'Blog',
    path: '/blog'
  }
]

const Links = ({session}:any) => {
  const [open, setIsOpen] = useState(false)


  return (
    <div className={styles.container}>
      <div className={styles.links}>
        {links.map(link => {
          return <Navlink item={link} />
        })}

        {session?.user ? (
          <>
            { <Navlink item={{ title: 'Admin', path: '/admin' }} />}

            <form action={handleLogout}>
            <button className={styles.logout}>LogOut</button>
            </form>
          </>
        ) : (
          <Navlink item={{ title: 'Login', path: '/login' }} />
        )}
      </div>
      

      <Image src='/btn.png' alt='logo' height={30} width={30} className={styles.menuButton} onClick={()=>setIsOpen((prev)=>!prev)} />

      {open && (
        <div className={styles.mobileLinks}>
          {links.map(link => {
            return <Navlink item={link} />
          })}
        </div>
      )}
    </div>
  )
}
export default Links
