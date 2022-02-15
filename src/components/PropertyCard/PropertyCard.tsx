import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../../assets/constants/routes";
import { Realty } from "../../assets/constants/type";
import { setCurrentProperty } from "../../store/actions";
import CreatePropertyModal from "../Modals/createProperty/CreateProperty";
import { ModalType } from "../Modals/modalType";
import { BiEdit } from "react-icons/bi";
import "./PropertyCard.scss";
import { getDateFormat } from "../../assets/constants/memento";
type Props = {
  Property: Realty;
};

const PropertyCard: React.FC<Props> = ({ Property }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModalCreateProperty, setOpenModalCreateProperty] = useState(false);

  const openCloseModalCreateProperty = () => {
    setOpenModalCreateProperty(!openModalCreateProperty);
  };

  const handlrCar = () => {
    dispatch(setCurrentProperty(Property));
    navigate(routes.PROPERTY_DETAIL);
  };

  return (
    <>
      <CreatePropertyModal
        isOpen={openModalCreateProperty}
        onModalClose={openCloseModalCreateProperty}
        type={ModalType.createProperty}
        editData={Property}
      />
      <div className="card">
        <div className="card-header">
          <div>{Property.name}</div>
          <BiEdit onClick={openCloseModalCreateProperty} />
        </div>
        <div onClick={handlrCar}>
          <div>
            {t("home.property-num")} :<span> {Property.number}</span>
          </div>
          <div>
            {t("home.property-name")} :<span> {Property.name}</span>
          </div>
          <div>
            {t("home.property-date")} :<span> {getDateFormat(Property.propertyDate)}</span>
          </div>
          <div>
            {t("home.property-address")} :<span> {Property.address}</span>
          </div>
          <div>
            {t("home.property-owner")} :<span> {Property.user?.name}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyCard;
