import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectDB } from "@/utils/connectdb";
import { PrismaClient } from '@prisma/client'
import { NextResponse } from 'next/server';
const prisma = new PrismaClient();
const handle = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks:{
        async session({ session}){
            const sessionUser = await prisma.user.findFirst({
                where: {
                    email: session.user.email
                }
            })

            session.user.id = sessionUser.id;
            return session
        },
        async signIn({profile}){
            try {
                console.log(profile)
                await connectDB();
                const userExists = await prisma.user.findFirst({
                    where: {
                        email: profile.email
                    }
                });
                if (!userExists){
                    const user = await prisma.user.create({
                        data: {
                            email: profile.email,
                            user_profile: profile.picture,
                            name: profile.name,
                            password:profile.at_hash
                        }
                    });
                }
                return true;
            } catch (error) {
                console.log(error);
                return false
            }

        }
    }
})

export {handle as GET , handle as POST }