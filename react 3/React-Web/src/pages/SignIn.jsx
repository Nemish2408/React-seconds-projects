import React, { useState } from "react";
import { auth, googleProvider } from "../configs/firebaseConfig";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Button, Card, CardBody, CardHeader, Input, FormGroup, Label } from "reactstrap";
import GoogleIcon from '@mui/icons-material/Google';

const SignIn = ({ onSwitch, onForgot }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
              <Card
                  className="my-2"
                  style={{
                      width: "32rem",
                  }}
              >
                  <CardHeader>
                  <h2>Sign In</h2>
                  </CardHeader>
                  <CardBody>
                          {error && <p style={{ color: "red" }}>{error}</p>}
                          <FormGroup floating>
                              <Input
                                  type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}
                              />
                              <Label for="Email">
                                  Email
                              </Label>
                          </FormGroup>
                          <FormGroup floating>
                              <Input
                                  type="password"
                                  placeholder="Password"
                                  onChange={(e) => setPassword(e.target.value)}
  
                              />
                              <Label for="Password">
                                  Password
                              </Label>
                          </FormGroup>
                          <FormGroup>
                              <Button block color="primary" onClick={handleSignIn} size="lg">
                                  Sign In
                              </Button>
                          </FormGroup>
                          <FormGroup>
                              <Button block color="primary" onClick={onForgot} size="lg">
                              Forgot Password?
                              </Button>
                          </FormGroup>
                          <FormGroup>
                              <Button block color="primary" outline onClick={handleGoogleSignIn} size="lg" style={{display: "flex",justifyContent:"center" }}>
                              <GoogleIcon />  Sign In With Google
                              </Button>
                          </FormGroup>
                          <FormGroup>
                          Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitch(); }} style={{ color: "blue", textDecoration: "underline", cursor: "pointer" }}>Sign Up</a>
                          </FormGroup>
                  </CardBody>
              </Card>
          </div>
      );
};

export default SignIn;
