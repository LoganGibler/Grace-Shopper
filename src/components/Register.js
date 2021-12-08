import React, { useState } from "react";
import { Form, Button, Col, ButtonToolbar } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { registerUser } from "../api"
const Register = ({ isLoggedIn, setIsLoggedIn }) => {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const cart = "0"
  const canSell = false
  return (
    <div>
      <Col md={{ span: 4, offset: 2 }}>
        Register form
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              const { token } = await registerUser(username, password, cart, canSell);
              console.log("this is token in register comp", token)
              storeToken(results)
              setUsername("")
              setPassword("")
            } catch (error) {
              console.log(error.message);
            } finally {
              history.push("/Login");
            }
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Create Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="usernames"
              value={username}
              onChange={(event) => {
                // console.log(event.target.value)
                setUsername(event.target.value);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your username or password with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label> Create Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </Form.Group>
          <ButtonToolbar className="mb-2">
            <Button variant="primary" type="submit">
              Register
            </Button>
          </ButtonToolbar>
        </Form>
      </Col>
    </div>
  );
};

export default Register;
