import * as yup from "yup";

const validationSchema = yup.object().shape({
    playerName: yup.string().required("Player name is required"),
    // city: yup.string().required("City is required"),
    phone: yup
        .string()
        .matches(/^\d{10,15}$/, "Please fill a valid phone number") // Ensures phone number has 10 to 15 digits
        .min(10, "Phone number must be at least 10 digits") // Minimum length
        .max(15, "Phone number cannot be longer than 15 digits") // Maximum length
        .nullable(), // Allow the field to be empty

    email: yup
        .string()
        .trim()
        .email("Please fill a valid email address") // Ensures a valid email format
        .matches(/\.com$/, "Email must end with '.com'") // Ensures the email ends with ".com"
        .nullable(), // Allows the field to be empty

    // jerseyNumber: yup.string().required("Jersey number is required"),
    role: yup.string().required("Role is required"),
    // battingStyle: yup.string().required("Batting style is required"),
    // bowlingStyle: yup.string().required("Bowling style is required"),
    dob: yup.date().required("Date of Birth is required"),
    // profilePicture: yup.mixed().required("Profile picture is required"),
});
export default validationSchema