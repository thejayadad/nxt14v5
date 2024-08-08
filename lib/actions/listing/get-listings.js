'use server'

import prisma from "@/lib/prisma"

export default async function getListings(){
    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
        return listings
    } catch (error) {
        console.log("Get error " + error)
        throw new Error(error)
    }
}