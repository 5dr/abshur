import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as CloseIcon } from "../../../assets/img/close-icon.svg";
import "react-responsive-modal/styles.css";
import "./AddMaintenance.scss";
import { Modal } from "react-responsive-modal";
import AddMaintenanceFormik from "../../Formik/AddMaintenanceFormik";

type Props = {
  isOpen: boolean;
  onModalClose: () => void;
};

const AddMaintenance: React.FC<Props> = ({ isOpen, onModalClose }) => {
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
      <div dir={i18n.dir()} className="addMaintenance">
        <div className="header-modal">
          {"اضافة صيانة"}
          <CloseIcon onClick={onModalClose} />
        </div>
        <div className="body ">
          <AddMaintenanceFormik />
        </div>
      </div>
    </Modal>
  );
};

export default AddMaintenance;
