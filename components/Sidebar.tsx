"use client"
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import Footer from './Footer'
import PlaidLink from './PlaidLink'
const Sidebar=({user}: SiderbarProps)=>{

    const pathname = usePathname(); 
    return (
        <section className="sidebar">
            <nav className="flex flex-col gap-4">
                <Link href="/"
                className="mb-12 flex cursor-pointer
                 items-center gap-2"
                >
                <Image
                src="/icons/logo.svg"
                width={34}
                height={34}
                alt="HorizonLogo"
                className="size-[24px] max-xl:size-14"
                />
                <h1 className="sidebar-logo">VaultPay</h1>
                </Link>
                {sidebarLinks.map((item)=>{

                    const isActive= pathname ===item.route || pathname.startsWith(`${item.route}/`)
                    return(
                        <Link className={cn('sidebar-link',{'bg-bank-gradient':isActive})} href={item.route} key={item.label}>
                            <div className='relative size-6'>
                                <Image width={24} height={24}
                                src={item.imgURL} alt={item.label}
                                //omitted fill properties fill={isActive} 
                                className={cn({'brightness-[3] invert-0':isActive})}
                                />
                            </div>
                            <p className={cn('sidebar-label', { '!text-white': isActive })}>
                                {item.label}
                            </p>
                        </Link>
                    )
                })}
                <PlaidLink
                user={user}
               
                />
            </nav>

            <Footer user={user}/>
        </section>
    )
}

export default Sidebar