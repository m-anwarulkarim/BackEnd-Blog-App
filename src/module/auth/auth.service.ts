import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    return "Data Not Found";
  }
  return users;
};

const getSingleUser = async (authId: string) => {
  return prisma.user.findUnique({
    where: { id: authId },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
    },
  });
};

export const authService = {
  getAllUsers,
  getSingleUser,
};
