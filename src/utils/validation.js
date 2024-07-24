import * as Yup from "yup";

export const signUpValidationSchema = Yup.object().shape({
    full_name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters").required("Password is required"),
    phone_number: Yup.string().min(19, "Invalid phone number").required("Phone number is required"),
})

export const signInValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters").required("Password is required"),
})

export const verifyPassValidationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
})

export const updatePassValidationSchema = Yup.object().shape({
    new_password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z]).{6,}$/, "Password must be at least 6 characters").required("Password is required"),
    code: Yup.string().required().trim(),
})

//==========SERVICE================


export const ServiceValidationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    price: Yup.string().required("Price is required"),
})

//================ORDERS===============


export const OrderValidationSchema = Yup.object().shape({
    amount: Yup.string().required("Amount is required"),
    client_full_name: Yup.string().required("Full Name is required"),
    client_phone_number: Yup.string().required("Phone is required"),
    service_id: Yup.string().required("Type is required"),
})
