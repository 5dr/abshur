import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { validationAddMaintenancechema, validationAddOfficeNoteSechema } from "../../assets/constants/validationForm/validationForm";
import apiService from "../../services/api";
import { errorToast, successToast } from "../../services/toast/toast";
import { addOfficeNote } from "../../store/actions/abshur.actions";
import { rootState } from "../../store/reducers";

const AddOfficeNote = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const currentUnit = useSelector(
    (state: rootState) => state.abshur.currentUnits
  );

  return (
    <>
      <Formik
        initialValues={{
          request: "",
          response:"",
          kind: "feedback",
          unitId: currentUnit.id,
        }}
        validationSchema={validationAddOfficeNoteSechema}
        onSubmit={async (values) => {
          try {
            setLoading(true);
            const { data } = await apiService.addMaintenance(values);
            setLoading(false);

            dispatch(addOfficeNote(data.data));

            successToast("تم اضافة");
          } catch (error: any) {
            setLoading(false);
            errorToast("حدث خطأ اثناء الاضافة حاول مره اخرة");
          }
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="form">
              <div className="col-10">
                <label className="col-8" htmlFor="response">
                  {"اسم الادمن"}
                </label>
                <input
                  className="col-12"
                  id="response"
                  type="text"
                  {...formik.getFieldProps("response")}
                />
                {formik.touched.response && formik.errors.response ? (
                  <div className="error m-0">{formik.errors.response}</div>
                ) : null}
              </div>
            </div>
            <div className="form">
              <div className="col-10">
                <label className="col-8" htmlFor="request">
                  {"اضافة ملحوظة مكتب"}
                </label>
                <input
                  className="col-12"
                  id="request"
                  type="text"
                  {...formik.getFieldProps("request")}
                />
                {formik.touched.request && formik.errors.request ? (
                  <div className="error m-0">{formik.errors.request}</div>
                ) : null}
              </div>
            </div>
            <div className="submit">
              <button
                type="submit"
                disabled={loading}
                className="create-btn mt-5"
              >
                {loading ? (
                  <div className="loader"></div>
                ) : (
                  t("create-property.add")
                )}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddOfficeNote;
