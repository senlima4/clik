import type { Router, Request, Response, NextFunction } from "express"
import type { User } from "@ference/prisma"
import { HttpException } from "@/exceptions/HttpException"

export type RouterItem = {
  prefix: string
  router: Router
}

export type CustomRequest = Request & {
  csrfToken?: () => string
}

export interface RequestWithUser extends Request {
  user?: User
}
export type RequestHandler = (req: CustomRequest, res: Response, next: NextFunction) => Promise<void>
export type RequestWithUserHandler = (req: RequestWithUser, res: Response, next: NextFunction) => Promise<void>

export type ErrorHandler = (error: HttpException, req: Request, res: Response, next: NextFunction) => void
