import "./UnitDetails.scss";
import { useSelector } from "react-redux";
import { rootState } from "../../store/reducers";
import { useState } from "react";
import { apiUrl } from "../../services/api/serverUrl";
import AddMaintenance from "../../components/Modals/AddMaintenance/AddMaintenance";
import ContentUnitDetails from "../../components/UnitDetail/ContentUnitDetails/ContentUnitDetails";

const UnitDetails = () => {
  const [notes, openNotes] = useState(true);
  const currentUnits = useSelector(
    (state: rootState) => state.abshur.currentUnits
  );
  const widthImgs = 100 / currentUnits?.contractImages.length;

  const toggle = (flag: boolean) => {
    openNotes(flag);
  };

  const [openModalAddMaintenance, setOpenModalAddMaintenance] = useState(false);

  const openCloseModalAddMaintenance = () => {
    setOpenModalAddMaintenance(!openModalAddMaintenance);
  };

  return (
    <div className="container">
      <AddMaintenance
        isOpen={openModalAddMaintenance}
        onModalClose={openCloseModalAddMaintenance}
      />
      <div className="unit-details">
        <div className="unit-details-title">
          <div>{"تفاصيل الوحدة"}</div>
          <div>
            <button className="create-btn m-1">{"اضافة ملحوظة مكتبة"}</button>
            <button
              onClick={openCloseModalAddMaintenance}
              className="create-btn m-1"
            >
              {"اضافة صيانة"}
            </button>
          </div>
        </div>
        <div className="unit-details-content">
          <div className="unit-details-content-img col-11 col-lg-5">
            <div>{"صورة العقد"}</div>
            <div className="unit-details-content-imgs">
              {currentUnits?.contractImages.map((img: string) => (
                <img
                  key={img}
                  src={`${apiUrl}/${img}`}
                  alt=""
                  style={{
                    width: `${widthImgs}%`,
                  }}
                />
              ))}
            </div>
          </div>
          <div className="unit-details-content-details col-11 col-lg-5">
            <ContentUnitDetails />
          </div>
        </div>
        <div className="unit-details-notes">
          <div className="unit-details-notes-bottuns">
            <button
              onClick={() => {
                toggle(true);
              }}
              className={`${notes ? "select" : "unselect"} col-6`}
            >
              {"ملحوظات المكتب"}
            </button>
            <button
              onClick={() => {
                toggle(false);
              }}
              className={`${!notes ? "select" : "unselect"} col-6`}
            >
              {"صيانات"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UnitDetails;
