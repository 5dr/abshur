import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import routes from "../../assets/constants/routes";
import { Realty } from "../../assets/constants/type";
import { setCurrentProperty } from "../../store/actions";
import "./PropertyCard.scss";
type Props = {
  Property: Realty;
};

const PropertyCard: React.FC<Props> = ({ Property }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlrCar = () => {
    dispatch(setCurrentProperty(Property));
    navigate(routes.PROPERTY_DETAIL);
  };

  return (
    <div onClick={handlrCar} className="card">
      <div className="card-header">
        <div>{Property.name}</div>
        <div className="card-status"></div>
      </div>
      <div>
        {t("home.property-num")} :<span> {Property.number}</span>
      </div>
      <div>
        {t("home.property-name")} :<span> {Property.name}</span>
      </div>
      <div>
        {t("home.property-date")} :<span> {Property.propertyDate}</span>
      </div>
      <div>
        {t("home.property-address")} :<span> {Property.address}</span>
      </div>
      <div>
        {t("home.property-owner")} :<span> {Property.user?.name}</span>
      </div>
    </div>
  );
};

export default PropertyCard;
