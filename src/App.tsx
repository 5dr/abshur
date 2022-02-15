import "./App.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import routes from "./assets/constants/routes";
import Header from "./components/Header/Header";
import i18n from "./services/i18n";
import Login from "./container/Login/Login";
import { ReactComponent as Wave } from "./assets/img/wave.svg";
import { ReactComponent as Avater } from "./assets/img/avater.svg";
import img from "./assets/img/img.png";
import Home from "./container/Home/Home";
import Property10Day from "./container/Property10Day/Property10Day";
import PropertyFinished from "./container/PropertyFinished/PropertyFinished";
import PropertyEmpty from "./container/PropertyEmpty/PropertyEmpty";
import { useTranslation } from "react-i18next";
import { Realty } from "./assets/constants/type";
import PropertyCard from "./components/PropertyCard/PropertyCard";
import { ToastContainer } from "react-toastify";
import { toastOptions } from "./services/toast/toast";
import "react-toastify/dist/ReactToastify.css";
import useToken from "./hooks/useToken";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import PropertyDetail from "./container/PropertyDetail/PropertyDetail";
import UnitDetails from "./container/UnitDetail/UnitDetails";
import { IoMdSend } from "react-icons/io";
import Requests from "./container/Requests/Requests";

function App() {
  const location = useLocation();
  const [token, setToken, removeToken] = useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      navigate(routes.LOGIN);
    } else {
      navigate(routes.HOME);
    }
  }, [token]);

  const saveToken = (key: string, value: string) => {
    setToken(key, value);
  };

  const Logout = () => {
    removeToken();
  };

  return (
    <>
      <div dir={i18n.dir()} className="App">
        {token && <Header Logout={Logout} />}
        <div className="main d-flex" style={!token ? { top: 0 } : {}}>
          {location.pathname !== routes.REQUESTS_AND_FEEDBACK &&
            location.pathname !== routes.UNIT_DETAIL &&
            token && <Wave />}
          <Routes>
            <Route>
              <Route
                path={routes.LOGIN}
                element={<Login auth={!!token} saveToken={saveToken} />}
              />
              <Route path={routes.HOME} element={<Home />} />
              <Route
                path={routes.PROPERTY_10_DAY}
                element={<Property10Day />}
              />
              <Route
                path={routes.PROPERTY_FINISHED}
                element={<PropertyFinished />}
              />
              <Route path={routes.PROPERTY_EMPTY} element={<PropertyEmpty />} />
              <Route
                path={routes.CREATE_PROPERTY}
                element={<PropertyEmpty />}
              />
              <Route path={routes.UNIT_DETAIL} element={<UnitDetails />} />
              <Route
                path={routes.REQUESTS_AND_FEEDBACK}
                element={<Requests />}
              />
              <Route
                path={routes.PROPERTY_DETAIL}
                element={<PropertyDetail />}
              />
              <Route path="*" caseSensitive element={<NotFonud />} />
            </Route>
          </Routes>
        </div>
      </div>
      <ToastContainer {...toastOptions} />
    </>
  );
}
const NotFonud = () => {
  return (
    <div>
      <h1>NotFonud</h1>
    </div>
  );
};

export default App;
