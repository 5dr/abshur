import "./SubUnitDetails.scss";

type Props = {
  title: string;
  value: string;
};
const SubUnitDetails: React.FC<Props> = ({ title, value }) => {
  return (
    <div className="sub-details">
      <div className="sub-details-title">{title}</div>
      <div className="sub-details-detail">{value}</div>
    </div>
  );
};

export default SubUnitDetails;
