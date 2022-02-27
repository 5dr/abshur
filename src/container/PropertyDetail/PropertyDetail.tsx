import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ReactComponent as Wave } from "../../assets/img/wave.svg";
import { Realty, Unit } from "../../assets/constants/type";
import CreatePropertyModal from "../../components/Modals/createProperty/CreateProperty";
import { ModalType } from "../../components/Modals/modalType";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import "./PropertyDetail.scss";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../store/reducers";
import { setAllUnit } from "../../store/actions";
import AddFees from "../../components/Modals/AddFees/AddFees";
import UnitCard from "../../components/PropertyCard/UnitCard";
import { getDateFormat } from "../../assets/constants/memento";

const PropertyDetail = () => {
  const { t } = useTranslation();
  const [openModalCreateUnit, setOpenModalCreateUnit] = useState(false);
  const [openModalAddFees, setOpenModalAddFees] = useState(false);
  const dispatch = useDispatch();

  const openCloseModalAddFees = () => {
    setOpenModalAddFees(!openModalAddFees);
  };

  const openCloseModalCreateUnit = () => {
    setOpenModalCreateUnit(!openModalCreateUnit);
  };
  const currentProperty = useSelector(
    (state: rootState) => state.abshur.currentProperty
  );
  const loading = useSelector((state: rootState) => state.abshur.loading);
  const units = useSelector((state: rootState) => state.abshur.units);
  // useEffect(() => {
  //   if (currentProperty) dispatch(setAllUnit(currentProperty.id));
  // }, [currentProperty]);

  return (
    <div className="unit-container">
      <CreatePropertyModal
        isOpen={openModalCreateUnit}
        onModalClose={openCloseModalCreateUnit}
        type={ModalType.createUnit}
      />
      <AddFees isOpen={openModalAddFees} onModalClose={openCloseModalAddFees} />
      {currentProperty && (
        <div className="property-details col-md-3 col-12">
          <div className="header-unit">
            <div>{currentProperty.name}</div>
          </div>
          <div className="property-details-body">
            <div>
              {t("home.property-num")} :<span> {currentProperty.number}</span>
            </div>
            <div>
              {t("home.property-name")} :<span> {currentProperty.name}</span>
            </div>
            <div>
              {t("create-property.property-id")} :
              <span> {currentProperty.propertyId}</span>
            </div>
            <div>
              {t("create-property.property-date")} :
              <span> {getDateFormat(currentProperty.propertyDate)}</span>
            </div>
            <div>
              {t("home.property-address")} :
              <span> {currentProperty.address}</span>
            </div>
            <div>
              {t("home.property-owner")} :
              <span> {currentProperty.user?.name}</span>
            </div>
            <div>
              {t("home.property-owner-phone")} :
              <span> {currentProperty.user?.phone}</span>
            </div>
            <div>
              {t("create-property.fees")} :<span> {currentProperty.totalCost}</span>
            </div>
            <div>
              {t("create-property.added-fees")} :
              <span> {currentProperty.addedFees}</span>
            </div>
            <div>
              {t("create-property.revenue")} :
              <span> {currentProperty.revenue}</span>
            </div>
            <div>
              {t("create-property.profitRatio")} :
              <span> {currentProperty.profitRatio}</span>
            </div>
          </div>
          <div className="buttons-container mt-3">
            <button onClick={openCloseModalCreateUnit} className="create-btn">
              {"اضافة وحده"}
            </button>
            <button onClick={openCloseModalAddFees} className="create-btn">
              {t("create-property.added-fees")}
            </button>
          </div>
        </div>
      )}
      <div className="units col-md-9 col-12">
        {!loading ? (
          units && units.length > 0 ? (
            units.map((r: any) => {
              return <UnitCard key={r.id} Unit={r} />;
            })
          ) : (
            <div
              style={{ height: "46px", background: "white", fontSize: "30px" }}
            >
              {"لا يوجد وحدات"}
            </div>
          )
        ) : (
          <div className="bigLoader"></div>
        )}
      </div>
    </div>
  );
};
export default PropertyDetail;
