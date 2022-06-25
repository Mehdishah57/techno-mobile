import * as yup from "yup";

const schema = yup.object({
    bid: yup
        .number()
        .min(1)
        .required()
})

export { schema as bidSchema }