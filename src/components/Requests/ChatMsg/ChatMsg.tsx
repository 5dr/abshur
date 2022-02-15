import "./ChatMsg.scss";

type Props = {
  msg: string;
  className: string;
};
const ChatMsg: React.FC<Props> = ({ className, msg }) => {
  return (
    <div className={className}>
      <div>{msg}</div>
    </div>
  );
};

export default ChatMsg;
