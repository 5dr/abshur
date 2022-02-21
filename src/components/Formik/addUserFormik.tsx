import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { User } from "../../assets/constants/type";
import { validationAddUserSchema } from "../../assets/constants/validationForm/validationForm";
import apiService from "../../services/api";
import { errorToast, successToast } from "../../services/toast/toast";

type Props = {
  phone?: string;
  role?: string;
};

const AddUserFormik: React.FC<Props> = ({ phone, role }) => {
  const { t } = useTranslation();
  let user: User = {
    name: "",
    phone: phone ? phone : "",
    password: "",
    role: role ? role : "",
  };

  return (
    <>
      <Formik
        initialValues={user}
        validationSchema={validationAddUserSchema}
        onSubmit={async (values) => {
          values = { ...values };
          try {
             await apiService.register(values);
            successToast("تم الاضافة بنجاج");
          } catch (error: any) {
            errorToast(error.data.feedback.en);
          }
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="form">
              <div className="col-10">
                <label className="col-2" htmlFor="name">
                  {t("create-property.name")}
                </label>
                <input
                  className="col-10"
                  id="name"
                  type="text"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="error m-0">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-3" htmlFor="phone">
                  {t("create-property.mobile")}
                </label>
                <input
                  className="col-9"
                  id="phone"
                  type="text"
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="error m-0">{formik.errors.phone}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-4" htmlFor="password">
                  {t("create-property.pass-word")}
                </label>
                <input
                  id="password"
                  className="col-8"
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

export default AddUserFormik;
