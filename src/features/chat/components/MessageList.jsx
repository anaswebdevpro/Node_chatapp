import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSocket } from "../../../services/socket";
import { addMessage } from "../chatSlice";
import MessageItem from "./MessageItems";

function MessageList() {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.chat.messages);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    const handleMessage = (data) => {
      dispatch(addMessage(data));
    };

    socket.on("receive_message", handleMessage);

    return () => {
      socket.off("receive_message", handleMessage);
    };
  }, [dispatch]);

  return (
    <div>
      {messages.map((msg) => (
        <MessageItem key={msg.id} message={msg} currentUser={user} />
      ))}
    </div>
  );
}

export default MessageList;
