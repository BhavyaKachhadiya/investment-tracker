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
    const { assetType, symbol, purchasePrice, quantity, dateAcquired, type } =
      await req.json();
    const user = await prisma.user.findUnique({
      where: { username: "Bhavya" }, // Replace with actual username
    });
    await connectDB();

    // Create the post with the user ID and category name
    const investment_create = await prisma.investment.create({
      data: {
        assetType,
        symbol,
        purchasePrice,
        quantity,
        dateAcquired,
        user: { connect: { id: user.id } },
        type,
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
