'use client'
import React from 'react'
import {FiSearch} from "react-icons/fi"

const Search = () => {
  return (
    <div
    className='border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer'
    >
        <div className='flex flex-row items-center justify-between'>
            <div className='text-sm font-semibold px-6'>
                AnyWhere
            </div>
            <div className='hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center'>
                Any Location
            </div>
            <div className='text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3'>
                <div className='hidden sm:block'>
                    Unlimited Passengers
                </div>
                <div className='p-2 bg-primary rounded-full text-white'>
                    <FiSearch className='h-4 w-4' />
                </div>
            </div>
        </div>
    </div>
  )
}

export default Search