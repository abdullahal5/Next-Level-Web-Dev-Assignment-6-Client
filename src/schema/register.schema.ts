import { z } from "zod";

const registerValidationSchema = z.object({
  username: z.string().min(1, { message: "Please enter your username!" }),

  email: z.string().email({ message: "Please enter a valid email address!" }),

  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Please select your gender",
  }),

  password: z
    .string({
      required_error: "Password must be at least 8 characters.",
    })
    .min(2),
  // dateOfBirth: z.string().refine(
  //   (value) => {
  //     const date = new Date(value);
  //     return !isNaN(date.getTime());
  //   },
  //   { message: "Please provide a valid date of birth." }
  // ),
});

export default registerValidationSchema;
