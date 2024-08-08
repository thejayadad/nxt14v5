'use server'
import { signIn } from "@/auth"

export const authenicate = async(formData) => {
    const {email, password} = formData
    try {
        await signIn("credentials", {email, password})
    } catch (error) {
     console.log("Credentials Error  " + error)
        throw error
    }
}