import React from "react";
import UserForm from "./UserForm";

export default function AddNewUser({ addUser, isOpen, closeModal }) {
  return (
    <UserForm
      isEdit={false}
      onSubmit={addUser}
      isOpen={isOpen}
      closeModal={closeModal}
    />
  );
}