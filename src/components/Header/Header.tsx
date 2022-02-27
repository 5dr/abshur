import logo from "../../assets/img/logo.png";
import user from "../../assets/img/user.png";
import logout from "../../assets/img/logout.svg";
import Menu from "./Menu/Menu";
import "./Header.scss";
import { useState } from "react";
import ChangePassword from "../Modals/ChangePassword/ChangePassword";

type Props = {
  Logout?: () => void;
};

const Header: React.FC<Props> = ({ Logout }) => {
  const [openModalChangePassword, setOpenModalChangePassword] = useState(false);

  const openCloseModalChangePassword = () => {
    setOpenModalChangePassword(!openModalChangePassword);
  };
  return (
    <div dir="rtl" className="header">
      <ChangePassword
        isOpen={openModalChangePassword}
        onModalClose={openCloseModalChangePassword}
      />
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <Menu />
      <div className="d-flex flex-colmn" style={{ alignItems: "center" }}>
        <div
          onClick={openCloseModalChangePassword}
          style={{ height: "35px", cursor: "pointer" }}
          className="d-flex  m-md-1"
        >
          <img src={user} alt="" />
        </div>
        <div
          onClick={() => {
            if (Logout) Logout();
          }}
          className="d-flex logout"
        >
          <img src={logout} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Header;
