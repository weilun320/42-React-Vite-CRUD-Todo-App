import { useContext, useState } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';

export default function EditTodo() {
  const setTodos = useContext(TodoContext).setTodos;
  const todos = useContext(TodoContext).todos;
  const userId = useContext(TodoContext).token;
  const navigate = useNavigate();
  const id = parseInt(useParams().id);
  const currentTodo = todos.filter((todo) => todo.id === id)[0];
  const [title, setTitle] = useState(currentTodo.title);
  const [description, setDescription] = useState(currentTodo.description);
  const [completed, setCompleted] = useState(currentTodo.completed);

  if (currentTodo.userId !== userId) {
    return <Navigate to="/" />;
  }

  function updateTodo(event) {
    event.preventDefault();

    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, title, description, completed };
      }

      return todo;
    });

    setTodos(updatedTodos);
    navigate("/");
  }

  return (
    <Container>
      <h1 className="my-3">Edit Todo</h1>
      <Form onSubmit={updateTodo}>
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
