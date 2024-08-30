import * as yup from "yup";

export const tournamentValidationSchema = yup.object().shape({
    name: yup.string().required("Tournament name is required"),
    location: yup.string().required("Location is required"),
    startDate: yup.date().required("Start date is required"),
    endDate: yup.date().required("End date is required"),
});
