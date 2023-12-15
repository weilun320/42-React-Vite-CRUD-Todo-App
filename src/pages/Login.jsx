import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const users = useContext(TodoContext).users;
  const setToken = useContext(TodoContext).setToken;
  const navigate = useNavigate();

  function login(event) {
    event.preventDefault();
    setError(false);

    const isValidAccount = users.filter((user) => {
      return user.username === username && user.password === password;
    });

    if (isValidAccount.length > 0) {
      setToken(isValidAccount[0].id);
      navigate("/");
    }
    else {
      setError(true);
    }
  }

  return (
    <Container>
      <h1 className="my-3">Login</h1>
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter email"
            type="email"
            value={username}
          />
          <Form.Text className="text-muted">
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={password}
          />
        </Form.Group>
        {error && <p className="text-danger">Incorrect email/password.</p>}
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
