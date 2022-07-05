import * as yup from "yup";

const schema = yup.object({
    code: yup
        .number("Code must be a number")
        .min(100000, "Code must be 6 digits")
        .max(999999, "Code must be 6 digits")
        .required("Please enter the code to verify")
})

export { schema as codeSchema }