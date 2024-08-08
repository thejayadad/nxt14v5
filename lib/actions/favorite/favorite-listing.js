'use server'
import prisma from "@/lib/prisma";
import { auth } from "@/auth";

export async function favorite(eventData) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    throw new Error('User not found');
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!existingUser) {
    throw new Error('User not found');
  }

  const { listingId } = eventData;
  let favoriteIds = existingUser.favoriteIds || [];

  if (!favoriteIds.includes(listingId)) {
    favoriteIds.push(listingId);
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return updatedUser;
}

export async function removeFavorite(eventData) {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    throw new Error('User not found');
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: user.email },
  });

  if (!existingUser) {
    throw new Error('User not found');
  }

  const { listingId } = eventData;
  let favoriteIds = existingUser.favoriteIds || [];

  favoriteIds = favoriteIds.filter(id => id !== listingId);

  const updatedUser = await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return updatedUser;
}
