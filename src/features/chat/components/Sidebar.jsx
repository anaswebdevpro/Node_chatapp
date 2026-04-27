function Sidebar() {
  return (
    <div className="p-3">
      <h2 className="font-bold">Chats</h2>

      {/* Dummy users */}
      <div className="mt-3 space-y-2">
        <div className="p-2 bg-gray-200 rounded">Anas</div>
        <div className="p-2 bg-gray-200 rounded">John</div>
      </div>
    </div>
  );
}

export default Sidebar;
