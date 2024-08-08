'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link
    href={'/'}
    className='flex items-center'
    >
    <Image
     alt='logo'
     className='hidden md:block cursor-pointer'
     height={60}
     width={60}
     src='/logo.png'
    />
    <span
     className='hidden md:block cursor-pointer'
    >DriveSwap</span>
    </Link>
  )
}

export default Logo