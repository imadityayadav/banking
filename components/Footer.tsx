import { logoutAccount } from '@/lib/actions/user.actions'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

const Footer = ({user,type='desktop'}: FooterProps) => {
    const router = useRouter();
     const handleLogOut = async () => {
        const loggedOut = await logoutAccount();

        if(loggedOut)  router.push('/sign-in')
     }
  return (
    <footer className='footer'>
        <div className={type==='mobile' ?'footer_name-mobile' : 'footer_name'} >
            <p className='text-xl font-bold text-gray-700'>
                {user.name} 
            </p>
        </div>

        <div className={type==='mobile' ?'email-mobile' : 'footer_email'}>
            <h1 className='text-14 turncate font-normal text-gray-600'>
                {user.name}
            </h1>
            <p className='text-14 turncate text-gray-700 font-semibold'>
                {user.email}
            </p>
        </div>
        <div className='footer_image' onClick={handleLogOut}>
            <Image
            src='/icons/logout.svg'
            alt='Logout'
            width={24}
            height={24}
            />
        </div>
    </footer>
  )
  
}

export default Footer