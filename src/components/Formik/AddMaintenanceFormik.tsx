import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { validationAddMaintenancechema } from "../../assets/constants/validationForm/validationForm";
import apiService from "../../services/api";
import { errorToast, successToast } from "../../services/toast/toast";
import { addMaintenance } from "../../store/actions";
import { rootState } from "../../store/reducers";

const AddMaintenanceFormik = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentUnit = useSelector(
    (state: rootState) => state.abshur.currentUnits
  );

  return (
    <>
      <Formik
        initialValues={{
          cost: "",
          request: "",
          kind: "maintenance",
          unitId: currentUnit.id,
          images: "",
        }}
        validationSchema={validationAddMaintenancechema}
        onSubmit={async (values) => {
          try {
            const formData = new FormData();
            Object.entries(values).forEach((element) => {
              console.log(element[0], element[1]);
              if (element[0] === "images") {
                for (let i = 0; i < element[1].length; i++) {
                  formData.append("images", element[1][i]);
                }
              } else if (element[0] === "cost") {
                if (element[1] > 0) {
                  formData.append(element[0], element[1]);
                }
              } else {
                formData.append(element[0], element[1]);
              }
            });
            const { data } = await apiService.addMaintenance(formData);
            dispatch(addMaintenance(data.data));

            successToast("تم اضافة الصيانة");
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
                  {t("unitDetail.request")}
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
              <div className="col-sm-5 col-10">
                <label className="col-8" htmlFor="cost">
                  {t("unitDetail.cost")}
                </label>
                <input
                  className="col-12"
                  id="cost"
                  type="number"
                  {...formik.getFieldProps("cost")}
                />
                {formik.touched.cost && formik.errors.cost ? (
                  <div className="error m-0">{formik.errors.cost}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-8" htmlFor="images">
                  {t("unitDetail.img")}
                </label>
                <input
                  className="col-12"
                  id="images"
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(event: any) => {
                    formik.setFieldValue("images", event.currentTarget.files);
                  }}
                />
                {formik.touched.images && formik.errors.images ? (
                  <div className="error m-0">{formik.errors.images}</div>
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

export default AddMaintenanceFormik;
