import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getDateFormat } from "../../../assets/constants/memento";
import { rootState } from "../../../store/reducers";
import SubUnitDetails from "../SubUnitDetails/SubUnitDetails";
import "./ContentUnitDetails.scss";

const ContentUnitDetails = () => {
  const { t } = useTranslation();

  const currentUnits = useSelector(
    (state: rootState) => state.abshur.currentUnits
  );
  return (
    <>
      <SubUnitDetails
        title={t("unitDetail.unitNumber")}
        value={currentUnits?.unitNumber}
      />
      <div className="sub-details">
        <div className="sub-details-title">{t("unitDetail.unitStatus")}</div>
        <div
          style={{ backgroundColor: "red" }}
          className="sub-details-detail-status"
        ></div>
      </div>
      <SubUnitDetails
        title={t("unitDetail.electricityNumber")}
        value={currentUnits?.electricityNumber}
      />
      <SubUnitDetails
        title={t("unitDetail.paymentPlan")}
        value={currentUnits?.paymentPlan}
      />
      <SubUnitDetails
        title={t("unitDetail.payDate")}
        value={getDateFormat(currentUnits?.payDate)}
      />
      <SubUnitDetails
        title={t("unitDetail.rentPrice")}
        value={currentUnits?.rentPrice}
      />
    </>
  );
};

export default ContentUnitDetails;
