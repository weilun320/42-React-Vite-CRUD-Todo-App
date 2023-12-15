import { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const setTodos = useContext(TodoContext).setTodos;
  const todos = useContext(TodoContext).todos;
  const token = useContext(TodoContext).token;
  const navigate = useNavigate();

  function addTodo(event) {
    event.preventDefault();
    setTodos([...todos, { id: Date.now(), userId: token, title, description, completed }]);
    navigate("/");
  }

  return (
    <Container>
      <h1 className="my-3">Add Todo</h1>
      <Form onSubmit={addTodo}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Get software developer job"
            required
            type="text"
            value={title}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`1. Create amazing project\n2. Apply to Google & Netflix\n3. Crush interview`}
            required
            rows={3}
            value={description}
          />
        </Form.Group>
        <Form.Check
          checked={completed}
          className="mb-3"
          id="completed"
          label="Mark as completed"
          onChange={(e) => setCompleted(e.target.checked)}
          type="checkbox"
        />
        <Button variant="primary" type="submit">Submit</Button>
      </Form>
    </Container>
  );
}
