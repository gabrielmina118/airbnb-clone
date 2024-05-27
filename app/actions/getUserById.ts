import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getUserById(id: string) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                id,
            },
        });
        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}
