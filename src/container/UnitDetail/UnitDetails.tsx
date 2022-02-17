import "./UnitDetails.scss";
import { useSelector } from "react-redux";
import { rootState } from "../../store/reducers";
import { useState } from "react";
import { apiUrl } from "../../services/api/serverUrl";
import AddMaintenance from "../../components/Modals/AddMaintenance/AddMaintenance";
import ContentUnitDetails from "../../components/UnitDetail/ContentUnitDetails/ContentUnitDetails";
import { useTranslation } from "react-i18next";
import { getDateFormat } from "../../assets/constants/memento";

const UnitDetails = () => {
  const [notes, openNotes] = useState(true);
  const { t } = useTranslation();

  const currentUnits = useSelector(
    (state: rootState) => state.abshur.currentUnits
  );
  const currentMaintenance = useSelector(
    (state: rootState) => state.abshur.currentMaintenance
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
          <div className="unit-details-notes">
            {!notes
              ? currentMaintenance.map((Maintenance: any) => {
                  return <SingleNote Maintenance={Maintenance} />;
                })
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UnitDetails;

type Props = {
  Maintenance: any;
};

const SingleNote: React.FC<Props> = ({ Maintenance }) => {
  return (
    <div className="singleNote">
      <div className="col-12 col-md-5">{Maintenance?.request}</div>
      <div className="col-12 col-md-1">
        {Maintenance?.cost ? Maintenance.cost : 0}
      </div>
      <div className="col-12 col-md-2">
        {getDateFormat(Maintenance?.createdAt)}
      </div>
      <div className="col-12 col-md-4">
        <img src={`${apiUrl}/${Maintenance?.image}`} alt="" />
      </div>
    </div>
  );
};
