function MessageItem({ message, currentUser }) {
  const isMe = message.user?.name === currentUser?.name;

  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} mb-2`}>
      <div
        className={`px-3 py-2 rounded max-w-xs ${
          isMe ? "bg-blue-500 text-white" : "bg-gray-200"
        }`}
      >
        <p>{message.text}</p>
      </div>
    </div>
  );
}

export default MessageItem;
