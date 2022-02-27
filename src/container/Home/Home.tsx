import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { setallProperties } from "../../store/actions";
import { rootState } from "../../store/reducers";
import "./Home.scss";
const Home = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const allProperty = useSelector(
    (state: rootState) => state.abshur.allProperty
  );
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    await dispatch(setallProperties());
    setLoading(false);
  };
  return (
    <div className="container">
      <div className="home">
        {!loading ? (
          allProperty && allProperty.length > 0 ? (
            allProperty.map((r: any) => {
              return <PropertyCard key={r.id} Property={r} />;
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

export default Home;
