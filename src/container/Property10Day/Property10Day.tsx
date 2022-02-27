import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Realty, Realty_Type } from "../../assets/constants/type";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { setallProperties } from "../../store/actions";
import { rootState } from "../../store/reducers";
import "./Property10Day.scss";

const Property10Day = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const property10Day = useSelector(
    (state: rootState) => state.abshur.property10Day
  );
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await dispatch(setallProperties(Realty_Type.ten_days));
    setLoading(false);
  };
  return (
    <div className="container">
      <div className="property10Day">
        {!loading ? (
          property10Day && property10Day.length > 0 ? (
            property10Day.map((r: any) => {
              return (
                <PropertyCard
                  key={r.id}
                  Property={r}
                  status={Realty_Type.ten_days}
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

export default Property10Day;
