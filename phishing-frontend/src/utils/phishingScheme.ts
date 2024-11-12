import * as yup from "yup";

const phishingSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Please enter a valid email address")
    .trim()
    .lowercase(),
});

export default phishingSchema;
