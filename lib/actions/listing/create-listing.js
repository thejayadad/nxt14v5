'use server'
import prisma from "@/lib/prisma"
import { auth } from "@/auth";

// title String
// description String
// imageSrc String
// createdAt DateTime @default(now())
// category String
// seatCount Int
// doorCount Int
// mpg String
// price Int
// features String
// location String
// createdById String?

export async function createListing(eventData){
    const session = await auth();
    const user = session?.user;
    if(!user){
        throw new Error('User not found');

    }
    const userEmail = user.email;
    try {
        const {title, description, imageSrc, category, seatCount, doorCount, mpg, price, features, location} = eventData;
        const existingUser = await prisma.user.findUnique({
            where: { email: userEmail },
        });

        if (!existingUser) {
            throw new Error('User not found');
        }

        const newListing = await prisma.listing.create({
            data: {
                title,
                description,
                imageSrc,
                category,
                seatCount,
                doorCount,
                mpg,
                price,
                features,
                location,
                createdById: existingUser.email,
            }
        });
        return newListing;
    } catch (error) {
        console.log("Create Listing: " + error);
        throw new Error('Failed to create listing.');
    }
}
