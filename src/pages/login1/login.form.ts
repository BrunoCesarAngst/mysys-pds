import * as yup from "yup"

export const loginForm = yup.object().shape({
  email: yup.string().required("Email is required").email("Not a valid email"),
  password: yup.string().required("Password is required"),
})
