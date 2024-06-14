import React from 'react';

const UserDropdown = ({ users, selectedUser, handleUserChange }) => {
    return (
        <select value={selectedUser} onChange={handleUserChange} className="form-select">
            <option value="">Select User</option>
            {users.map((user, index) => (
                <option key={index} value={user.id}>{user.name}</option>
            ))}
        </select>
    );
};

export default UserDropdown;
