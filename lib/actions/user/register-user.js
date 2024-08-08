'use server'
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

export async function registerUser(formData){
    try {
        const {name, email, password} = formData
        const existingEmail = await prisma.user.findUnique({
            where: {
                email
            }
        })
        if(existingEmail){
            return new Error("Email already in use")
        }
        const hashedPassword = await bcrypt.hash(password, 12)
        const user = await prisma.user.create({
            data: {
                email, password: hashedPassword, name
            }
        })
        return user
    } catch (error) {
        console.log("Create Error " + error)
    }
}