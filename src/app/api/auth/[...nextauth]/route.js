import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { connectDB } from "@/utils/connectdb";
import "dotenv/config"; // Ensure dotenv is configured correctly

const prisma = new PrismaClient();
const handle=  NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Add the user's ID to the session object
      const sessionUser = await prisma.user.findUnique({
        where: {
          email: session.user.email,
          username: session.user.name,
        },
      });

      session.user.id = sessionUser?.id;
      return session;
    },
    async jwt({ token, user }) {
      // Persist the user's ID to the token object
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async signIn({ profile }) {
      try {
        // Ensure the database connection is established
        await connectDB();

        // Check if the user already exists in the database
        const userExists = await prisma.user.findUnique({
          where: {
            email: profile.email,
            username: profile.name
          },
        });

        // If the user does not exist, create a new user record
        if (!userExists) {
          await prisma.user.create({
            data: {
              email: profile.email,
              user_profile: profile.picture,
              username: profile.name,
              password: profile.at_hash, // Be cautious with storing passwords directly
            },
          });
        }
        return true;
      } catch (error) {
        console.error(error);
        return false;
      }
    },
  },
});

export { handle as GET, handle as POST };