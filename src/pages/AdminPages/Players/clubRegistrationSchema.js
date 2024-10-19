import * as yup from "yup";

const phoneValidation = yup
  .string()
  .matches(/^[0-9]{10,12}$/, "Phone number must be between 10 and 15 digits")
  .required("Phone number is required");

const cnicValidation = yup
  .string()
  .matches(/^\d{5}-\d{7}-\d$/, "CNIC must be in the format xxxxx-xxxxxxx-x")
  .required("CNIC is required");

const roles = ["President", "VicePresident", "Secretary", "JointSecretary", "Treasurer"];

const generateRoleSchema = (role) => {
  return yup.object().shape({
    [`${role.toLowerCase()}Name`]: yup.string().required(`${role} Name is required`),
    [`${role.toLowerCase()}FatherName`]: yup.string().required(`${role} Father's Name is required`),
    [`${role.toLowerCase()}DOB`]: yup
      .date()
      .max(new Date(), `${role} DOB must be a valid date in the past`)
      .required(`${role} Date of Birth is required`),
    [`${role.toLowerCase()}Email`]: yup
      .string()
      .email(`Invalid email format for ${role}`)
      .required(`${role} Email is required`),
    [`${role.toLowerCase()}CNIC`]: cnicValidation, // Assuming `cnicValidation` is predefined
    [`${role.toLowerCase()}Phone`]: phoneValidation, // Assuming `phoneValidation` is predefined
  });
};

// Combine all role schemas
const baseOfficialSchema = yup.object().shape(
  // roles.reduce((schema, role) => {
  //   return { ...schema, ...generateRoleSchema(role).fields };
  // }, {})
);


const clubRegistrationSchema = [
  // Step 1: Club Details
  yup.object().shape({
    clubLogo: yup.mixed().required("Club logo is required"),
    clubName: yup.string().required("Club name is required"),
    location: yup.string().required("Location is required"),
    yearEstablished: yup
      .number()
      .required("Year established is required")
      .positive("Invalid year established")
      .integer("Year must be an integer"),
  }),

  // Step 2: Manager Details
  yup.object().shape({
    managerName: yup.string().required("Manager name is required"),
    managerEmail: yup.string().email("Invalid email format").required("Manager email is required"),
    managerPhone: phoneValidation,
    managerAddress: yup.string().required("Manager address is required"),
  }),

  // Step 3: President Details
  baseOfficialSchema,

  // Step 4: Vice President Details
  baseOfficialSchema,

  // Step 5: Secretary Details
  baseOfficialSchema,

  // Step 6: Joint Secretary Details
  baseOfficialSchema,

  // Step 7: Treasurer Details
  baseOfficialSchema,

  // Step 8: Social Links
  yup.object().shape({
    clubWebsite: yup.string().url("Invalid URL format").nullable(),
    clubFacebook: yup.string().url("Invalid URL format").nullable(),
    clubTwitter: yup.string().url("Invalid URL format").nullable(),
  }),
];

export default clubRegistrationSchema;
