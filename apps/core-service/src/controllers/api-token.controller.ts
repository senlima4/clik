import type { RequestWithUserHandler } from "@/types"
import {
  createApiToken,
  CreateApiTokenInput,
  findProjectApiTokens,
  updateApiToken,
  UpdateApiTokenInput,
  deleteApiToken,
} from "@services/api-token.service"
import { HttpException } from "@/exceptions/HttpException"

export const createController: RequestWithUserHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new HttpException(401, "unauthorized")
    const input = req.body as CreateApiTokenInput["input"]
    await createApiToken({
      input,
      userId: req.user.id,
      projectId: req.params.projectId,
    })
    res.status(201)
  } catch (error) {
    next(error)
  }
}

export const getListByProjectController: RequestWithUserHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new HttpException(401, "unauthorized")
    const apiTokens = await findProjectApiTokens({
      userId: req.user.id,
      projectId: req.params.projectId,
    })
    res.status(200).json(apiTokens)
  } catch (error) {
    next(error)
  }
}

export const updateController: RequestWithUserHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new HttpException(401, "unauthorized")
    const input = req.body as UpdateApiTokenInput["input"]
    const apiToken = await updateApiToken({
      id: Number(req.params.id),
      input,
      userId: req.user.id,
    })
    res.status(200).json(apiToken)
  } catch (error) {
    next(error)
  }
}

export const deleteController: RequestWithUserHandler = async (req, res, next) => {
  try {
    if (!req.user) throw new HttpException(401, "unauthorized")
    await deleteApiToken({
      id: Number(req.params.id),
      userId: req.user.id,
    })
    res.status(204)
  } catch (error) {
    next(error)
  }
}
