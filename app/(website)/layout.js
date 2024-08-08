import Header from '@/components/header/header'
import React from 'react'

const layout = ({children}) => {
  return (
    <div>
      <Header />
      {/* <div className='pb-20 pt-28'> */}
      {children}
      {/* </div> */}
    </div>
  )
}

export default layout