import { Router } from "express"

import type { RouterItem } from "@/types"
import authMiddleware from "@/middlewares/auth.middleware"
import csrfMiddleware from "@/middlewares/csrf.middleware"
import { AuthController } from "@controllers/auth.controller"

const router = Router()

// login: otp verification flow
router.post("/verify-otp", csrfMiddleware, AuthController.verifyOTP)
router.post("/request-otp", csrfMiddleware, AuthController.requestOTP)

// clear cookie
router.post("/logout", AuthController.logout)

// get user info
router.get("/whoami", authMiddleware, AuthController.whoami)

export const AuthRoute: RouterItem = {
  prefix: "/auth",
  router,
}
