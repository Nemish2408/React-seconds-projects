import React, { useState } from "react";
import { auth, googleProvider } from "../configs/firebaseConfig";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Button, Card, CardBody, CardHeader, Input, FormGroup, Label } from "reactstrap";
import GoogleIcon from '@mui/icons-material/Google';

const SignUp = ({ onSwitch }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSignUp = async () => {
        setError("");
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div style={{
            height: "100vh",
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        }}>
            <Card style={{ width: "32rem" }}>
                <CardHeader>
                    <h2>Sign Up</h2>
                </CardHeader>
                <CardBody>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <FormGroup floating>
                        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                        <Label for="Email">Email</Label>
                    </FormGroup>
                    <FormGroup floating>
                        <Input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                        <Label for="Password">Password</Label>
                    </FormGroup>
                    <FormGroup>
                        <Button block color="primary" onClick={handleSignUp} size="lg">
                            Sign Up
                        </Button>
                    </FormGroup>
                    <FormGroup>
                        <Button block color="primary" outline onClick={handleGoogleSignIn} size="lg">
                        <GoogleIcon />  Sign In With Google
                        </Button>
                    </FormGroup>
                    <FormGroup style={{ textAlign: "center" }}>
                        Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>Sign In</a>
                    </FormGroup>
                </CardBody>
            </Card>
        </div>
    );
};

export default SignUp;
