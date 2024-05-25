import { PrismaClient } from "@prisma/client";
import { connectDB } from "@/utils/connectdb";
import { NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;
export const GET = async (req,res) => {


  try {
    await connectDB();
    const token = await getToken({ req, secret });
   
    const investment = await prisma.investment.findMany({
        where:{
            user:{username: token.name}
        },
        select: {purchasePrice:true,quantity:true},

    })
    const totalInvestmentValue = investment.reduce((total, investment) => {
          return total + (investment.purchasePrice * investment.quantity);
      }, 0);
  
    return NextResponse.json( totalInvestmentValue , { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};


