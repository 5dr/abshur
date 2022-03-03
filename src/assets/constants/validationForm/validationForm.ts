import * as Yup from "yup";
import "yup-phone";

export const validationLoginSchema = Yup.object({
  phone: Yup.string()
    .min(10, "يجب ان لا يقل عن 10 ارقام")
    .required("هذه القيمة مطلوبة"),
  password: Yup.string()
    .min(6, "يجب ان لا يقل عن 6 احرف")
    .required("هذه القيمة مطلوبة"),
});

export const validationChangePasswordSchema = Yup.object({
  phone: Yup.number().min(10, "يجب ان لا يقل عن 10 ارقام"),
  password: Yup.string()
    .min(6, "يجب ان لا يقل عن 6 احرف")
});

export const validationCreatePropertySchema = Yup.object({
  userPhone: Yup.string().min(10, "يجب ان لا يقل عن 10 ارقام"),
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
export const validationAddOfficeNoteSechema = Yup.object({
  request: Yup.string().max(70).required("هذه القيمة مطلوبة"),
  response: Yup.string().max(70).required("هذه القيمة مطلوبة"),
});
export const validationAddMaintenancechema = Yup.object({
  request: Yup.string().max(70).required("هذه القيمة مطلوبة"),
  cost: Yup.string().required("هذه القيمة مطلوبة"),
});

export const validationAddUserSchema = Yup.object({
  phone: Yup.string().min(10, "يجب ان لا يقل عن 10 ارقام"),
  name: Yup.string().required("هذه القيمة مطلوبة"),
  password: Yup.string()
    .min(6, "يجب ان لا يقل عن 6 احرف")
    .required("هذه القيمة مطلوبة"),
});

export const validationCreateUnitSchema = Yup.object({
  unitNumber: Yup.string().required("هذه القيمة مطلوبة"),
  tenantPhone: Yup.string().min(10, "يجب ان لا يقل عن 10 ارقام"),
  rentPrice: Yup.number()
    .positive("يجب ان تكون الايجار اكبر من 0")
    .required("هذه القيمة مطلوبة"),
  electricityNumber: Yup.string().required("هذه القيمة مطلوبة"),
  paymentPlan: Yup.string().required("هذه القيمة مطلوبة"),
  notes: Yup.string().required("هذه القيمة مطلوبة"),
});

// phone: Yup.string()
// .phone("EG", true, "رقم غير صالح")
// .required("هذه القيمة مطلوبة"),
