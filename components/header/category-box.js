'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'
import qs from "query-string"

const CategoryBox = ({ label, icon: Icon, selected }) => {
  const router = useRouter()
  const params = useSearchParams()

  const handleClick = useCallback(() => {
    let currentQuerry = {} 
    if (params){
        currentQuerry = qs.parse(params.toString())
    }
    const updatedQuery = {
        ...currentQuerry,
        category: label
    }
    if(params?.get('category') === label){
        delete updatedQuery.category
    }
    const url = qs.stringifyUrl({
        url: '/',
        query: updatedQuery
    }, {skipNull: true})
    router.push(url)
  }, [label, params, router])
    return (
    <div 
    onClick={handleClick}
    className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-primary/10 transition cursor-pointer
    ${selected ? 'border-b-primary' : 'border-transparent'}
    ${selected ? 'text-primary' : 'text-neutral-600'}
    `}>
      <Icon size={24} /> {/* Use the icon component as a JSX element */}
        <div className='font-medium text-sm'>
            {label}
        </div>
    </div>
  )
}

export default CategoryBox