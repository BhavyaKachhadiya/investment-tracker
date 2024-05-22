import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
export const connectDB=async() =>
{
    try {
        await prisma.$connect();
    } catch (error) {
        return new Error(error.message);
    }
} 