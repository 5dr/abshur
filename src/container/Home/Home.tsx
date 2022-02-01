import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import { setallProperties } from "../../store/actions";
import { rootState } from "../../store/reducers";
import "./Home.scss";
const Home = () => {
  const dispatch = useDispatch();
  const allProperty = useSelector(
    (state: rootState) => state.abshur.allProperty
  );
  useEffect(() => {
    dispatch(setallProperties());
  }, []);

  return (
    <div className="container">
      <div className="home">
        {allProperty.map((r: any) => {
          return <PropertyCard key={r.id} Property={r} />;
        })}
      </div>
    </div>
  );
};

export default Home;
