import yup from "yup";

export const signupSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("firstName is required")
    .min(2, "firstName must be at least 2 characters long"),
  lastName: yup
    .string()
    .required("lastName is required")
    .min(2, "lastName must be at least 2 characters long"),
  email: yup.string().required("Email is required").email("Email is not valid"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});
