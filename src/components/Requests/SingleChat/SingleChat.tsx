import { ReactComponent as Avater } from "../../../assets/img/avater.svg";
import "./SingleChat.scss";

type Props = {
  name: string;
  active?: boolean;
  ind: number;
  handlerCurrInd: (ind: number) => void;
};
const SingleChat: React.FC<Props> = ({ handlerCurrInd, ind, name, active }) => {
  return (
    <div
      onClick={() => {
        handlerCurrInd(ind);
      }}
      className={`singleChat ${active ? "activeChat" : ""}`}
    >
      <div>
        <Avater />
      </div>
      <div>{name}</div>
    </div>
  );
};

export default SingleChat;
