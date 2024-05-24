// pages/api/setgoal.js
import { PrismaClient } from '@prisma/client';
import { connectDB } from "@/utils/connectdb";
import { NextResponse } from "next/server";
import "dotenv/config";

const prisma = new PrismaClient();

export const PUT = async (req, res) => {

  try {
    const {
     goal,user_email,username
    } = await req.json();

   

    await connectDB();
    const updatedInvestment = await prisma.user.update({
      where: { email: user_email,username: username},
      data: {
        investmentgoal:Number(goal)
      },
    });

    if (!updatedInvestment) {
      return NextResponse.json(
        { error: "Investment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ updatedInvestment }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
