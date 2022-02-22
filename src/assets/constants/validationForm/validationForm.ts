import * as Yup from "yup";
import "yup-phone";

export const validationLoginSchema = Yup.object({
  phone: Yup.string()
    .phone("EG", true, "رقم غير صالح")
    .required("هذه القيمة مطلوبة"),
  password: Yup.string()
    .min(6, "يجب ان لا يقل عن 6 احرف")
    .required("هذه القيمة مطلوبة"),
});

export const validationCreatePropertySchema = Yup.object({
  userPhone: Yup.string()
    .phone("EG", true, "رقم غير صالح")
    .required("هذه القيمة مطلوبة"),
  number: Yup.string().required("هذه القيمة مطلوبة"),
  propertyId: Yup.number().required("هذه القيمة مطلوبة"),
  commission: Yup.number()
    .positive("يجب ان تكون النسبة اكبر من 0")
    .required("هذه القيمة مطلوبة"),
  name: Yup.string().required("هذه القيمة مطلوبة"),
  fees: Yup.number().required("هذه القيمة مطلوبة"),
  propertyDate: Yup.string().required("هذه القيمة مطلوبة"),
  address: Yup.string().required("هذه القيمة مطلوبة"),
  addedFees: Yup.number().required("هذه القيمة مطلوبة"),
});
export const validationAddFeesSchema = Yup.object({
  addedFees: Yup.number().required("هذه القيمة مطلوبة"),
});
export const validationAddMaintenancechema = Yup.object({
  request: Yup.string().max(70).required("هذه القيمة مطلوبة"),
});

export const validationAddUserSchema = Yup.object({
  phone: Yup.string()
    .phone("EG", true, "رقم غير صالح")
    .required("هذه القيمة مطلوبة"),
  name: Yup.string().required("هذه القيمة مطلوبة"),
  password: Yup.string()
    .min(6, "يجب ان لا يقل عن 6 احرف")
    .required("هذه القيمة مطلوبة"),
});

export const validationCreateUnitSchema = Yup.object({
  unitNumber: Yup.string().required("هذه القيمة مطلوبة"),
  tenantPhone: Yup.string()
    .phone("EG", true, "رقم غير صالح")
    .required("هذه القيمة مطلوبة"),
  rentPrice: Yup.number()
    .positive("يجب ان تكون الايجار اكبر من 0")
    .required("هذه القيمة مطلوبة"),
  electricityNumber: Yup.string().required("هذه القيمة مطلوبة"),
  paymentPlan: Yup.string().required("هذه القيمة مطلوبة"),
  notes: Yup.string().required("هذه القيمة مطلوبة"),
  images: Yup.string().required("هذه القيمة مطلوبة"),
});
