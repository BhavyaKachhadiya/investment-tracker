import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req, res) => {
  const session = await getSession({ req });

  try {
    const user = await prisma.user.findFirst({
      where: {
        email: session?.user?.email
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
