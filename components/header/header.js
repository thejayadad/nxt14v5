import React from 'react'
import Box from '../box'
import Logo from '../logo'
import Search from './search'
import UserMenu from './user-menu'
import { auth } from '@/auth'
import Categories from './categories'

const Header = async () => {
  const session = await auth()
  const user = session?.user
  return (
    <header className='w-full z-10 shadow-sm'>
        <nav className='py-4 border-b-[1px]'>
           <Box>
                <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
                    <Logo /> 
                    <Search />
                   { user?   <UserMenu user={user} />: <UserMenu user={user} />}
                </div>
           </Box>
        </nav>
        <Categories />
    </header>
  )
}

export default Header