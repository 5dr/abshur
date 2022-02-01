import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Realty } from "../../assets/constants/type";
import { validationCreatePropertySchema } from "../../assets/constants/validationForm/validationForm";
import apiService from "../../services/api";
import YesOrNoModal from "../Modals/yesOrNo/yeaOrNo";

const CreatePropertyFormik = () => {
  const { t } = useTranslation();
  let realty: Realty = {
    userPhone: "",
    number: "",
    name: "",
    propertyId: "",
    propertyDate: "",
    address: "",
    commission: "",
    fees: 0,
    addedFees: 0,
  };

  const [openModalYesOrNo, setOpenModalYesOrNo] = useState(false);
  const [currentUserPhone, setCurrentUserPhone] = useState("");
  const msg = "هذا المالك غير موجد , هل تريد اضافته؟";
  const openCloseModalYesOrNo = () => {
    setOpenModalYesOrNo(!openModalYesOrNo);
  };

  return (
    <>
      <YesOrNoModal
        isOpen={openModalYesOrNo}
        onModalClose={openCloseModalYesOrNo}
        message={msg}
        phone={currentUserPhone}
        role={'owner'}
      />
      <Formik
        initialValues={realty}
        validationSchema={validationCreatePropertySchema}
        onSubmit={async (values) => {
          try {
            console.log(values);
            alert(JSON.stringify(values, null, 2));
            const data = await apiService.createProperty(values);
            console.log("data", data);
          } catch (error: any) {
            console.log(error);
            console.log(error.data.feedback.en);
            if (
              error.data.feedback.en ===
              "Please make sure that you have entered a valid phone number"
            ) {
              setCurrentUserPhone(values.userPhone?values.userPhone:'');
              openCloseModalYesOrNo();
            }
          }
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="form">
              <div className="col-sm-5 col-10">
                <label className="col-5" htmlFor="userPhone">
                  {t("create-property.mobile")}
                </label>
                <input
                  className="col-12"
                  id="userPhone"
                  type="text"
                  {...formik.getFieldProps("userPhone")}
                />
                {formik.touched.userPhone && formik.errors.userPhone ? (
                  <div className="error m-0">{formik.errors.userPhone}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-5" htmlFor="name">
                  {t("create-property.name")}
                </label>
                <input
                  className="col-12"
                  id="name"
                  type="text"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="error m-0">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-5" htmlFor="propertyId">
                  {t("create-property.property-id")}
                </label>
                <input
                  className="col-12"
                  id="propertyId"
                  type="text"
                  {...formik.getFieldProps("propertyId")}
                />
                {formik.touched.propertyId && formik.errors.propertyId ? (
                  <div className="error m-0">{formik.errors.propertyId}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-5" htmlFor="propertyDate">
                  {t("create-property.property-date")}
                </label>
                <input
                  className="col-12"
                  id="propertyDate"
                  type="date"
                  {...formik.getFieldProps("propertyDate")}
                />
                {formik.touched.propertyDate && formik.errors.propertyDate ? (
                  <div className="error m-0">{formik.errors.propertyDate}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-5" htmlFor="number">
                  {t("create-property.property-num")}
                </label>
                <input
                  className="col-12"
                  id="number"
                  type="text"
                  {...formik.getFieldProps("number")}
                />
                {formik.touched.number && formik.errors.number ? (
                  <div className="error m-0">{formik.errors.number}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-5" htmlFor="commission">
                  {t("create-property.commission")}
                </label>
                <input
                  className="col-12"
                  id="commission"
                  type="text"
                  {...formik.getFieldProps("commission")}
                />
                {formik.touched.commission && formik.errors.commission ? (
                  <div className="error m-0">{formik.errors.commission}</div>
                ) : null}
              </div>
              <div className="col-sm-12 col-10 px-sm-5">
                <label className="col-5 col-sm-2" htmlFor="address">
                  {t("create-property.address")}
                </label>
                <input
                  className="col-12"
                  id="address"
                  type="text"
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="error m-0">{formik.errors.address}</div>
                ) : null}
              </div>
            </div>
            <div className="submit">
              <button
                type="submit"
                // onClick={createProperty}
                className="create-btn mt-5"
              >
                {t("create-property.add")}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreatePropertyFormik;
