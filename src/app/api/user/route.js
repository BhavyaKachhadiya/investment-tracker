import { PrismaClient } from "@prisma/client";
import { connectDB } from "@/utils/connectdb";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export const GET = async (req) => {
  try {
    await connectDB();
    const users = await prisma.user.findMany({
      include: { investments: true },
    });
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export const POST = async (req, res) => {
  try {
    const { username, password } = await req.json();
    await connectDB();

    // Create the post with the user ID and category name
    const user_create = await prisma.user.create({
      data: {
        username,
        password,
      },
    });

    // Return the updated user including their posts in the response
    return NextResponse.json({ user_create }, { status: 200 });
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
    const { id, username, password } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    await connectDB();
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        username,
        password, // Consider hashing password before storing
      },
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ updatedUser }, { status: 200 });
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
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    await connectDB();
    const deletedUser = await prisma.user.delete({
      where: { id },
    });

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
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
