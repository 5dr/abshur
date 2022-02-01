import logo from "../../assets/img/logo.png";
import logout from "../../assets/img/logout.svg";
import Menu from "./Menu/Menu";
import "./Header.scss";

type Props = {
  Logout?: () => void;
};

const Header: React.FC<Props> = ({ Logout }) => {
  return (
    <div dir="rtl" className="header">

      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <Menu />
      <div
        onClick={() => {
          if (Logout) Logout();
        }}
        className="d-flex logout"
      >
        <img src={logout} alt="" />
      </div>
    </div>
  );
};

export default Header;
