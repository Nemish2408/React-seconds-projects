import React from "react";
import UserForm from "./common/UserForm";

export default function UpdateUser({ user, updateUser, isOpen, closeModal }) {
  return (
    <UserForm
      user={user}
      isEdit={true}
      onSubmit={updateUser}
      isOpen={isOpen}
      closeModal={closeModal}
    />
  );
}