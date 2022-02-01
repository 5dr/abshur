import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as CloseIcon } from "../../../assets/img/close-icon.svg";
import "react-responsive-modal/styles.css";
import "./AddUser.scss";
import { Modal } from "react-responsive-modal";
import AddUserFormik from "../../Formik/addUserFormik";

type Props = {
  isOpen: boolean;
  onModalClose: () => void;
  phone?: string;
  role?:string
};

const AddUserModal: React.FC<Props> = ({ isOpen, onModalClose, phone,role }) => {
  const { t, i18n } = useTranslation();
  return (
    <Modal
      open={isOpen}
      closeOnOverlayClick={false}
      showCloseIcon={false}
      onClose={onModalClose}
      center={true}
      classNames={{
        overlayAnimationIn: "customEnterOverlayAnimation",
        overlayAnimationOut: "customLeaveOverlayAnimation",
        modalAnimationIn: "customEnterModalAnimation",
        modalAnimationOut: "customLeaveModalAnimation",
        modal: "customModal",
      }}
      animationDuration={800}
    >
      <div dir={i18n.dir()} className="addUser">
        <div className="header-modal">
          <div>{t("home.add-property")}</div>
          <CloseIcon onClick={onModalClose} />
        </div>
        <div className="body ">
          <AddUserFormik phone={phone ? phone : ""} role={role}/>
        </div>
      </div>
    </Modal>
  );
};

export default AddUserModal;
