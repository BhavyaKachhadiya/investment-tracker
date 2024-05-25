import { PrismaClient } from "@prisma/client";
import { connectDB } from "@/utils/connectdb";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req) => {
  try {
    await connectDB();
    const investment = await prisma.investment.findMany();
    return NextResponse.json({ investment }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req, res) => {
  
  try {
    const {formData, user_email,username} =
      await req.json();
      console.log(formData,user_email,username);
    const user = await prisma.user.findUnique({
      where: { email: user_email,username: username }, // Replace with actual username
    });
    await connectDB();
    var assetType = formData.investmentType
    var assetType= assetType.toString().toUpperCase();

    var buySell = formData.buySell
    var buySell= buySell.toString().toUpperCase();

    var buyDate = formData.buyDate;
    buyDate =new Date(buyDate)

    // Create the post with the user ID and category name
    const investment_create = await prisma.investment.create({
      data: {
        assetType:assetType,
        symbol:formData.nameSymbol,
        purchasePrice:Number(formData.purchasePrice),
        quantity:Number(formData.quantity),
        dateAcquired:buyDate,
        user: { connect: { id: user.id } },
        type:buySell,
        stocktype:formData.StockType
      },
    });

    // Return the updated user including their posts in the response
    return NextResponse.json({ investment_create }, { status: 200 });
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

export const PUT = async (req, res) => {
  try {
    const {
      id,
      assetType,
      symbol,
      purchasePrice,
      quantity,
      dateAcquired,
      type,
      stocktype,
      investmentgoal
    } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing investment ID" },
        { status: 400 }
      );
    }

    await connectDB();
    const updatedInvestment = await prisma.investment.update({
      where: { id },
      data: {
        assetType,
        symbol,
        purchasePrice,
        quantity,
        dateAcquired,
        type,
        stocktype,
        investmentgoal
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

export const DELETE = async (req, res) => {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Missing investment ID" },
        { status: 400 }
      );
    }

    await connectDB();
    const deletedInvestment = await prisma.investment.delete({
      where: { id },
    });

    if (!deletedInvestment) {
      return NextResponse.json(
        { error: "Investment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Investment deleted successfully", deletedInvestment },
      { status: 200 }
    );
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
