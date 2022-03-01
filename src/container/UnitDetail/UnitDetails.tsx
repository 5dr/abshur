import "./UnitDetails.scss";
import { useDispatch, useSelector } from "react-redux";
import { rootState } from "../../store/reducers";
import { useState } from "react";
import { apiUrl } from "../../services/api/serverUrl";
import AddMaintenance from "../../components/Modals/AddMaintenance/AddMaintenance";
import ContentUnitDetails from "../../components/UnitDetail/ContentUnitDetails/ContentUnitDetails";
import { useTranslation } from "react-i18next";
import { getDateFormat, getMonth } from "../../assets/constants/memento";
import imgPdf from "../../assets/img/imgPdf.png";
import { opewNewTap } from "../../services/openNewTap";
import YesOrNoModal from "../../components/Modals/yesOrNo/yeaOrNo";
import apiService from "../../services/api";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { setCurrentUnit } from "../../store/actions";

const UnitDetails = () => {
  const [notes, openNotes] = useState(true);
  const [isMaintenance, SetIsMaintenance] = useState(true);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentUnits = useSelector(
    (state: rootState) => state.abshur.currentUnits
  );
  const currentMaintenance = useSelector(
    (state: rootState) => state.abshur.currentMaintenance
  );
  const currentOfficeNote = useSelector(
    (state: rootState) => state.abshur.currentOfficeNote
  );
  const widthImgs = 100 / currentUnits?.contractImages.length;

  const toggle = (flag: boolean) => {
    openNotes(flag);
  };
  const [openModalAddMaintenance, setOpenModalAddMaintenance] = useState(false);
  const [openModalYesOrNo, setOpenModalYesOrNo] = useState(false);

  const openCloseModalAddMaintenance = () => {
    setOpenModalAddMaintenance(!openModalAddMaintenance);
  };
  const openCloseModalYesOrNo = () => {
    setOpenModalYesOrNo(!openModalYesOrNo);
  };
  const pay = async () => {
    const formData = new FormData();
    const {
      unitNumber,
      propertyId,
      rentalDate,
      rentPrice,
      electricityNumber,
      paymentPlan,
      id,
    } = currentUnits;
    formData.append("payDate", currentUnits.nextPayDate);
    formData.append("rentPrice", rentPrice);
    formData.append("unitNumber", unitNumber);
    formData.append("rentalDate", rentalDate);
    formData.append("electricityNumber", electricityNumber);
    formData.append("paymentPlan", paymentPlan);
    formData.append("propertyId", propertyId);

    const { data } = await apiService.updateUnit({
      formData,
      id,
    });
    dispatch(setCurrentUnit(data.data));
  };

  return (
    <div className="container">
      <AddMaintenance
        isOpen={openModalAddMaintenance}
        onModalClose={openCloseModalAddMaintenance}
        isMaintenance={isMaintenance}
      />
      <YesOrNoModal
        isOpen={openModalYesOrNo}
        onModalClose={openCloseModalYesOrNo}
        message={`هل تريد الدفع عن شهر ${getMonth(currentUnits?.payDate)}`}
        onYes={pay}
      />
      <div className="unit-details">
        <div className="unit-details-title">
          <div style={{ fontWeight: "500" }}>{"تفاصيل الوحدة"}</div>
          <div>
            <button
              onClick={() => {
                SetIsMaintenance(false);
                openCloseModalAddMaintenance();
              }}
              className="create-btn m-1"
            >
              {"اضافة ملحوظة مكتبة"}
            </button>
            <button
              onClick={() => {
                SetIsMaintenance(true);
                openCloseModalAddMaintenance();
              }}
              className="create-btn m-1"
            >
              {"اضافة صيانة"}
            </button>
            <button
              onClick={() => {
                openCloseModalYesOrNo();
              }}
              className="create-btn m-1"
            >
              {"الدفع"}
            </button>
          </div>
        </div>
        <div className="unit-details-content">
          <div className="unit-details-content-img col-11 col-lg-5">
            <div style={{ fontWeight: "500" }}>{"صورة العقد"}</div>
            <div className="unit-details-content-imgs">
              {currentUnits?.contractImages.map((img: string) => {
                var arr = img.split(".");
                if (arr[arr.length - 1] === "pdf") {
                  return (
                    <img
                      key={img}
                      src={imgPdf}
                      alt=""
                      style={{
                        width: `${widthImgs}%`,
                      }}
                      onClick={() => {
                        opewNewTap(`${apiUrl}/${img}`);
                      }}
                    />
                  );
                } else {
                  return (
                    <img
                      key={img}
                      src={`${apiUrl}/${img}`}
                      alt=""
                      style={{
                        width: `${widthImgs}%`,
                      }}
                      onClick={() => {
                        opewNewTap(`${apiUrl}/${img}`);
                      }}
                    />
                  );
                }
              })}
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
              {"ملاحظات المكتب"}
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
            <Table>
              <Thead>
                <Tr>
                  {!notes ? (
                    <>
                      <Th>{t("unitDetail.request")}</Th>
                      <Th>{t("unitDetail.cost")}</Th>
                      <Th>{t("unitDetail.requestDate")}</Th>
                      <Th>{t("unitDetail.img")}</Th>
                    </>
                  ) : (
                    <>
                      <Th>{t("unitDetail.admainName")}</Th>
                      <Th>{t("unitDetail.officeNote")}</Th>
                      <Th>{t("unitDetail.date")}</Th>
                    </>
                  )}
                </Tr>
              </Thead>
              <Tbody>
                {!notes
                  ? currentMaintenance.map((Maintenance: any) => {
                      return (
                        <Tr key={Maintenance?.id}>
                          <Td>{Maintenance?.request}</Td>
                          <Td>{Maintenance?.cost ? Maintenance.cost : 0}</Td>
                          <Td>{getDateFormat(Maintenance?.createdAt)}</Td>
                          <Td>
                            <img
                              onClick={() => {
                                opewNewTap(
                                  `${
                                    Maintenance?.image
                                      ? `${apiUrl}/${Maintenance?.image}`
                                      : ""
                                  }`
                                );
                              }}
                              height="60px"
                              src={`${
                                Maintenance?.image
                                  ? `${apiUrl}/${Maintenance?.image}`
                                  : ""
                              }`}
                              alt=""
                            />
                          </Td>
                        </Tr>
                      );
                    })
                  : currentOfficeNote.map((officeNote: any) => {
                      return (
                        <Tr key={officeNote?.id}>
                          <Td>{officeNote?.response}</Td>
                          <Td>{officeNote?.request}</Td>
                          <Td>{getDateFormat(officeNote?.createdAt)}</Td>
                        </Tr>
                      );
                    })}
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UnitDetails;

// type Props = {
//   Maintenance: any;
// };

// const SingleNote: React.FC<Props> = ({ Maintenance }) => {
//   return (
//     <div className="singleNote">
//       <div className="col-12 col-md-5">{Maintenance?.request}</div>
//       <div className="col-12 col-md-1">
//         {Maintenance?.cost ? Maintenance.cost : 0}
//       </div>
//       <div className="col-12 col-md-2">
//         {getDateFormat(Maintenance?.createdAt)}
//       </div>
//       <div className="col-12 col-md-4">
//         <img
//           onClick={() => {
//             opewNewTap(`${apiUrl}/${Maintenance?.image}`);
//           }}
//           src={`${apiUrl}/${Maintenance?.image}`}
//           alt=""
//         />
//       </div>
//     </div>
//   );
// };
