import { z } from "zod";

const UserNameValidationSchema = z.object({
    firstName: z.string().min(1).max(20),
    middleName: z.string().optional(),
    lastName: z.string().min(1)
});

// Define the Zod schema for Guardian
const GuardianValidationSchema = z.object({
    fatherName: z.string().min(1),
    fatherOccupation: z.string().min(1),
    fatherContactNo: z.string().min(1),
    motherName: z.string().min(1),
    motherOccupation: z.string().min(1),
    motherContactNo: z.string().min(1)
});

// Define the Zod schema for LocalGuardian
const LocalGuardianValidationSchema = z.object({
    name: z.string().min(1),
    occupation: z.string().min(1),
    contactNo: z.string().min(1),
    address: z.string().min(1)
});

// Define the Zod schema for Student
const StudentValidationSchema = z.object({
    id: z.string().min(1),
    password : z.string().max(20),
    name: UserNameValidationSchema,
    gender: z.enum(["male", "female", "other"]),
    dateOfBirth: z.string().optional(),
    email: z.string().email(),
    contactNo: z.string().min(1),
    emergencyContactNo: z.string().min(1),
    bloodGroup: z.enum(["A+", "A-", "B+", "B-",  "O+", "O-"]),
    presentAddress: z.string().min(1),
    permanentAddress: z.string().min(1),
    guardian: GuardianValidationSchema,
    localGuardian: LocalGuardianValidationSchema,
    profileImg: z.string().optional(),
    isActive: z.enum(['active', 'in-active']).default("active")
});

export default StudentValidationSchema;