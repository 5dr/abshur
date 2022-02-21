import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Realty } from "../../assets/constants/type";
import { validationAddFeesSchema } from "../../assets/constants/validationForm/validationForm";
import apiService from "../../services/api";
import { errorToast, successToast } from "../../services/toast/toast";
import { addAddedFees } from "../../store/actions/abshur.actions";
import { rootState } from "../../store/reducers";

const AddFeesFormik = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentProperty = useSelector(
    (state: rootState) => state.abshur.currentProperty
  );

  return (
    <>
      <Formik
        initialValues={{ addedFees: "" }}
        validationSchema={validationAddFeesSchema}
        onSubmit={async (values) => {
          try {
            const {
              name,
              number,
              propertyId,
              propertyDate,
              address,
              commission,
              fees,
              user,
              addedFees,
              id,
            } = currentProperty;
            const userPhone = user.phone;
            const allAddedFees = addedFees + parseInt(values.addedFees);
            const data = await apiService.updateProperty({
              id,
              name,
              number,
              propertyId,
              propertyDate,
              address,
              commission,
              fees,
              userPhone,
              addedFees: allAddedFees,
            });
            dispatch(addAddedFees(allAddedFees));
            successToast("تم اضافة");
          } catch (error: any) {
            errorToast("حدث خطأ اثناء الاضافة حاول مره اخرة");
          }
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="form">
              <div className="col-12">
                <label className="col-5" htmlFor="addedFees">
                  {t("create-property.added-fees")}
                </label>
                <input
                  className="col-12"
                  id="addedFees"
                  type="number"
                  {...formik.getFieldProps("addedFees")}
                />
                {formik.touched.addedFees && formik.errors.addedFees ? (
                  <div className="error m-0">{formik.errors.addedFees}</div>
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

export default AddFeesFormik;
