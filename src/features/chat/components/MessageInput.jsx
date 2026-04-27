import { useState } from "react";
import { useSelector } from "react-redux";
import { getSocket } from "../../../services/socket";

function MessageInput() {
  const [text, setText] = useState("");
  const user = useSelector((state) => state.auth.user);

  const sendMessage = () => {
    const socket = getSocket();

    if (!socket || !text.trim()) return;

    socket.emit("send_message", {
      id: Date.now(),
      text,
      user: {
        name: user?.name || "You",
      },
      createdAt: new Date().toISOString(),
    });

    setText("");
  };

  return (
    <div className="flex gap-2">
      <input
        className="border p-2 flex-1 rounded"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") sendMessage();
        }}
        placeholder="Type a message..."
      />

      <button
        className="bg-blue-500 text-white px-4 rounded"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;