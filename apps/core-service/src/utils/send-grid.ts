import sgMail from "@sendgrid/mail"

import { SITE_HOST, SENDGRID_FROM, SENDGRID_API_KEY } from "@config"

sgMail.setApiKey(SENDGRID_API_KEY)

type RegisterVerifyParams = {
  key: string
  email: string
}
export const sendRegisterVerify = async ({ key, email }: RegisterVerifyParams) => {
  await sgMail.send({
    to: email,
    from: SENDGRID_FROM,
    subject: "[Ference] Complete Registration",
    html: `
      <p>Click the link below to complete your registration</p>
      <a href="${SITE_HOST}/complete/${key}">Complete Registration</a>
    `,
  })
}

type SendVerifyCodeParams = {
  code: string
  email: string
}
export const sendVerifyCode = async ({ code, email }: SendVerifyCodeParams) => {
  await sgMail.send({
    to: email,
    from: process.env.SENDGRID_FROM,
    subject: "[Ference] Verification Code",
    text: `Your verification code is ${code}`,
  })
}
