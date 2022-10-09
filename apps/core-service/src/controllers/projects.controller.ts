import type { RequestWithUserHandler } from "@/types"
import {
  createProject,
  CreateProjectInput,
  findUserProjects,
  FindUserProjectsInput,
  findProjectById,
  updateProject,
  UpdateProjectInput,
  deleteProject,
} from "@services/projects.service"
import { HttpException } from "@/exceptions/HttpException"

interface IProjectsController {
  createOne: RequestWithUserHandler
  getListByUser: RequestWithUserHandler
  getOneById: RequestWithUserHandler
  updateOne: RequestWithUserHandler
  deleteOne: RequestWithUserHandler
}

export const ProjectsController: IProjectsController = {
  createOne: async (req, res, next) => {
    try {
      if (!req.user) throw new HttpException(401, "unauthorized")
      const input = req.body as Omit<CreateProjectInput, "userId">
      await createProject({ ...input, userId: req.user.id })
      res.status(201)
    } catch (error) {
      next(error)
    }
  },
  getListByUser: async (req, res, next) => {
    try {
      if (!req.user) throw new HttpException(401, "unauthorized")
      const { page, limit } = req.query
      const input: FindUserProjectsInput = {
        page: page ? Number(page) : 0,
        limit: limit ? Number(limit) : 5,
        userId: req.user.id,
      }

      const projects = await findUserProjects(input)
      res.status(200).json(projects)
    } catch (error) {
      next(error)
    }
  },
  getOneById: async (req, res, next) => {
    try {
      if (!req.user) throw new HttpException(401, "unauthorized")
      const project = await findProjectById({ id: req.params.id, userId: req.user.id })
      res.status(200).json(project)
    } catch (error) {
      next(error)
    }
  },
  updateOne: async (req, res, next) => {
    try {
      if (!req.user) throw new HttpException(401, "unauthorized")
      const input = req.body as UpdateProjectInput["input"]
      const project = await updateProject({ input, id: req.params.id, userId: req.user.id })
      res.status(200).json(project)
    } catch (error) {
      next(error)
    }
  },
  deleteOne: async (req, res, next) => {
    try {
      if (!req.user) throw new HttpException(401, "unauthorized")
      const project = await deleteProject({ id: req.params.id, userId: req.user.id })
      res.status(200).json(project)
    } catch (error) {
      next(error)
    }
  },
}
