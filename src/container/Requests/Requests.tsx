import "./Requests.scss";
import { IoMdSend } from "react-icons/io";
import SingleChat from "../../components/Requests/SingleChat/SingleChat";
import ChatMsg from "../../components/Requests/ChatMsg/ChatMsg";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  sendChatMsg,
  setallChat,
  setCurrentChat,
} from "../../store/actions/abshur.actions";
import { rootState } from "../../store/reducers";

const Requests = () => {
  const [currInd, setCurrInd] = useState(0);
  const dispatch = useDispatch();
  const [maintenance, openMaintenance] = useState(true);
  const [currType, setCurrType] = useState("maintenance");
  const [currMsg, setCurrMsg] = useState("");
  const [currUid, setCurrUid] = useState(0);

  const toggle = (flag: boolean) => {
    openMaintenance(flag);
  };
  const allChat = useSelector((state: rootState) => state.abshur.allChat);
  const currentChat = useSelector(
    (state: rootState) => state.abshur.currentChat
  );
  const handlerCurrInd = (ind: number, id: number) => {
    setCurrInd(ind);
    dispatch(setCurrentChat(id, currType));
    setCurrUid(id);
  };

  useEffect(() => {
    dispatch(setallChat());
  }, []);
  
  useEffect(() => {
    if (allChat) {
      setCurrInd(0);
      dispatch(setCurrentChat(allChat[0]?.uid, currType));
      setCurrUid(allChat[0]?.uid);
    }
  }, [allChat]);

  const handlerInput = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    // const attrName = e.target.id;
    const attrValue = e.target.value;
    setCurrMsg(attrValue);
  };
  const handlerSendMsg = () => {
    dispatch(sendChatMsg(currUid, currMsg, currType));
    setCurrMsg("");
  };

  return (
    <div className="requests-container">
      <div className="allchats col-md-4 col-11">
        <div className="unit-details-notes-bottuns">
          <button
            onClick={() => {
              toggle(true);
              setCurrType("feedback");
            }}
            className={`${maintenance ? "select" : "unselect"} col-6`}
          >
            {"شكاوي"}
          </button>
          <button
            onClick={() => {
              toggle(false);
              setCurrType("maintenance");
            }}
            className={`${!maintenance ? "select" : "unselect"} col-6`}
          >
            {"صيانات"}
          </button>
        </div>
        {allChat.map((chat: any, ind: number) => {
          return (
            <SingleChat
              key={ind}
              handlerCurrInd={handlerCurrInd}
              ind={ind}
              chat={chat}
              active={currInd === ind}
            />
          );
        })}
      </div>
      <div className="chat-details col-md-7 col-11">
        <div className="chatBody">
          {currentChat.map((chat: any, ind: number) => {
            return (
              <ChatMsg
                key={ind}
                msg={chat.content}
                className={`${chat.isAdmin ? "sent" : "received"}`}
              />
            );
          })}
        </div>
        <div className="typing">
          <div className="text">
            <input value={currMsg} onChange={handlerInput} type="text" />
          </div>
          <div onClick={handlerSendMsg} className="btnSent">
            <IoMdSend />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Requests;
