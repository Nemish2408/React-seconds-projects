import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import DisplayUser from '../components/DisplayUser';
import UpdateUser from '../components/UpdateUser';
import { Alert } from 'reactstrap';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [updateModal, setUpdateModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setFilteredUsers(users);
  }, [users]);

  const addUser = (user) => {
    const newUser = {
      ...user,
      id: users.length + 1
    };
    setUsers([...users, newUser]);
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const openUpdateModal = (user) => {
    setCurrentUser(user);
    setUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setUpdateModal(false);
    setCurrentUser(null);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
    closeUpdateModal();
  };

  const searchUsers = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredUsers(users);
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const results = users.filter(user => 
      user.firstName.toLowerCase().includes(term) ||
      user.lastName.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term) ||
      user.phone.includes(term) ||
      user.countryName.toLowerCase().includes(term) ||
      user.stateName.toLowerCase().includes(term) ||
      user.cityName.toLowerCase().includes(term)
    );
    
    setFilteredUsers(results);
  };

  return (
    <div style={{width: "100vw", paddingTop: "72px"}}>
      <NavBar addUser={addUser} searchUsers={searchUsers} />
      <DisplayUser 
        users={filteredUsers} 
        deleteUser={deleteUser} 
        openUpdateModal={openUpdateModal} 
        style={{paddingTop: "100px"}}
      />
      {updateModal && (
        <UpdateUser 
          user={currentUser} 
          updateUser={updateUser} 
          isOpen={updateModal} 
          closeModal={closeUpdateModal} 
        />
      )}
    </div>
  );
}