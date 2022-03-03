import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { validationLoginSchema } from "../../assets/constants/validationForm/validationForm";
import apiService from "../../services/api";
import { storeData } from "../../services/storage/storage";
import { login } from "../../store/actions/abshur.actions";

type Props = {
  saveToken: (key: string, value: string) => void;
};

const CustomFormik: React.FC<Props> = ({ saveToken }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  return (
    <Formik
      initialValues={{ phone: "", password: "" }}
      validationSchema={validationLoginSchema}
      onSubmit={async (values) => {
        try {
          setLoading(true);
          const { data } = await apiService.login(values);
          storeData("userId", data.data.id);
          setLoading(false);
          if (data) saveToken("authenticationToken", data.data.accessToken);
        } catch (e) {
          setLoading(false);
        }
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
            <button
              type="submit"
              disabled={loading}
              className="create-btn mt-5"
            >
              {loading ? (
                <div className="loader"></div>
              ) : (
                t("login.button-login")
              )}
            </button>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default CustomFormik;
