import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Realty, Realty_Type } from "../../assets/constants/type";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { setallProperties } from "../../store/actions";
import { rootState } from "../../store/reducers";
import "./Property10Day.scss";

const Property10Day = () => {
  const dispatch = useDispatch();
  const property10Day = useSelector(
    (state: rootState) => state.abshur.property10Day
  );
  useEffect(() => {
    dispatch(setallProperties(Realty_Type.ten_days));
  }, []);
  return (
    <div className="container">
      <div className="property10Day">
        {property10Day.map((r: any) => {
          return <PropertyCard key={r.id} Property={r} />;
        })}
      </div>
    </div>
  );
};

export default Property10Day;
