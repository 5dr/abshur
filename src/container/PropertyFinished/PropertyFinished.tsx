import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Realty, Realty_Type } from "../../assets/constants/type";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { setallProperties } from "../../store/actions";
import { rootState } from "../../store/reducers";
import "./PropertyFinished.scss";

const PropertyFinished = () => {
  const dispatch = useDispatch();
  const propertyFinished = useSelector(
    (state: rootState) => state.abshur.propertyFinished
  );
  useEffect(() => {
    dispatch(setallProperties(Realty_Type.not_paid));
  }, []);

  return (
    <div className="container">
      <div className="propertyFinished">
        {propertyFinished.map((r: any) => {
          return <PropertyCard key={r.id} Property={r} />;
        })}
      </div>
    </div>
  );
};

export default PropertyFinished;
