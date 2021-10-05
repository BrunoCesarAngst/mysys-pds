import * as yup from "yup"

export const registerForm = yup.object().shape({
  email: yup.string().required("Email is required").email("Not a valid email"),
  password: yup.string().required("Password is required"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), "Password does not match"])
    .required("Password confirmation required"),
})
