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
        select: {assetType:true,
             quantity:true,
             purchasePrice:true,
             symbol:true,
             stocktype:true,
        },

    })
    const idk = investment.reduce((acc, investment) => {
      const { stocktype, purchasePrice, quantity,symbol } = investment;
      if (!acc[symbol]) {
        acc[symbol] = {
          totalPurchasePrice: 0,
          totalQuantity: 0,
          totalPurchasePriceInTotal: 0,
          stocktype:null
        };
      }
      acc[symbol].totalPurchasePrice += purchasePrice;
      acc[symbol].totalQuantity += quantity;
      acc[symbol].totalPurchasePriceInTotal= acc[symbol].totalPurchasePrice*acc[symbol].totalQuantity;
      acc[symbol].stocktype = stocktype;
      return acc;
    }, {})
    return NextResponse.json( idk , { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};


