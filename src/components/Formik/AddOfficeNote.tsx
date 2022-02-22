import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { validationAddMaintenancechema } from "../../assets/constants/validationForm/validationForm";
import apiService from "../../services/api";
import { errorToast, successToast } from "../../services/toast/toast";
import { addOfficeNote } from "../../store/actions/abshur.actions";
import { rootState } from "../../store/reducers";

const AddOfficeNote = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentUnit = useSelector(
    (state: rootState) => state.abshur.currentUnits
  );

  return (
    <>
      <Formik
        initialValues={{
          request: "",
          kind: "feedback",
          unitId: currentUnit.id,
        }}
        validationSchema={validationAddMaintenancechema}
        onSubmit={async (values) => {
          try {
            const {data} = await apiService.addMaintenance(values);
            dispatch(addOfficeNote(data.data));

            successToast("تم اضافة");
          } catch (error: any) {
            errorToast("حدث خطأ اثناء الاضافة حاول مره اخرة");
          }
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
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
              <button type="submit" className="create-btn mt-5">
                {t("create-property.add")}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default AddOfficeNote;
