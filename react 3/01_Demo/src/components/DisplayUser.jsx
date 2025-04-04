import React from "react";
import {
    Card,
    CardBody,
    CardTitle,
    CardText,
    CardFooter,
    Row,
    Col,
    Button,
} from "reactstrap";

export default function DisplayUser({ users, deleteUser, openUpdateModal }) {
    return (
        <div className="container mt-5" >
            {users.length === 0 ? (
                <div className="text-center mt-5" style={{paddingTop: "100px"}}>
                    <h3>No users found</h3>
                </div>
            ) : (
                <Row>
                    {users.map((user) => (
                        <Col md={4} key={user.id} className="mb-3">
                            <Card style = {{boxShadow:"10px 20px 50px rgb(6, 97, 119)"}}>
                                <CardBody>
                                    <CardTitle tag="h5">
                                        {user.firstName} {user.lastName}
                                    </CardTitle>
                                    <CardText>
                                        <strong>Email:</strong> {user.email} <br />
                                        <strong>Phone:</strong> {user.phone} <br />
                                        <strong>Birth Date:</strong> {user.dob} <br />
                                        <strong>Adreess:</strong> {user.address}, {user.address2}, {user.cityName}, {user.stateName}
                                        , {user.countryName}
                                    </CardText>
                                </CardBody>
                                <CardFooter className="d-flex justify-content-between">
                                    <Button color="danger" onClick={() => deleteUser(user.id)}>
                                        Delete
                                    </Button>
                                    <Button color="primary" onClick={() => openUpdateModal(user)}>
                                        Update
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
}
