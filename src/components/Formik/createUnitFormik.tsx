import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Unit } from "../../assets/constants/type";
import { validationCreateUnitSchema } from "../../assets/constants/validationForm/validationForm";
import apiService from "../../services/api";
import YesOrNoModal from "../Modals/yesOrNo/yeaOrNo";

const CreateUnitFormik = () => {
  const { t } = useTranslation();
  const [pay, setPayDate] = useState(0);
  let unit: Unit = {
    tenantPhone: "",
    images: {},
    unitNumber: "",
    propertyId: 10,
    payDate: 0,
    rentalDate: new Date().getTime(),
    rentPrice: 0,
    electricityNumber: "",
    paymentPlan: "",
    unitStatus: "",
    notes: "",
  };

  const [openModalYesOrNo, setOpenModalYesOrNo] = useState(false);
  const [currentUserPhone, setCurrentUserPhone] = useState("");
  const msg = "هذا المستأجر غير موجد , هل تريد اضافته؟";
  const openCloseModalYesOrNo = () => {
    setOpenModalYesOrNo(!openModalYesOrNo);
  };

  const handlerInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const attrName = e.target.id;
    const attrValue = e.target.value;
    setPayDate(new Date(attrValue).getTime());

    console.log(
      attrName,
      new Date(attrValue).getTime(),
      new Date(attrValue).toISOString(),
      unit.payDate
    );
  };

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
            values = { ...values, payDate: pay };
            const formData = new FormData();
            Object.entries(values).forEach((element) => {
              console.log(element[0], element[1]);
              if (element[0] === "images") {
                for (let i = 0; i < element[1].length; i++) {
                  formData.append("images", element[1][i]);
                }
              } else {
                formData.append(element[0], element[1]);
              }
            });
            await apiService.createUnit(formData);
          } catch (error: any) {
            console.log(error);
            console.log(error.data.feedback.en);
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
                  onChange={handlerInput}
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
                  <option selected disabled value="">
                    Payment Plan
                  </option>
                  <option>monthly</option>
                  <option>quarterly</option>
                  <option>biannual</option>
                  <option>annual</option>
                </select>
                {formik.touched.paymentPlan && formik.errors.paymentPlan ? (
                  <div className="error m-0">{formik.errors.paymentPlan}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-8" htmlFor="unitStatus">
                  {t("create-unit.unit-status")}
                </label>
                <select
                  className="col-12"
                  id="unitStatus"
                  {...formik.getFieldProps("unitStatus")}
                >
                  <option selected disabled value="">
                    Unit Status
                  </option>
                  <option>empty</option>
                  <option>not-paid</option>
                  <option>paid</option>
                </select>
                {formik.touched.unitStatus && formik.errors.unitStatus ? (
                  <div className="error m-0">{formik.errors.unitStatus}</div>
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
              <button
                type="submit"
                // onClick={createProperty}
                className="create-btn mt-5"
              >
                {t("create-unit.add")}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreateUnitFormik;
