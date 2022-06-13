import * as yup from "yup";

const productSchema = yup.object({
    title: yup.string().min(8).max(80).required("Please provide product title"),
    description: yup.string().min(15).max(1000).required("Please provide product description"),
    price: yup.number("Please avoid using \",\" or other characters").required("Please provide product price"),
    category: yup.string().required("Please provide product category"),
    subCategory: yup.string().required("Please provide sub-category for product"),
    picture: yup.object({
        image1: yup.string().required("Please upload atleast one image"),
        image2: yup.string().notRequired(),
        image3: yup.string().notRequired(),
        image4: yup.string().notRequired(),
        image5: yup.string().notRequired(),
    })
});


export {productSchema};