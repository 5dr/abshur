import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as CloseIcon } from "../../../assets/img/close-icon.svg";
import "react-responsive-modal/styles.css";
import "./yesOrNo.scss";
import { Modal } from "react-responsive-modal";
import AddUserModal from "../addUser/AddUser";
import { successToast } from "../../../services/toast/toast";

type Props = {
  isOpen: boolean;
  onModalClose: () => void;
  message?: string;
  phone?: string;
  role?: string;
  onYes?: () => void;
};

const YesOrNoModal: React.FC<Props> = ({
  isOpen,
  onModalClose,
  message,
  phone,
  role,
  onYes,
}) => {
  const { i18n } = useTranslation();
  const [openModalAddUser, setOpenModalAddUser] = useState(false);
  const openCloseModalAddUser = () => {
    setOpenModalAddUser(!openModalAddUser);
  };
  return (
    <>
      <AddUserModal
        isOpen={openModalAddUser}
        onModalClose={openCloseModalAddUser}
        phone={phone}
        role={role}
      />
      <Modal
        open={isOpen}
        closeOnOverlayClick={false}
        showCloseIcon={false}
        onClose={onModalClose}
        center={true}
        classNames={{
          modal: "customModal",
        }}
        animationDuration={500}
      >
        <div dir={i18n.dir()} className="yes-or-no">
          <div className="header-modal">
            <CloseIcon height={"14px"} onClick={onModalClose} />
          </div>
          <div className="body ">{message}</div>
          <div className="bottuns">
            <button
              onClick={() => {
                if (phone) {
                  onModalClose();
                  openCloseModalAddUser();
                  onModalClose()
                } else {
                  if (onYes) onYes();
                  onModalClose()
                  successToast("تم الدفع بنجاج");
                }
              }}
              className="yes"
            >
              نعم
            </button>
            <button onClick={onModalClose} className="yes no">
              لا
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default YesOrNoModal;
