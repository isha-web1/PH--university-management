import { z } from "zod";

const createSemesterRegistrationValidationSchema = z.object({
    body : z.object({

    })
})

export const semesterRegistrationValidation = {
    createSemesterRegistrationValidationSchema
}