import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as CloseIcon } from "../../../assets/img/close-icon.svg";
import "react-responsive-modal/styles.css";
import "./ChangePassword.scss";
import { Modal } from "react-responsive-modal";
import AddMaintenanceFormik from "../../Formik/AddMaintenanceFormik";
import AddOfficeNote from "../../Formik/AddOfficeNote";
import ChangePasswordFormik from "../../Formik/ChangePasswordFormik";

type Props = {
  isOpen: boolean;
  onModalClose: () => void;
};

const ChangePassword: React.FC<Props> = ({ isOpen, onModalClose }) => {
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
        modal: "customModal col-sm-8 col-10",
      }}
      animationDuration={800}
    >
      <div dir={i18n.dir()} className="ChangePassword">
        <div className="header-modal">
          تعديل البروفيل
          <CloseIcon onClick={onModalClose} />
        </div>
        <div className="body ">
          <ChangePasswordFormik />
        </div>
      </div>
    </Modal>
  );
};

export default ChangePassword;
