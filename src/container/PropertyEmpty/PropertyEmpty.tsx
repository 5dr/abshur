import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Realty, Realty_Type } from "../../assets/constants/type";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { setallProperties } from "../../store/actions";
import { rootState } from "../../store/reducers";
import "./PropertyEmpty.scss";

const PropertyEmpty = () => {
  const dispatch = useDispatch();
  const propertyEmpty = useSelector(
    (state: rootState) => state.abshur.propertyEmpty
  );
  useEffect(() => {
    dispatch(setallProperties(Realty_Type.empty));
  }, []);

  return (
    <div className="container">
      <div className="propertyEmpty">
        {propertyEmpty.map((r: any) => {
          return <PropertyCard key={r.id} Property={r} />;
        })}
      </div>
    </div>
  );
};

export default PropertyEmpty;
