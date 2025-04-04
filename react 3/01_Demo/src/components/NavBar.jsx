import React, { useState } from "react";
import { Navbar, NavbarBrand, Button, Input } from "reactstrap";
import UserForm from "./common/UserForm";

export default function NavBar({ addUser, searchUsers }) {
    const [modal, setModal] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const toggleModal = () => setModal(!modal);

    const handleSearch = () => {
        searchUsers(searchTerm);
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <>
            <Navbar className="fixed-top" dark style={{ paddingRight: "20px", height:"90px", backgroundColor: "#064d63", borderBottomLeftRadius: "30px", borderBottomRightRadius: "30px", boxShadow:"10px 20px 50px rgb(6, 97, 119)"  }}>
                <NavbarBrand href="/">Reactstrap</NavbarBrand>
                <div style={{ display: "flex", justifyContent: "space-between", gap: "10px", padding: "10px" }}>
                    <Input 
                        type="search" 
                        placeholder="Search..." 
                        style={{ width: "420px" }} 
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <Button color="light" outline onClick={handleSearch}>Search</Button>
                </div>
                <Button color="light" onClick={toggleModal}>+ Add New User</Button>
            </Navbar>

            <UserForm
                isEdit={false}
                onSubmit={addUser}
                isOpen={modal}
                closeModal={toggleModal}
                style = {{boxShadow:"10px 20px 50px rgb(6, 97, 119)"}}
            />
        </>
    );
}