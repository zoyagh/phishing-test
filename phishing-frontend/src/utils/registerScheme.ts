import * as yup from "yup";

const registerScheme = yup.object({
  fullName: yup
    .string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters long")
    .max(30, "Full name can be at most 30 characters long")
    .matches(
      /^[A-Za-z\s]+$/,
      "Full name can only contain letters and spaces"
    )
    .trim(),

  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .trim()
    .lowercase(),

  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/,
      "Password must contain at least one uppercase letter, one number, and one special character"
    ),
});

export default registerScheme;
