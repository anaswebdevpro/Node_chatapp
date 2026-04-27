function ChatLayout({ sidebar, header, messages, input }) {
  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-1/4 border-r">{sidebar}</div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="border-b p-3">{header}</div>
        <div className="flex-1 overflow-y-auto p-3">{messages}</div>
        <div className="border-t p-3">{input}</div>
      </div>
    </div>
  );
}

export default ChatLayout;
