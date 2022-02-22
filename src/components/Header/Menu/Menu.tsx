import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../../../assets/constants/routes";
import { MenuItem } from "../../../assets/constants/type";
import useWindowSize from "../../../hooks/useWindowSize";
import LinkComponent from "../../Link/Link";
import CreatePropertyModal from "../../Modals/createProperty/CreateProperty";
import { ModalType } from "../../Modals/modalType";
import "./Menu.scss";

const Menu = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const size = useWindowSize();
  const [isSelected, setSlected] = useState(false);
  const [currOption, setCurrOption] = useState(routes.HOME);

  useEffect(() => {
    let flag = false;
    MenuItems.forEach((m) => {
      if (m.active) flag = m.active;
    });
    setSlected(flag);
  }, [location]);
  useEffect(() => {
    if (!isSelected) {
      setCurrOption("other");
    }
  }, [isSelected]);

  const MenuItems: MenuItem[] = [
    {
      active: location.pathname === routes.HOME,
      name: t("pages.home"),
      route: routes.HOME,
    },
    {
      active: location.pathname === routes.PROPERTY_10_DAY,
      name: t("pages.property-10-day"),
      route: routes.PROPERTY_10_DAY,
    },
    {
      active: location.pathname === routes.PROPERTY_FINISHED,
      name: t("pages.property-finished"),
      route: routes.PROPERTY_FINISHED,
    },
    {
      active: location.pathname === routes.PROPERTY_EMPTY,
      name: t("pages.property-empty"),
      route: routes.PROPERTY_EMPTY,
    },
    {
      active: location.pathname === routes.REQUESTS_AND_FEEDBACK,
      name: t("pages.Requests-Feedback"),
      route: routes.REQUESTS_AND_FEEDBACK,
    },
  ];

  const [openModalCreateProperty, setOpenModalCreateProperty] = useState(false);

  const openCloseModalCreateProperty = () => {
    setOpenModalCreateProperty(!openModalCreateProperty);
  };

  const handleChange = (event: any) => {
    navigate(event.target.value);
    setCurrOption(event.target.value);
  };
  return (
    <div className="menu">
      <CreatePropertyModal
        isOpen={openModalCreateProperty}
        onModalClose={openCloseModalCreateProperty}
        type={ModalType.createProperty}
      />
      {size.width > 1070 ? (
        <ul className="nav d-flex justify-content-center">
          {MenuItems.map(({ active, name, route }, index) => {
            return (
              <li key={index} className={`nav-item ${active && "active"}`}>
                <LinkComponent name={name} link={route} />
              </li>
            );
          })}
          <li className={`nav-item`}>
            <button
              onClick={openCloseModalCreateProperty}
              className="create-btn"
            >
              {t("home.add-property")}
            </button>
          </li>
        </ul>
      ) : (
        <>
          <select className="select" onChange={handleChange} value={currOption}>
            {!isSelected && (
              <option disabled value="other">
                ...
              </option>
            )}
            {MenuItems.map(({ active, name, route }, index) => {
              return (
                <option value={route} key={index}>
                  {name}
                </option>
              );
            })}
          </select>
          <button onClick={openCloseModalCreateProperty} className="create-btn">
            {t("home.add-property")}
          </button>
        </>
      )}
    </div>
  );
};

export default Menu;
