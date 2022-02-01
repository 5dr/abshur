import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Realty } from "../../assets/constants/type";
import { validationAddFeesSchema } from "../../assets/constants/validationForm/validationForm";
import apiService from "../../services/api";
import { rootState } from "../../store/reducers";

const AddFeesFormik = () => {
  const { t } = useTranslation();
  const currentProperty = useSelector(
    (state: rootState) => state.abshur.currentProperty
  );

  return (
    <>
      <Formik
        initialValues={{ addedFees: '' }}
        validationSchema={validationAddFeesSchema}
        onSubmit={async (values) => {
          try {
            console.log(values);
            console.log(currentProperty);
            console.log({...currentProperty,...values});

            // alert(JSON.stringify(values, null, 2));
            // const data = await apiService.createProperty(values);
            // console.log("data", data);
          } catch (error: any) {}
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
