import yup from 'yup'

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .email()
    .required('please enter an email address'),
  username: yup
    .string()
    .matches(/^[a-zA-Z0-9_]*$/, 'please only alphanumeric is allowed')
    .required('please enter an username'),
  password: yup
    .string()
    .min(5, 'password needs to be at least 5 characters long')
    .required('please enter a password'),
})
