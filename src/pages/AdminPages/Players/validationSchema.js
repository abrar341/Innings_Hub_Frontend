import * as yup from "yup";

const validationSchema = yup.object().shape({
    playerName: yup.string().required("Player name is required"),

    // Phone number is not required, but must be valid if provided
    phone: yup
        .string()
        .nullable() // Allow null or empty
        .matches(/^\d{10,15}$/, "Please fill a valid phone number")
        .min(10, "Phone number must be at least 10 digits")
        .max(15, "Phone number cannot be longer than 15 digits"),

    // Email must end with .com and be a valid format
    email: yup
        .string()
        .trim()
        .email("Please fill a valid email address")
        .matches(/\.com$/, "Email must end with '.com'")
        .nullable(), // Allows empty values

    // CNIC is required and must follow the format xxxxx-xxxxxxx-x
    cnic: yup
        .string()
        .required("CNIC is required")
        .matches(/^\d{5}-\d{7}-\d{1}$/, "CNIC must be in the format xxxxx-xxxxxxx-x"),

    role: yup.string().required("Role is required"),

    dob: yup.date().required("Date of Birth is required"),
});

export default validationSchema;
