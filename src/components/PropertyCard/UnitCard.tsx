import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { getDateFormat } from "../../assets/constants/memento";
import routes from "../../assets/constants/routes";
import { Unit } from "../../assets/constants/type";
import { setCurrentUnit } from "../../store/actions";
import { BiEdit } from "react-icons/bi";
import "./PropertyCard.scss";
import { useState } from "react";
import CreatePropertyModal from "../Modals/createProperty/CreateProperty";
import { ModalType } from "../Modals/modalType";
import { useNavigate } from "react-router-dom";
type Props = {
  Unit: Unit;
};

const UnitCard: React.FC<Props> = ({ Unit }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openModalCreateUnit, setOpenModalCreateUnit] = useState(false);

  const openCloseModalCreateUnit = () => {
    setOpenModalCreateUnit(!openModalCreateUnit);
  };

  const handlrCar = () => {
    dispatch(setCurrentUnit(Unit));
    navigate(routes.UNIT_DETAIL);
  };

  return (
    <>
      <CreatePropertyModal
        isOpen={openModalCreateUnit}
        onModalClose={openCloseModalCreateUnit}
        type={ModalType.createUnit}
        editData={Unit}
      />
      <div className="card">
        <div className="card-header">
          <div>{Unit.unitNumber}</div>
          <BiEdit onClick={openCloseModalCreateUnit} />
        </div>
        <div onClick={handlrCar}>
          <div>
            {t("create-unit.rent-price")} :<span> {Unit.rentPrice}</span>
          </div>
          <div>
            {t("create-unit.pay-date")} :
            <span> {getDateFormat(Unit.payDate)}</span>
          </div>
          <div>
            {t("create-unit.rent-date")} :
            <span> {getDateFormat(Unit.rentalDate)}</span>
          </div>
          <div>
            {t("create-unit.electricity-number")} :
            <span> {Unit.electricityNumber}</span>
          </div>
          <div>
            {t("create-unit.payment-plan")} :<span> {Unit.paymentPlan}</span>
          </div>
          <div>
            {t("create-unit.unit-status")} :<span> {Unit.unitStatus}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default UnitCard;
