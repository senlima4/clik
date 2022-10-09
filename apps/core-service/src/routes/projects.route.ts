import { Router } from "express"

import type { RouterItem } from "@/types"
import authMiddleware from "@/middlewares/auth.middleware"
import { ProjectsController } from "@controllers/projects.controller"
import {
  createController as createApiTokenController,
  updateController as updateApiTokenController,
  deleteController as deleteApiTokenController,
  getListByProjectController,
} from "@controllers/api-token.controller"

const router = Router()

router.get("/", authMiddleware, ProjectsController.getListByUser)
router.get("/:id", authMiddleware, ProjectsController.getOneById)

router.post("/", authMiddleware, ProjectsController.createOne)
router.put("/:id", authMiddleware, ProjectsController.updateOne)
router.delete("/:id", authMiddleware, ProjectsController.deleteOne)

router.get("/:projectId/api-tokens", authMiddleware, getListByProjectController)
router.post("/:projectId/api-tokens", authMiddleware, createApiTokenController)
router.put("/:projectId/api-tokens/:id", authMiddleware, updateApiTokenController)
router.delete("/:projectId/api-tokens/:id", authMiddleware, deleteApiTokenController)

export const ProjectsRoute: RouterItem = {
  prefix: "/projects",
  router,
}
