const paths = [
  "/auth/verify-otp",
  "/auth/request-otp",
  "/auth/logout",
  "/auth/whoami",
  "/register/start",
  "/register/complete",
  "/projects", // * post, get
  "/projects/:id", // * get, put, delete
  "/projects/:projectId/api-tokens", // * get, post
  "/projects/:projectId/api-tokens/:id", // * put, delete
]

export const getAPIPath = (domain: string, path: string) => {
  return `/${domain}${path}`
}
