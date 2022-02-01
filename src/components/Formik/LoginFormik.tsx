import { Formik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import routes from "../../assets/constants/routes";
import { validationLoginSchema } from "../../assets/constants/validationForm/validationForm";
import apiService from "../../services/api";

type Props = {
  saveToken: (key: string, value: string) => void;
};

const CustomFormik: React.FC<Props> = ({ saveToken }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{ phone: "", password: "" }}
      validationSchema={validationLoginSchema}
      onSubmit={async (values) => {
        alert(JSON.stringify(values, null, 2));
        const { data } = await apiService.login(values);
        if (data) saveToken("authenticationToken", data.data.accessToken);
      }}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="form">
            <div>
              <input
                id="phone"
                type="text"
                placeholder={t("login.input-mobile")}
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="error m-0">{formik.errors.phone}</div>
              ) : null}
            </div>
            <div>
              <input
                id="password"
                type="password"
                placeholder={t("login.input-password")}
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="error m-0">{formik.errors.password}</div>
              ) : null}
            </div>
          </div>
          <div className="submit">
            <button type="submit">{t("login.button-login")}</button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CustomFormik;
