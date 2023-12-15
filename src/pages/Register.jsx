import { useContext, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { TodoContext } from "../contexts/TodoContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const users = useContext(TodoContext).users;
  const setUsers = useContext(TodoContext).setUsers;
  const setToken = useContext(TodoContext).setToken;
  const navigate = useNavigate();

  function register(event) {
    event.preventDefault();
    setError("");

    if (username && password && confirmPassword) {
      const userExisted = users.filter((user) => {
        return user.username === username;
      });

      if (userExisted.length > 0) {
        setError("User existed. Please try another email.");
      }
      else if (password !== confirmPassword) {
        setError("Password must be the same as Confirm Password.");
      }
      else {
        let id = null;

        if (users.length === 0) {
          id = 1;
          setUsers([{ id, username, password }]);
        }
        else {
          id = users[users.length - 1].id + 1;
          setUsers([...users, { id, username, password }]);
        }

        setToken(id);
        navigate("/");
      }
    }
  }

  return (
    <Container>
      <h1 className="my-3">Register</h1>
      <Form onSubmit={register}>
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
        <Form.Group className="mb-3" controlId="confirm-password">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Password"
            type="password"
            value={confirmPassword}
          />
        </Form.Group>
        <p className="text-danger">
          {error}
        </p>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
