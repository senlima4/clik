import isEmpty from "lodash/isEmpty"
import includes from "lodash/includes"
import { prisma, Prisma, Project } from "@ference/prisma"
import { HttpException } from "@/exceptions/HttpException"

export type FindUserProjectsInput = {
  userId: string
  page?: number
  limit?: number
}

export type FindProjectByIdInput = {
  id: string
  userId: string
}

export type CreateProjectInput = Omit<Prisma.ProjectCreateInput, "users"> & { userId: string }

export type UpdateProjectInput = {
  id: string
  userId: string
  input: Prisma.ProjectUpdateInput
}

export type DeleteProjectInput = {
  id: string
  userId: string
}

export const checkProjectOwners = async (input: { projectId: string; userId: string }): Promise<void> => {
  const { projectId, userId } = input

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      projects: {
        select: { id: true },
      },
    },
  })
  if (!user) {
    throw new HttpException(401, "invalid action")
  }
  if (!includes(user.projects, { id: projectId })) {
    throw new HttpException(403, "No access to this project")
  }
}

export const findUserProjects = async (input: FindUserProjectsInput): Promise<Project[]> => {
  const { userId, page = 0, limit = 5 } = input

  const projects = await prisma.user
    .findUnique({
      where: { id: userId },
    })
    .projects({
      skip: page ? page * limit : 0,
      take: limit,
    })
  return projects || []
}

export const findProjectById = async (input: FindProjectByIdInput): Promise<Project> => {
  const { id, userId } = input

  const project = await prisma.project.findUnique({
    where: { id },
    include: { users: { where: { id: userId } } },
  })
  if (isEmpty(project) || isEmpty(project.users)) {
    throw new HttpException(404, "not found")
  }
  return project
}

export const createProject = async (input: CreateProjectInput): Promise<Project> => {
  const { userId, ...projectInput } = input

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { projects: { select: { id: true } } },
  })
  if (!user) {
    throw new HttpException(401, "invalid action")
  }
  if (user.projects.length >= 5) {
    throw new HttpException(403, "projects over limit")
  }

  const project = await prisma.project.create({
    data: {
      ...projectInput,
      users: { connect: { id: userId } },
    },
  })
  return project
}

export const updateProject = async (input: UpdateProjectInput): Promise<Project> => {
  const { id, input: updateInput, userId } = input
  await checkProjectOwners({ projectId: id, userId })
  const project = await prisma.project.update({ where: { id }, data: updateInput })
  return project
}

export const deleteProject = async (input: DeleteProjectInput): Promise<Project> => {
  const { id, userId } = input
  await checkProjectOwners({ projectId: id, userId })
  const project = await prisma.project.delete({ where: { id } })
  return project
}
