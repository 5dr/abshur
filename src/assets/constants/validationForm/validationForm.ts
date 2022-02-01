import * as Yup from "yup";
import "yup-phone";

export const validationLoginSchema = Yup.object({
  phone: Yup.string().phone("EG", true, "Invalid Number").required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters or less")
    .required("Required"),
});

export const validationCreatePropertySchema = Yup.object({
  userPhone: Yup.string()
    .phone("EG", true, "Invalid Number")
    .required("Required"),
  number: Yup.string().required("Required"),
  propertyId: Yup.number().required("Required"),
  commission: Yup.number().required("Required"),
  name: Yup.string().required("Required"),
  fees: Yup.number().required("Required"),
  propertyDate: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  addedFees: Yup.number().required("Required"),
});
export const validationAddFeesSchema = Yup.object({
  addedFees: Yup.number().required("Required"),
});

export const validationAddUserSchema = Yup.object({
  phone: Yup.string().phone("EG", true, "Invalid Number").required("Required"),
  name: Yup.string().required("Required"),
  password: Yup.string()
    .min(8, "Must be 8 characters or less")
    .required("Required"),
});

export const validationCreateUnitSchema = Yup.object({
  tenantPhone: Yup.string().phone("EG", true, "Invalid Number").required(),
  unitNumber: Yup.string().required("Required"),
  rentPrice: Yup.number().required("Required"),
  electricityNumber: Yup.string().required("Required"),
  paymentPlan: Yup.string().required("Required"),
  unitStatus: Yup.string().required("Required"),
  notes: Yup.string().required("Required"),
});
