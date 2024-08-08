'use client'
import React from 'react'
import Box from '../box'
import {FiTruck} from "react-icons/fi"
import {FaCar, FaCarAlt, FaCaravan} from "react-icons/fa"
import CategoryBox from './category-box'
import { usePathname, useSearchParams } from 'next/navigation'

export const categories = [
    {
      label: 'Truck',
      icon: FiTruck, // Pass the icon component itself, not as a JSX element
      description: 'Various Size All Purpose Truck!',
    },
    {
      label: 'Sedan',
      icon: FaCar, // Pass the icon component itself, not as a JSX element
      description: 'A Traditional Sedan that starts with four doors & seats!',
    },
    {
        label: 'Sports',
        icon: FaCarAlt, // Pass the icon component itself, not as a JSX element
        description: 'A need for a nice sports car and speed    !',
      },
      {
        label: 'Van',
        icon: FaCaravan, // Pass the icon component itself, not as a JSX element
        description: 'A Van to carry several passengers!',
      },
  ];

const Categories = () => {
    const params = useSearchParams()
    const category = params?.get('category')
    const pathname = usePathname()

    const isHomePage = pathname === '/'

    if(!isHomePage){
        return null
    }
  return (
    <Box>
        <div
        className='flex t-4 flex-row items-center justify-between overflow-x-auto'
        >
            {categories.map((cat) => (
                <CategoryBox
                key={cat.label}
                label={cat.label}
                selected={category === cat.label} 
                icon={cat.icon}
                />
            ))}
        </div>
    </Box>
  )
}

export default Categories