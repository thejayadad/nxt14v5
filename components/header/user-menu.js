'use client'
import { Avatar } from '@nextui-org/react'
import Link from 'next/link'
import React, {useState} from 'react'
import { FiMenu } from 'react-icons/fi'
import RegisterUserForm from '../forms/register-user'
import ListingForm from '../forms/listing-form'
import {signOut} from "next-auth/react"
import LoginForm from '../forms/login-form'

{/* <RegisterUserForm /> */}

const UserMenu = ({user}) => {
    const [isOpen, setIsOpen] = useState(false);

    // Toggle dropdown visibility
    const toggleDropdown = () => {
      setIsOpen(prev => !prev);
    };
    const social = (provider) => {
      signOut(provider), {
     
      }
    }
  return (
    <div className='relative'>
        <div className='flex flex-row items-center gap-3'>
            <div
            className='hidden md:block text-sm font-semibold py-3 px-4 border rounded-md hover:bg-secondary transition cursor-pointer'
            >
                <ListingForm user={user} />
            </div>
            <div
            onClick={toggleDropdown}
            className='p-3 md:py-1 md:px-2 bg-primary text-secondary border-[1px] border-secondary flex flex-row items-center gap-3 rounded-md cursor-pointer hover:shadow-md transition'
            >
            <FiMenu className='h-4 w-4' />
            <div className='hidden md:block'>
                <Avatar
                  size='sm'
                  src={user?.image}
                />
            </div>
            </div>
        </div>
        
        {/* User drop down menu info */}

        {user ?
        <>
            {isOpen && (
             <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
             <div className="flex flex-col p-2">
                <div
                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                <ListingForm user={user} />
                </div>
               <div 
               onClick={social}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                 LogOut
               </div>
           
             </div>
           </div>
      )}
        </>
        :
        <>
              {isOpen && (
             <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200">
             <div className="flex flex-col p-2 ">
            <RegisterUserForm />
            <LoginForm />
             </div>
           </div>
      )}
        </>    
    
    }
    </div>
  )
}

export default UserMenu