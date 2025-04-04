import React, { useState } from "react";
import { auth } from "../configs/firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";
import { Button, Card, CardBody, CardHeader, Input, FormGroup, Label } from "reactstrap";


const ForgotPassword = ({ onBack }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    setMessage("");
    setError("");
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    // <div>
    //   <h2>Forgot Password</h2>
    //   {error && <p style={{ color: "red" }}>{error}</p>}
    //   {message && <p style={{ color: "green" }}>{message}</p>}
    //   <input type="email" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
    //   <button onClick={handleReset}>Reset Password</button>
    //   <p><button onClick={onBack}>Back to Sign In</button></p>
    // </div>
    <div style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }}>
        <Card
            className="my-2"
            style={{
                width: "32rem",
            }}
        >
            <CardHeader>
            <h2>Forgot Password</h2>
            </CardHeader>
            <CardBody>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    {message && <p style={{ color: "green" }}>{message}</p>}
                    <FormGroup floating>
                        <Input
                            type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                        />
                        <Label for="Email">
                            Email
                        </Label>
                    </FormGroup>
                    <FormGroup>
                        <Button block color="primary" onClick={handleReset} size="lg">
                            Reset Password
                        </Button>
                    </FormGroup>
                    <FormGroup>
                    Back to Sign In <a href="#" onClick={(e) => { e.preventDefault(); onBack(); }} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>Sign Up</a>
                    </FormGroup>
            </CardBody>
        </Card>
    </div>
  );
};

export default ForgotPassword;
