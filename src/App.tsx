import "./App.scss";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import routes from "./assets/constants/routes";
import Header from "./components/Header/Header";
import i18n from "./services/i18n";
import Login from "./container/Login/Login";
import { ReactComponent as Wave } from "./assets/img/wave.svg";
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
import { setallProperties } from "./store/actions";
import { useDispatch } from "react-redux";
import CreatePropertyModal from "./components/Modals/createProperty/CreateProperty";
import { ModalType } from "./components/Modals/modalType";
import PropertyDetail from "./container/PropertyDetail/PropertyDetail";

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
          {location.pathname !== routes.REQUESTS_AND_FEEDBACK && token && (
            <Wave />
          )}
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
              <Route
                path={routes.REQUESTS_AND_FEEDBACK}
                element={<Settings />}
              />
              <Route
                path={routes.PROPERTY_DETAIL}
                element={<PropertyDetail />}
              />
               <Route
                path={routes.UNIT_DETAIL}
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
const Settings = () => {
  return (
    <div>
      <h1>Settings</h1>
    </div>
  );
};
const NotFonud = () => {
  return (
    <div>
      <h1>NotFonud</h1>
    </div>
  );
};

export default App;
