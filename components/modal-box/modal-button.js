'use client'
import React from 'react'

const ModalButton = ({label, onClick, disabled, outline, small, icon}) => {
  return (
    <button
    onClick={onClick}
    disabled={disabled}
    className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full
        ${outline ? 'bg-white ': 'bg-primary'}
        ${outline ? 'border-primary' : 'text-white'}
        ${outline ? 'text-primary' : 'border-secondary'}
        ${small ? 'py-1': 'py-3'}
        ${small ? 'text-sm': 'text-md'}
        ${small ? 'font-light': 'font-semibold'}
        ${small ? 'border-[1px]': 'border-2'}

        `}
    >
        {icon && (
            <icon
            className='absolute left-4 top3'
            size={24}
            />
        )}
        {label}
    </button>
  )
}

export default ModalButton