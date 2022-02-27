import { Formik } from "formik";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getDateFormat } from "../../assets/constants/memento";
import routes from "../../assets/constants/routes";
import { Realty, Realty_Type } from "../../assets/constants/type";
import { validationCreatePropertySchema } from "../../assets/constants/validationForm/validationForm";
import apiService from "../../services/api";
import { errorToast, successToast } from "../../services/toast/toast";
import {
  addProperty,
  updateProperty,
} from "../../store/actions/abshur.actions";
import YesOrNoModal from "../Modals/yesOrNo/yeaOrNo";

type Props = {
  editData?: any;
};

const CreatePropertyFormik: React.FC<Props> = ({ editData }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  //const [propertyDate, setPropertyDate] = useState("");

  let realty: Realty = {
    userPhone: editData ? editData.user.phone : "",
    number: editData ? editData.number : "",
    name: editData ? editData.name : "",
    propertyId: editData ? editData.propertyId : "",
    propertyDate: editData ? getDateFormat(editData.propertyDate) : "",
    address: editData ? editData.address : "",
    commission: editData ? editData.commission : "",
    fees: editData ? editData.fees : 0,
    addedFees: editData ? editData.addedFees : 0,
  };

  const [openModalYesOrNo, setOpenModalYesOrNo] = useState(false);
  const [currentUserPhone, setCurrentUserPhone] = useState("");
  const msg = "هذا المالك غير موجد , هل تريد اضافته؟";
  const openCloseModalYesOrNo = () => {
    setOpenModalYesOrNo(!openModalYesOrNo);
  };

  const addOrEditProperty = async (values: any) => {
    try {
      if (editData) {
        setLoading(true);
        await apiService.updateProperty({
          ...values,
          id: editData.id,
        });
        setLoading(false);
        successToast("تم تعديل العقار");

        if (location.pathname === routes.HOME) {
          dispatch(updateProperty());
        } else if (location.pathname === routes.PROPERTY_10_DAY) {
          dispatch(updateProperty(Realty_Type.ten_days));
        } else if (location.pathname === routes.PROPERTY_FINISHED) {
          dispatch(updateProperty(Realty_Type.not_paid));
        } else if (location.pathname === routes.PROPERTY_EMPTY) {
          dispatch(updateProperty(Realty_Type.empty));
        }
      } else {
        setLoading(true);
        const { data } = await apiService.createProperty(values);
        setLoading(false);
        dispatch(addProperty(data.data));
        successToast("تم اضافة العقار");
      }
    } catch (error: any) {
      setLoading(false);
      errorToast(error.data.feedback.en);
      if (
        error.data.feedback.en ===
        "Please make sure that you have entered a valid phone number"
      ) {
        setCurrentUserPhone(values.userPhone ? values.userPhone : "");
        openCloseModalYesOrNo();
      }
    }
  };

  // const handlerInput = (
  //   e:
  //     | React.ChangeEvent<HTMLInputElement>
  //     | React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const attrName = e.target.id;
  //   const attrValue = e.target.value;
  // };

  return (
    <>
      <YesOrNoModal
        isOpen={openModalYesOrNo}
        onModalClose={openCloseModalYesOrNo}
        message={msg}
        phone={currentUserPhone}
        role={"owner"}
      />
      <Formik
        initialValues={realty}
        validationSchema={validationCreatePropertySchema}
        onSubmit={async (values) => {
          values = {
            ...values,
            propertyDate: new Date(values.propertyDate).toISOString(),
          };
          addOrEditProperty(values);
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit}>
            <div className="form">
              <div className="col-sm-5 col-10">
                <label className="col-5" htmlFor="userPhone">
                  {t("create-property.mobile")}
                </label>
                <input
                  className="col-12"
                  id="userPhone"
                  type="text"
                  {...formik.getFieldProps("userPhone")}
                />
                {formik.touched.userPhone && formik.errors.userPhone ? (
                  <div className="error m-0">{formik.errors.userPhone}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-5" htmlFor="name">
                  {t("create-property.name")}
                </label>
                <input
                  className="col-12"
                  id="name"
                  type="text"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="error m-0">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-5" htmlFor="propertyId">
                  {t("create-property.property-id")}
                </label>
                <input
                  className="col-12"
                  id="propertyId"
                  type="text"
                  {...formik.getFieldProps("propertyId")}
                />
                {formik.touched.propertyId && formik.errors.propertyId ? (
                  <div className="error m-0">{formik.errors.propertyId}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-5" htmlFor="propertyDate">
                  {t("create-property.property-date")}
                </label>
                <input
                  className="col-12"
                  id="propertyDate"
                  type="date"
                  {...formik.getFieldProps("propertyDate")}
                />
                {formik.touched.propertyDate && formik.errors.propertyDate ? (
                  <div className="error m-0">{formik.errors.propertyDate}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-5" htmlFor="number">
                  {t("create-property.property-num")}
                </label>
                <input
                  className="col-12"
                  id="number"
                  type="text"
                  {...formik.getFieldProps("number")}
                />
                {formik.touched.number && formik.errors.number ? (
                  <div className="error m-0">{formik.errors.number}</div>
                ) : null}
              </div>
              <div className="col-sm-5 col-10">
                <label className="col-5" htmlFor="commission">
                  {t("create-property.commission")}
                </label>
                <input
                  className="col-12"
                  id="commission"
                  type="number"
                  {...formik.getFieldProps("commission")}
                />
                {formik.touched.commission && formik.errors.commission ? (
                  <div className="error m-0">{formik.errors.commission}</div>
                ) : null}
              </div>
              <div className="col-sm-11 col-10">
                <label className="col-5 col-sm-2" htmlFor="address">
                  {t("create-property.address")}
                </label>
                <input
                  className="col-12"
                  id="address"
                  type="text"
                  {...formik.getFieldProps("address")}
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="error m-0">{formik.errors.address}</div>
                ) : null}
              </div>
            </div>
            <div className="submit">
              <button
                type="submit"
                disabled={loading}
                className="create-btn mt-5"
              >
                {loading ? (
                  <div className="loader"></div>
                ) : editData ? (
                  t("create-property.edit")
                ) : (
                  t("create-property.add")
                )}
              </button>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default CreatePropertyFormik;
