import React from 'react';
import './dropDown.scss';

const DropDown = ({ users, selectedUser, setSelectedUser }) => {
  return (
<div className="dropdown">
      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="dropbtn"
      >
        <option value="">Alla användare</option> {/* För att visa alla meddelanden */}
        {users.map((user, index) => (
          <option key={index} value={user}>
            {user}
          </option>
        ))}
      </select>
    </div>
  )
}

export default DropDown