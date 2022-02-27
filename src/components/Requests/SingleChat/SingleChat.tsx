import { getDiffDate } from "../../../assets/constants/memento";
import { ReactComponent as Avater } from "../../../assets/img/avater.svg";
import "./SingleChat.scss";

type Props = {
  chat: any;
  active?: boolean;
  ind: number;
  handlerCurrInd: (ind: number, id: number) => void;
};
const SingleChat: React.FC<Props> = ({ handlerCurrInd, ind, chat, active }) => {
  return (
    <div
      onClick={() => {
        handlerCurrInd(ind, chat.uid);
      }}
      className={`singleChat ${active ? "activeChat" : ""}`}
    >
      <div className="biscsDitails">
        <div>
          <Avater className="avater" />
        </div>
        <div className="singleChat-ditail">
          <div style={{ fontWeight: "500" }} className="name">
            {chat.user.name}
          </div>
          <div style={{ fontSize: "10px" }} className="name">
            {chat.user.phone}
          </div>
          <div className={`subMsg ${chat.isAdmin ? "" : "notAdmain"}`}>
            {chat.content}
          </div>
        </div>
      </div>
      <div className="time-singleChat">{getDiffDate(chat.updatedAt)}</div>
    </div>
  );
};

export default SingleChat;
