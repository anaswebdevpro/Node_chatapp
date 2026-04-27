import ChatLayout from "../features/chat/components/ChatLayout";
import Sidebar from "../features/chat/components/Sidebar";
import ChatHeader from "../features/chat/components/ChatHeader";
import MessageList from "../features/chat/components/MessageList";
import MessageInput from "../features/chat/components/MessageInput";

function Chat() {
  return (
    <ChatLayout
      sidebar={<Sidebar />}
      header={<ChatHeader />}
      messages={<MessageList />}
      input={<MessageInput />}
    />
  );
}

export default Chat;