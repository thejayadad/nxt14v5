'use client'
import React from 'react'

const CategoryItem = ({onClick, selected, label, icon: Icon}) => {
  return (
    <div
    onClick={()=> onClick(label)}
    className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-neutral-500 hover:bg-neutral-200 transition cursor-pointer
        ${selected ? 'border-secondary' : 'border-neutral-800'}
        ${selected ? 'bg-neutral-300' : 'border-neutral-800'}

        `}
    >
        <Icon size={26} />
        <div className='font-semibold'>{label}</div>
    </div>
  )
}

export default CategoryItem