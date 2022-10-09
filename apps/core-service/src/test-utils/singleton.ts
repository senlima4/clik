import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended"

import prisma, { PrismaClient } from "@ference/prisma"

jest.mock("@ference/prisma", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

beforeEach(() => {
  mockReset(prismaMock)
})

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>
