import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { getDateFormat } from "../../assets/constants/memento";
import { Unit } from "../../assets/constants/type";
import { validationCreateUnitSchema } from "../../assets/constants/validationForm/validationForm";
import apiService from "../../services/api";
import { errorToast, successToast } from "../../services/toast/toast";
import { addUnit, updateUnit } from "../../store/actions/abshur.actions";
import { rootState } from "../../store/reducers";
import YesOrNoModal from "../Modals/yesOrNo/yeaOrNo";

type Props = {
  editData?: any;
};
const allPaymentPlan = [
  { value: "monthly", name: "شهريا" },
  { value: "quarterly", name: "ربع سنوي" },
  { value: "biannual", name: "نصف سنوي" },
  { value: "annual", name: "سنويا" },
];

// const allUnitStatus = [
//   { value: "empty", name: "فارغة" },
//   { value: "not-paid", name: "لم تدفع" },
//   { value: "paid", name: "تم الدفع" },
// ];

const CreateUnitFormik: React.FC<Props> = ({ editData }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentProperty = useSelector(
    (state: rootState) => state.abshur.currentProperty
  );

  let unit: Unit = {
    tenantPhone: editData ? editData.tenant.phone : "",
    images: {},
    unitNumber: editData ? editData.unitNumber : "",
    propertyId: currentProperty.id,
    payDate: editData ? getDateFormat(editData.payDate) : "",
    rentalDate: new Date().getTime(),
    rentPrice: editData ? editData.rentPrice : 0,
    electricityNumber: editData ? editData.electricityNumber : "",
    paymentPlan: editData ? editData.paymentPlan : "",
    notes: editData ? editData.notes : "",
  };

  const [openModalYesOrNo, setOpenModalYesOrNo] = useState(false);
  const [currentUserPhone, setCurrentUserPhone] = useState("");
  const msg = "هذا المستأجر غير موجد , هل تريد اضافته؟";
  const openCloseModalYesOrNo = () => {
    setOpenModalYesOrNo(!openModalYesOrNo);
  };

  // const handlerInput = (
  //   e:
  //     | React.ChangeEvent<HTMLInputElement>
  //     | React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const attrName = e.target.id;
  //   const attrValue = e.target.value;
  //   setPayDate(new Date(attrValue).getTime());
  // };

  return (
    <>
      <YesOrNoModal
        isOpen={openModalYesOrNo}
        onModalClose={openCloseModalYesOrNo}
        message={msg}
        phone={currentUserPhone}
        role={"tenant"}
      />
      <Formik
        initialValues={unit}
        validationSchema={validationCreateUnitSchema}
        onSubmit={async (values) => {
          try {
            values = {
              ...values,
              unitStatus: "empty",
              payDate: new Date(
                values.payDate ? values.payDate : ""
              ).toISOString(),
            };
            const formData = new FormData();
            Object.entries(values).forEach((element) => {
              if (element[0] === "images") {
                for (let i = 0; i < element[1].length; i++) {
                  formData.append("images", element[1][i]);
                }
              } else {
                formData.append(element[0], element[1]);
              }
            });
            if (editData) {
              const { data } = await apiService.updateUnit({
                formData,
                id: editData.id,
              });
              dispatch(updateUnit(currentProperty.id));
              successToast("تم نعديل الوحده");
            } else {
              const { data } = await apiService.createUnit(formData);
              dispatch(addUnit(data.data));
              successToast("تم اضافة الوحده");
            }
          } catch (error: any) {
            errorToast(error.data.feedback.en);
            if (
              error.data.feedback.en ===
              "Please make sure that you have entered a valid phone number"
            ) {
              setCurrentUserPhone(values.tenantPhone ? values.tenantPhone : "");
              openCloseModalYesOrNo();
            }
          }
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="form">
              <div className="col-sm-5 col-10">
                <label className="col-8" htmlFor="unitNumber">
                  {t("create-unit.unit-number")}
                </label>
                <input
                  className="col-12"
                  id="unitNumber"
                  type="text"
                  {...formik.getFieldProps("unitNumber")}
                />
                {formik.touched.unitNumber && formik.errors.unitNumber ? (
                  <div className="error m-0">{formik.errors.unitNumber}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-8" htmlFor="tenantPhone">
                  {t("create-unit.user-phone")}
                </label>
                <input
                  className="col-12"
                  id="tenantPhone"
                  type="text"
                  {...formik.getFieldProps("tenantPhone")}
                />
                {formik.touched.tenantPhone && formik.errors.tenantPhone ? (
                  <div className="error m-0">{formik.errors.tenantPhone}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-8" htmlFor="rentPrice">
                  {t("create-unit.rent-price")}
                </label>
                <input
                  className="col-12"
                  id="rentPrice"
                  type="number"
                  {...formik.getFieldProps("rentPrice")}
                />
                {formik.touched.rentPrice && formik.errors.rentPrice ? (
                  <div className="error m-0">{formik.errors.rentPrice}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-8" htmlFor="images">
                  {t("create-unit.images")}
                </label>
                <input
                  className="col-12"
                  id="images"
                  type="file"
                  accept="image/*,application/pdf"
                  multiple={true}
                  onChange={(event: any) => {
                    formik.setFieldValue("images", event.currentTarget.files);
                  }}
                />
                {formik.touched.images && formik.errors.images ? (
                  <div className="error m-0">{formik.errors.images}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-8" htmlFor="payDate">
                  {t("create-unit.pay-date")}
                </label>
                <input
                  className="col-12"
                  id="payDate"
                  type="date"
                  {...formik.getFieldProps("payDate")}
                />
                {formik.touched.payDate && formik.errors.payDate ? (
                  <div className="error m-0">{formik.errors.payDate}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-8" htmlFor="paymentPlan">
                  {t("create-unit.payment-plan")}
                </label>
                <select
                  className="col-12"
                  id="paymentPlan"
                  {...formik.getFieldProps("paymentPlan")}
                >
                  <option disabled value="">
                    {"خطةالدفع"}
                  </option>
                  {allPaymentPlan.map((plan) => {
                    return (
                      <option key={plan.value} value={plan.value}>
                        {plan.name}
                      </option>
                    );
                  })}
                </select>
                {formik.touched.paymentPlan && formik.errors.paymentPlan ? (
                  <div className="error m-0">{formik.errors.paymentPlan}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-8" htmlFor="electricityNumber">
                  {t("create-unit.electricity-number")}
                </label>
                <input
                  className="col-12"
                  id="electricityNumber"
                  type="text"
                  {...formik.getFieldProps("electricityNumber")}
                />
                {formik.touched.electricityNumber &&
                formik.errors.electricityNumber ? (
                  <div className="error m-0">
                    {formik.errors.electricityNumber}
                  </div>
                ) : null}
              </div>
              <div className="col-10">
                <label className="col-8" htmlFor="notes">
                  {t("create-unit.notes")}
                </label>
                <input
                  className="col-12"
                  id="notes"
                  type="text"
                  {...formik.getFieldProps("notes")}
                />
                {formik.touched.notes && formik.errors.notes ? (
                  <div className="error m-0">{formik.errors.notes}</div>
                ) : null}
              </div>
            </div>
            <div className="submit">
              <button type="submit" className="create-btn mt-5">
                {editData ? t("create-property.edit") : t("create-unit.add")}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreateUnitFormik;
