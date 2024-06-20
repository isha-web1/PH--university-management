import { z } from "zod";

const loginValidationSchema = z.object({
    body : z.object({
        id : z.string({required_error : 'id is required !'}),
        password : z.string({required_error : 'password is required !'})
    })
})
const changePasswordValidationSchema = z.object({
    body : z.object({
        oldPassword : z.string({required_error : 'old password is required !'}),
        newPassword : z.string({required_error : 'password is required !'})
    })
})

export const AuthValidation = {
    loginValidationSchema,
    changePasswordValidationSchema
}