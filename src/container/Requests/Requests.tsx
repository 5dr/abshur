import "./Requests.scss";
import { IoMdSend } from "react-icons/io";
import SingleChat from "../../components/Requests/SingleChat/SingleChat";
import ChatMsg from "../../components/Requests/ChatMsg/ChatMsg";
import { useState } from "react";

const Requests = () => {
  const [currInd, setCurrInd] = useState(0);

  const handlerCurrInd = (ind: number) => {
    setCurrInd(ind);
  };
  const allchats = [
    {
      name: "محمد صدقى",
    },
    {
      name: "مهند يسري",
    },
    {
      name: "مصطفى سامى",
    },
  ];

  return (
    <div className="requests-container">
      <div className="allchats col-md-4 col-11">
        {allchats.map((chat, ind) => {
          return (
            <SingleChat
              handlerCurrInd={handlerCurrInd}
              ind={ind}
              name={chat.name}
              active={currInd === ind}
            />
          );
        })}
      </div>
      <div className="chat-details col-md-7 col-11">
        <div className="chatBody">
          <ChatMsg msg="اهلا بك معانا" className="received" />
          <ChatMsg msg="اهلا بك معانا" className="sent" />
          <ChatMsg msg="اهلا بك معانا" className="received" />
        </div>
        <div className="typing">
          <div className="text">
            <input type="text" />
          </div>
          <div className="btnSent">
            <IoMdSend />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Requests;
