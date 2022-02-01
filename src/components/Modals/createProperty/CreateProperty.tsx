import React from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as CloseIcon } from "../../../assets/img/close-icon.svg";
import "react-responsive-modal/styles.css";
import "./CreateProperty.scss";
import { Modal } from "react-responsive-modal";
import CreatePropertyFormik from "../../Formik/createPropertyFormik";
import { ModalType } from "../modalType";
import CreateUnitFormik from "../../Formik/createUnitFormik";

type Props = {
  isOpen: boolean;
  onModalClose: () => void;
  type?: string;
};

const CreatePropertyModal: React.FC<Props> = ({
  isOpen,
  onModalClose,
  type,
}) => {
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
      <div dir={i18n.dir()} className="createProperty">
        <div className="header-modal">
          <div>
            {type === ModalType.createProperty
              ? t("home.add-property")
              : t("home.add-unit")}
          </div>
          <CloseIcon onClick={onModalClose} />
        </div>
        <div className="body ">
          {type === ModalType.createProperty && <CreatePropertyFormik />}
          {type === ModalType.createUnit && <CreateUnitFormik />}
        </div>
      </div>
    </Modal>
  );
};

export default CreatePropertyModal;
