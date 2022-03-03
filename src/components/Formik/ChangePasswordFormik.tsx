import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {
  validationAddMaintenancechema,
  validationAddOfficeNoteSechema,
  validationChangePasswordSchema,
} from "../../assets/constants/validationForm/validationForm";
import apiService from "../../services/api";
import { errorToast, successToast } from "../../services/toast/toast";
import { addOfficeNote, login } from "../../store/actions/abshur.actions";
import { rootState } from "../../store/reducers";

const ChangePasswordFormik = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const user = useSelector((state: rootState) => state.abshur.user);

  let userUpdate: any = {
    phone: "",
    password: "",
    role: "admin",
    id: "",
  };

  return (
    <>
      <Formik
        initialValues={userUpdate}
        validationSchema={validationChangePasswordSchema}
        onSubmit={async (values) => {
          try {
            values = {
              ...values,
              id: user,
            };
            if (values.phone === "") {
              delete values.phone;
            }
            if (values.password === "") {
              delete values.password;
            }
            setLoading(true);
            await apiService.updateUser(values);
            setLoading(false);

            successToast("تم التعديل");
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
                <label className="col-8" htmlFor="phone">
                  رقم الهاتف الجديد
                </label>
                <input
                  className="col-12"
                  id="phone"
                  type="text"
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="error m-0">{formik.errors.phone}</div>
                ) : null}
              </div>
            </div>
            <div className="form">
              <div className="col-10">
                <label className="col-8" htmlFor="password">
                  {"كلمه السر الجديدة"}
                </label>
                <input
                  className="col-12"
                  id="password"
                  type="password"
                  {...formik.getFieldProps("password")}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="error m-0">{formik.errors.password}</div>
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

export default ChangePasswordFormik;
