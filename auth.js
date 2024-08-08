import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import prisma from "./lib/prisma"
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { authConfig } from "./auth.config";

const login = async (credentials) => {
  try {
      const user = await prisma.user.findUnique({
          where:{
              email: credentials.email
          }
      })
      if(!user){
          throw new Error("Wrong Credentials")
      }
      const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );
    
        if (!isPasswordCorrect) throw new Error("Wrong credentials!");
    
        return user;
  } catch (error) {
      console.log("Login Error " + error);
      throw new Error("Failed to login!");
  }
}


export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [Google, 
    CredentialsProvider({
      async authorize(credentials){
           try {
              const user = await login(credentials);
              console.log("User LoggedIn " + user)
              return user;
           } catch (error) {
              console.log("Provider Error " + error)
              return null
           }
      }
  })
  ],
  
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('User:', user);
      console.log('Account:', account);
      console.log('Profile:', profile);
  
      if (account.provider === 'google') {
        try {
          const existingUser = await prisma.user.findUnique({
            where: {
              email: profile.email,
            },
          });
          if (profile?.email == "thejayadad@gmail.com.com") {
            role = "ADMIN";
          }
          if (!existingUser) {
            await prisma.user.create({
              data: {
                name: profile.name,
                email: profile.email,
                image: profile.picture, // Ensure you're using the correct field for the image
                role: "USER"
              },
            });
          }
          return existingUser;
        } catch (error) {
          console.error('OAuth Error:', error);
          return false;
        }
      }
      return true;
    },
  ...authConfig.callbacks,
  },

  
})
