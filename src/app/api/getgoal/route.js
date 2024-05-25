import { PrismaClient } from "@prisma/client";

import { NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;
export const GET = async (req, res) => {

  try {
    const token = await getToken({ req, secret });
   
    const user = await prisma.user.findUnique({
      where: {
        email: token.email,
        username: token.name,
      },
      select: {
        investmentgoal:true
      },
       
    });
    console.log(user.investmentgoal)
    return NextResponse.json(user.investmentgoal)
  } catch (error) {
    console.error("Error fetching goal:", error);
   return NextResponse.json(error.message)
  }
};
