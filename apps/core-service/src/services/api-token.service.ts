import isEmpty from "lodash/isEmpty"
import rs from "randomstring"
import { prisma, Prisma, ApiToken } from "@ference/prisma"
import { HttpException } from "@/exceptions/HttpException"

import { checkProjectOwners } from "@/services/projects.service"

export type FindProjectApiTokensInput = {
  projectId: string
  userId: string
}

export type CreateApiTokenInput = {
  projectId: string
  userId: string
  input: Omit<Prisma.ApiTokenCreateInput, "project">
}

export type UpdateApiTokenInput = {
  userId: string
  id: number
  input: Pick<Prisma.ApiTokenUpdateInput, "lastUsedAt" | "name">
}

export type DeleteApiTokenInput = {
  userId: string
  id: number
}

type VerifyApiTokenInput = {
  token: string
  domain: string
}

export const findProjectApiTokens = async (input: FindProjectApiTokensInput): Promise<ApiToken[]> => {
  const { projectId, userId } = input

  await checkProjectOwners({ projectId, userId })
  const tokens = await prisma.project.findUnique({ where: { id: projectId } }).apiTokens()
  return tokens || []
}

export const createApiToken = async (input: CreateApiTokenInput): Promise<ApiToken> => {
  const { projectId, userId, input: tokenInput } = input

  await checkProjectOwners({ projectId, userId })
  const apiToken = await prisma.apiToken.create({
    data: {
      ...tokenInput,
      project: { connect: { id: projectId } },
      token: rs.generate({ length: 32 }),
    },
  })
  return apiToken
}

export const updateApiToken = async (input: UpdateApiTokenInput): Promise<ApiToken> => {
  const { id, userId, input: updateInput } = input

  const token = await prisma.apiToken.findUnique({ where: { id } })
  if (isEmpty(token)) {
    throw new HttpException(400, "invalid update request")
  }
  await checkProjectOwners({ projectId: token.projectId, userId })
  const updatedToken = await prisma.apiToken.update({ where: { id }, data: updateInput })
  return updatedToken
}

export const deleteApiToken = async (input: DeleteApiTokenInput): Promise<ApiToken> => {
  const { id, userId } = input

  const token = await prisma.apiToken.findUnique({ where: { id } })
  if (isEmpty(token)) {
    throw new HttpException(400, "invalid delete request")
  }
  await checkProjectOwners({ projectId: token.projectId, userId })
  const deletedToken = await prisma.apiToken.delete({ where: { id } })
  return deletedToken
}

export const verifyApiToken = async (input: VerifyApiTokenInput): Promise<ApiToken> => {
  const { token, domain } = input

  const apiToken = await prisma.apiToken.findUnique({
    where: { token },
    include: { project: { select: { domain: true } } },
  })
  if (isEmpty(apiToken)) {
    throw new HttpException(401, "invalid api token")
  }
  if (apiToken.project.domain !== domain) {
    throw new HttpException(401, "invalid api token")
  }
  await prisma.apiToken.update({
    where: { id: apiToken.id },
    data: { lastUsedAt: new Date() },
  })
  return apiToken
}
