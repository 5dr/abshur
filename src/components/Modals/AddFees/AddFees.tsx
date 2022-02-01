import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as CloseIcon } from "../../../assets/img/close-icon.svg";
import "react-responsive-modal/styles.css";
import "./AddFees.scss";
import { Modal } from "react-responsive-modal";
import AddFeesFormik from "../../Formik/AddFeesFormik";

type Props = {
  isOpen: boolean;
  onModalClose: () => void;
};

const AddFees: React.FC<Props> = ({ isOpen, onModalClose }) => {
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
      <div dir={i18n.dir()} className="addFees">
        <div className="header-modal">
          {t("create-property.added-fees")}
          <CloseIcon onClick={onModalClose} />
        </div>
        <div className="body ">
          <AddFeesFormik />
        </div>
      </div>
    </Modal>
  );
};

export default AddFees;
