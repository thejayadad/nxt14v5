import { auth } from '@/auth'
import Box from '@/components/box'
import EmptyState from '@/components/home-items/empty-state'
import ListingCard from '@/components/home-items/listing-card'
import getListings from '@/lib/actions/listing/get-listings'
import React from 'react'

const HomePage = async () => {
  const session = await auth()
  const user = session?.user
  const isEmpty = true
  const listings  = await getListings()
  if(isEmpty.length){
    return (
      <EmptyState />
    )
  }
  return (
    <section >
      <Box>
        <div
        className='pt-12 grid grid-cols-1 sm:grid-cols-1 md:grid-col-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-8'
        >
      {listings.map((listing) => {
        return (
          <ListingCard
          currentUser={user}
          key={listing.id}
          data={listing}
          />
        )
      })}
        </div>
      </Box>
    </section>
  )
}

export default HomePage