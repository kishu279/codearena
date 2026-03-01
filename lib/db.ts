import { prisma } from "@/lib/prisma"

// DB FUNCTIONS

// CREATE THE USER ON THE TABLE
export const createUser = async (name: string, email: string, image: string) => {
  const user = await prisma.user.create({
    data: {
      name,
      email,
    }
  })

  console.log("User created successfully", user)
  return user
}

// FIND USER BY EMAIL
export const findUserByEmail = async (email: string) => {
  return prisma.user.findUnique({
    where: { email }
  })
}