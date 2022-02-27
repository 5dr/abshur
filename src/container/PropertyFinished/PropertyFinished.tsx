import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Realty, Realty_Type } from "../../assets/constants/type";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { setallProperties } from "../../store/actions";
import { rootState } from "../../store/reducers";
import "./PropertyFinished.scss";

const PropertyFinished = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const propertyFinished = useSelector(
    (state: rootState) => state.abshur.propertyFinished
  );
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    setLoading(true);
    await dispatch(setallProperties(Realty_Type.not_paid));
    setLoading(false);
  };

  return (
    <div className="container">
      <div className="propertyFinished">
        {!loading ? (
          propertyFinished && propertyFinished.length > 0 ? (
            propertyFinished.map((r: any) => {
              return (
                <PropertyCard
                  key={r.id}
                  Property={r}
                  status={Realty_Type.not_paid}
                />
              );
            })
          ) : (
            <div style={{ background: "white", fontSize: "30px" }}>
              {"لا يوجد عقارات"}
            </div>
          )
        ) : (
          <div className="bigLoader"></div>
        )}
      </div>
    </div>
  );
};

export default PropertyFinished;
