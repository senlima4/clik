import { prisma, Prisma, User } from "@ference/prisma"

export const findAllUser = async (): Promise<User[]> => {
  const allUser: User[] = await prisma.user.findMany()
  return allUser
}

export const findUserById = async (id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({ where: { id } })
  return user
}

export const createUser = async (input: Prisma.UserCreateInput): Promise<User> => {
  const user = await prisma.user.create({ data: input })
  return user
}

export const updateUser = async (id: string, input: Prisma.UserUpdateInput): Promise<User> => {
  const user = await prisma.user.update({ where: { id }, data: input })
  return user
}

export const deleteUser = async (id: string): Promise<User> => {
  const user = await prisma.user.delete({ where: { id } })
  return user
}
