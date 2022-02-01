import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../../assets/constants/routes";
import { Unit } from "../../assets/constants/type";
import { setCurrentProperty } from "../../store/actions";
import "./PropertyCard.scss";
type Props = {
  Unit: Unit;
};

const UnitCard: React.FC<Props> = ({ Unit }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlrCar = () => {
    // dispatch(setCurrentProperty(Property));
    // navigate(routes.PROPERTY_DETAIL);
  };

  return (
    <div onClick={handlrCar} className="card">
      <div className="card-header">
        <div>{Unit.unitNumber}</div>
      </div>
      <div>
        {t("create-unit.rent-price")} :<span> {Unit.rentPrice}</span>
      </div>
      <div>
        {t("create-unit.pay-date")} :<span> {Unit.payDate}</span>
      </div>
      <div>
        {t("create-unit.rent-date")} :<span> {Unit.rentalDate}</span>
      </div>
      <div>
      {t("create-unit.electricity-number")} :<span> {Unit.electricityNumber}</span>
      </div>
      <div>
        {t("create-unit.payment-plan")} :<span> {Unit.paymentPlan}</span>
      </div>
      <div>
      {t("create-unit.unit-status")} :<span> {Unit.unitStatus}</span>
      </div>
    </div>
  );
};

export default UnitCard;
