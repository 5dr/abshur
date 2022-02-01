import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import routes from "../../assets/constants/routes";
import CustomFormik from "../../components/Formik/LoginFormik";
import "./Login.scss";

type Props = {
  saveToken: (key: string, value: string) => void;
  auth: boolean;
};

const Login: React.FC<Props> = ({ saveToken, auth }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(auth)
    if (auth) {
      navigate(routes.HOME);
    }
  }, []);

  return (
    <div className="container">
      <div className="login-container">
        <div className="login col-xl-5 col-lg-6 col-md-8 col-sm-10 col-12">
          <div className="logo-container">
            <div className="logo"></div>
          </div>
          <div className="form-container">
            <div className="title">
              <h2> {t("login.welcome")}</h2>
              <div>{t("login.welcome-msg")}</div>
            </div>
            <CustomFormik saveToken={saveToken} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
