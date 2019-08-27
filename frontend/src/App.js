import React, { useState } from 'react';
import Users from './Users';
import User from './User';

function App() {
  const [selectedUser, setSelectedUser] = useState(null);
  return (
    <div className="container mx-auto px-4">
      {selectedUser ? (
        <User user={selectedUser} selectUser={setSelectedUser} />
      ) : (
        <Users selectUser={setSelectedUser} />
      )}
    </div>
  );
}

export default App;
