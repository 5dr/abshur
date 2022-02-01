import { Link } from "react-router-dom";

type Props = {
  link: string;
  name: string;
};

const LinkComponent: React.FC<Props> = ({ link, name }) => {
  return <Link to={link}>{name}</Link>;
};

export default LinkComponent;
